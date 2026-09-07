import type { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";

type PrismaCtx = PrismaClient | Prisma.TransactionClient;

export type EmbeddingChunk = {
  chunkIndex: number;
  chunkText: string;
  embedding: number[];
};

export type SimilarChunk = {
  id: string;
  entryId: string;
  chunkIndex: number;
  chunkText: string;
  similarity: number;
};

export class EmbeddingRepository {
  constructor(private readonly prisma: PrismaCtx) {}

  withTx(tx: Prisma.TransactionClient): EmbeddingRepository {
    return new EmbeddingRepository(tx);
  }

  async createMany(entryId: string, chunks: EmbeddingChunk[]): Promise<void> {
    for (const chunk of chunks) {
      const vectorStr = `[${chunk.embedding.join(",")}]`;
      await this.prisma.$executeRawUnsafe(
        `INSERT INTO "Embedding" (id, "entryId", "chunkIndex", "chunkText", embedding, "createdAt")
         VALUES (gen_random_uuid()::text, $1, $2, $3, $4::vector, NOW())`,
        entryId,
        chunk.chunkIndex,
        chunk.chunkText,
        vectorStr
      );
    }
  }

  async deleteByEntryId(entryId: string): Promise<void> {
    await this.prisma.embedding.deleteMany({ where: { entryId } });
  }

  async similaritySearch(
    queryEmbedding: number[],
    limit = 10
  ): Promise<SimilarChunk[]> {
    const vectorStr = `[${queryEmbedding.join(",")}]`;
    return this.prisma.$queryRawUnsafe<SimilarChunk[]>(
      `SELECT
        id,
        "entryId",
        "chunkIndex",
        "chunkText",
        1 - (embedding <=> $1::vector) AS similarity
       FROM "Embedding"
       ORDER BY embedding <=> $1::vector
       LIMIT $2`,
      vectorStr,
      limit
    );
  }
}
