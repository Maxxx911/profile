import type { EmbeddingRepository } from "@/server/repository/embedding.repository";
import { EmbeddingError } from "@/server/errors/embedding.error";
import type { EmbeddingChunkDto, SimilarChunkDto } from "@/server/dto/embedding.dto";
import type { OpenAI } from "openai";
import { CHUNK_SIZE, CHUNK_OVERLAP, EMBEDDING_MODEL } from "@/server/infrastructure/openai";

function chunkText(text: string): string[] {
  const words = text.split(" ");
  const chunks: string[] = [];
  let i = 0;

  while (i < words.length) {
    chunks.push(words.slice(i, i + CHUNK_SIZE).join(" "));
    i += CHUNK_SIZE - CHUNK_OVERLAP;
  }

  return chunks;
}

export class EmbeddingService {
  constructor(
    private readonly embeddingRepo: EmbeddingRepository,
    private readonly openai: OpenAI
  ) {}

  // Generates chunks + embeddings via OpenAI — call BEFORE opening a transaction
  async prepareEmbeddings(content: string): Promise<EmbeddingChunkDto[]> {
    const texts = chunkText(content);

    return Promise.all(
      texts.map(async (text, i) => {
        try {
          const response = await this.openai.embeddings.create({
            model: EMBEDDING_MODEL,
            input: text,
          });
          return { chunkIndex: i, chunkText: text, embedding: response.data[0].embedding };
        } catch (err) {
          throw new EmbeddingError(`Failed to generate embedding for chunk ${i}`, err);
        }
      })
    );
  }

  async similaritySearch(query: string, limit = 10): Promise<SimilarChunkDto[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: EMBEDDING_MODEL,
        input: query,
      });
      return this.embeddingRepo.similaritySearch(response.data[0].embedding, limit);
    } catch (err) {
      throw new EmbeddingError("Failed to perform similarity search", err);
    }
  }
}
