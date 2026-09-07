import type { KnowledgeRepository } from "@/server/repository/knowledge.repository";
import { NotFoundError } from "@/server/errors/not-found.error";
import type { CreateEntryDto, UpdateEntryDto, KnowledgeEntryDto } from "@/server/dto/knowledge.dto";
import type { EntryWithSkills } from "@/server/repository/knowledge.repository";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toDto(entry: EntryWithSkills): KnowledgeEntryDto {
  return {
    id: entry.id,
    title: entry.title,
    content: entry.content,
    summary: entry.summary,
    type: entry.type,
    slug: entry.slug,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
    skills: entry.entrySkills.map((es) => ({
      id: es.skill.id,
      name: es.skill.name,
      category: es.skill.category,
      description: es.skill.description,
      createdAt: es.skill.createdAt,
    })),
  };
}

export class KnowledgeService {
  constructor(private readonly knowledgeRepo: KnowledgeRepository) {}

  async getAll(): Promise<KnowledgeEntryDto[]> {
    const entries = await this.knowledgeRepo.findAll();
    return entries.map(toDto);
  }

  async getBySlug(slug: string): Promise<KnowledgeEntryDto> {
    const entry = await this.knowledgeRepo.findBySlug(slug);
    if (!entry) throw new NotFoundError("KnowledgeEntry", slug);
    return toDto(entry);
  }

  async getBySkillId(skillId: string): Promise<KnowledgeEntryDto[]> {
    const entries = await this.knowledgeRepo.findBySkillId(skillId);
    return entries.map(toDto);
  }

  async create(dto: CreateEntryDto): Promise<{ id: string; slug: string }> {
    const slug = slugify(dto.title);
    const entry = await this.knowledgeRepo.create({
      title: dto.title,
      content: dto.content,
      summary: dto.summary,
      type: dto.type,
      slug,
    });
    await this.knowledgeRepo.setSkills(entry.id, dto.skillIds);
    return { id: entry.id, slug };
  }

  async update(id: string, dto: UpdateEntryDto): Promise<void> {
    const existing = await this.knowledgeRepo.findBySlug(id);
    if (!existing) throw new NotFoundError("KnowledgeEntry", id);

    await this.knowledgeRepo.update(id, {
      title: dto.title,
      content: dto.content,
      summary: dto.summary,
      type: dto.type,
    });

    if (dto.skillIds !== undefined) {
      await this.knowledgeRepo.setSkills(id, dto.skillIds);
    }
  }

  async delete(id: string): Promise<void> {
    await this.knowledgeRepo.delete(id);
  }
}
