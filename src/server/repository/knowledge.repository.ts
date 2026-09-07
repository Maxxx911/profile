import type { PrismaClient, KnowledgeEntry, EntryType } from "@prisma/client";
import type { Prisma } from "@prisma/client";

type PrismaCtx = PrismaClient | Prisma.TransactionClient;

export type EntryWithSkills = Prisma.KnowledgeEntryGetPayload<{
  include: { entrySkills: { include: { skill: true } } };
}>;

export class KnowledgeRepository {
  constructor(private readonly prisma: PrismaCtx) {}

  withTx(tx: Prisma.TransactionClient): KnowledgeRepository {
    return new KnowledgeRepository(tx);
  }

  async findAll(): Promise<EntryWithSkills[]> {
    return this.prisma.knowledgeEntry.findMany({
      include: { entrySkills: { include: { skill: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  async findBySlug(slug: string): Promise<EntryWithSkills | null> {
    return this.prisma.knowledgeEntry.findUnique({
      where: { slug },
      include: { entrySkills: { include: { skill: true } } },
    });
  }

  async findBySkillId(skillId: string): Promise<EntryWithSkills[]> {
    return this.prisma.knowledgeEntry.findMany({
      where: { entrySkills: { some: { skillId } } },
      include: { entrySkills: { include: { skill: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  async findByType(type: EntryType): Promise<EntryWithSkills[]> {
    return this.prisma.knowledgeEntry.findMany({
      where: { type },
      include: { entrySkills: { include: { skill: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(data: Prisma.KnowledgeEntryCreateInput): Promise<KnowledgeEntry> {
    return this.prisma.knowledgeEntry.create({ data });
  }

  async update(
    id: string,
    data: Prisma.KnowledgeEntryUpdateInput
  ): Promise<KnowledgeEntry> {
    return this.prisma.knowledgeEntry.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.knowledgeEntry.delete({ where: { id } });
  }

  async setSkills(entryId: string, skillIds: string[]): Promise<void> {
    await this.prisma.entrySkill.deleteMany({ where: { entryId } });
    if (skillIds.length > 0) {
      await this.prisma.entrySkill.createMany({
        data: skillIds.map((skillId) => ({ entryId, skillId })),
      });
    }
  }
}
