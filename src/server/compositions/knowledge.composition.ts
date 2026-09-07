import type { UnitOfWork } from "@/server/unit-of-work";
import type { KnowledgeService } from "@/server/services/knowledge.service";
import type { EmbeddingService } from "@/server/services/embedding.service";
import type { KnowledgeRepository } from "@/server/repository/knowledge.repository";
import type { EmbeddingRepository } from "@/server/repository/embedding.repository";
import type { CreateEntryDto, UpdateEntryDto, KnowledgeEntryDto } from "@/server/dto/knowledge.dto";

export class KnowledgeComposition {
  constructor(
    private readonly knowledgeService: KnowledgeService,
    private readonly knowledgeRepo: KnowledgeRepository,
    private readonly embeddingService: EmbeddingService,
    private readonly embeddingRepo: EmbeddingRepository,
    private readonly uow: UnitOfWork
  ) {}

  async getAll(): Promise<KnowledgeEntryDto[]> {
    return this.knowledgeService.getAll();
  }

  async getBySlug(slug: string): Promise<KnowledgeEntryDto> {
    return this.knowledgeService.getBySlug(slug);
  }

  async getBySkillId(skillId: string): Promise<KnowledgeEntryDto[]> {
    return this.knowledgeService.getBySkillId(skillId);
  }

  async createEntry(dto: CreateEntryDto): Promise<{ id: string; slug: string }> {
    // Generate embeddings before transaction — OpenAI call must not block DB connection
    const chunks = await this.embeddingService.prepareEmbeddings(dto.content);

    return this.uow.execute(async (tx) => {
      const { id, slug } = await this.knowledgeService.create(dto);
      await this.embeddingRepo.withTx(tx).createMany(id, chunks);
      return { id, slug };
    });
  }

  async updateEntry(id: string, dto: UpdateEntryDto): Promise<void> {
    const regenerateEmbeddings = dto.content !== undefined;

    // If content changed — prepare new embeddings before transaction
    const chunks = regenerateEmbeddings
      ? await this.embeddingService.prepareEmbeddings(dto.content!)
      : null;

    await this.uow.execute(async (tx) => {
      await this.knowledgeService.update(id, dto);

      if (chunks) {
        await this.embeddingRepo.withTx(tx).deleteByEntryId(id);
        await this.embeddingRepo.withTx(tx).createMany(id, chunks);
      }
    });
  }

  async deleteEntry(id: string): Promise<void> {
    // embeddings cascade-delete via FK onDelete: Cascade
    await this.knowledgeService.delete(id);
  }
}
