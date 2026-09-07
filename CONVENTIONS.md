# Project Conventions

## Stack

- **Next.js 16** (App Router) — Server Components and Server Actions for internal data access; `app/api/*` routes only for external clients
- **Prisma 7** + **PostgreSQL** + **pgvector** — one database for display data and vector search
- **pnpm** — package manager
- **Tailwind CSS v4**
- **TypeScript** — strict, no `any`

---

## Folder Structure

```
src/
  app/                      Next.js pages and API routes
    api/                    External API routes only (e.g. Telegram bot)
    knowledge/
    skills/
  components/               UI components
    knowledge/              Feature-scoped components
    icons/                  Custom SVG icons (no icon libraries)
  server/                   All server-side logic — never imported by Client Components
    infrastructure/         Database and external API clients (lowest level)
    repository/             Data access — only CRUD, no business logic
    services/               Business logic — calls repositories
    compositions/           Orchestration of multiple services
    dto/                    Data transfer objects (types only, no classes)
    errors/                 Custom domain error classes
    validators/             Zod schemas for API boundary validation
    unit-of-work.ts
    container.ts            DI wiring — only compositions/services exported
prisma/
  schema/                   One .prisma file per model
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Files | `kebab-case.type.ts` | `skill.repository.ts` |
| Components | `PascalCase.tsx` | `EntryCard.tsx` |
| Classes | `PascalCase` | `SkillRepository` |
| DTOs | `PascalCaseDto` | `CreateSkillDto` |
| Errors | `PascalCaseError` | `NotFoundError` |
| Prisma schemas | `kebab-case.prisma` | `knowledge-entry.prisma` |

---

## Dependency Rules

The dependency graph is strictly one-directional. **No same-level imports.**

```
UI (Server Components / Server Actions)
  → container.ts
    → compositions   ← can use: services, repositories, uow
      → services     ← can use: repositories, dto, errors
        → repositories  ← can use: infrastructure, prisma types
          → infrastructure  (prisma, openai)

dto/       ← used by all layers
errors/    ← used by all layers
validators/ ← used only at API boundary (api routes)
```

---

## Adding a New Entity

### 1. Prisma schema
Create `prisma/schema/<entity>.prisma` with the model.
Run `pnpm prisma:migrate` — it will prompt for a migration name.
Run `pnpm prisma:generate` to regenerate the client.

### 2. Repository — `server/repository/<entity>.repository.ts`
- Constructor takes `PrismaCtx` (`PrismaClient | Prisma.TransactionClient`)
- Implement `withTx(tx)` that returns `new <Entity>Repository(tx)`
- Only CRUD — no business logic, no DTO mapping

```ts
type PrismaCtx = PrismaClient | Prisma.TransactionClient;

export class FooRepository {
  constructor(private readonly prisma: PrismaCtx) {}

  withTx(tx: Prisma.TransactionClient) {
    return new FooRepository(tx);
  }
}
```

### 3. DTOs — `server/dto/<entity>.dto.ts`
Plain TypeScript types (not classes). Three types per entity:

```ts
export type FooDto = { ... };          // output
export type CreateFooDto = { ... };    // input for creation
export type UpdateFooDto = Partial<CreateFooDto>;
```

### 4. Service — `server/services/<entity>.service.ts`
- Constructor takes only repositories from its domain
- Has a private `toDto()` mapper
- Throws domain errors (`NotFoundError`, etc.) — never HTTP errors

```ts
export class FooService {
  constructor(private readonly fooRepo: FooRepository) {}
}
```

### 5. Composition (if cross-entity) — `server/compositions/<entity>.composition.ts`
- Constructor takes services + repositories + UnitOfWork
- Transactional operations use `uow.execute(async tx => { ... })`
- External API calls (OpenAI etc.) happen **before** `uow.execute` — never inside a transaction

```ts
async createWithEmbeddings(dto: CreateFooDto) {
  const chunks = await this.embeddingService.prepareEmbeddings(dto.content); // before tx

  return this.uow.execute(async (tx) => {
    const foo = await this.fooRepo.withTx(tx).create(dto);
    await this.embeddingRepo.withTx(tx).createMany(foo.id, chunks);
    return foo;
  });
}
```

### 6. Wire in `container.ts`
Add repository → service → composition in order. Only export compositions (and services needed standalone).

---

## Unit of Work

`UnitOfWork.execute(tx => ...)` wraps `prisma.$transaction`. The callback receives `tx` — a `Prisma.TransactionClient`. Pass it to repositories via `.withTx(tx)`.

```ts
// Good
await this.uow.execute(async (tx) => {
  await this.repoA.withTx(tx).create(data);
  await this.repoB.withTx(tx).create(related);
});

// Bad — no transaction, operations can partially fail
await this.repoA.create(data);
await this.repoB.create(related);
```

---

## UI Components

- **Icons**: always custom SVG in `src/components/icons/<Name>Icon.tsx` — no icon libraries
- **Client Components**: only when interactivity is needed (`"use client"` + `useRouter`, `useState` etc.)
- **Server Components**: default — fetch data directly from `container.ts`, no `useEffect`
- **Filtering**: use URL search params (`?type=ARTICLE&skill=id`) so filtering is server-side and bookmarkable

```ts
// Server Component — direct call, no API needed
import { knowledgeComposition } from "@/server/container";

export default async function Page() {
  const entries = await knowledgeComposition.getAll();
  ...
}
```

---

## API Routes (External Clients Only)

API routes in `app/api/` are only for external clients (Telegram bot, webhooks).
All routes are protected by `middleware.ts` via `Authorization: Bearer <API_SECRET_KEY>`.

```ts
// app/api/cover-letter/route.ts
export async function POST(req: Request) {
  const body = coverLetterSchema.parse(await req.json()); // validate at boundary
  const result = await coverLetterComposition.generate(body);
  return Response.json(result);
}
```

---

## Error Handling

Domain errors are thrown by services and caught at the UI/API boundary:

| Error | When |
|-------|------|
| `NotFoundError` | Entity doesn't exist |
| `EmbeddingError` | OpenAI API failure |
| `ValidationError` | Invalid input (business rule, not schema) |

In Server Components use `notFound()` from `next/navigation` to trigger 404.
In API routes return appropriate HTTP status codes.

---

## Environment Variables

| Variable | Used by |
|----------|---------|
| `POSTGRES_URL` | Prisma client + prisma.config.ts |
| `OPENAI_API_KEY` | OpenAI client |
| `API_SECRET_KEY` | middleware.ts — protects `/api/*` routes |
