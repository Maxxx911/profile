export type EmbeddingChunkDto = {
  chunkIndex: number;
  chunkText: string;
  embedding: number[];
};

export type SimilarChunkDto = {
  id: string;
  entryId: string;
  chunkIndex: number;
  chunkText: string;
  similarity: number;
};
