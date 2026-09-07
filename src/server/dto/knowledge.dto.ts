import type { EntryType } from "@prisma/client";
import type { SkillDto } from "./skill.dto";

export type KnowledgeEntryDto = {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  type: EntryType;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  skills: SkillDto[];
};

export type CreateEntryDto = {
  title: string;
  content: string;
  summary?: string;
  type: EntryType;
  skillIds: string[];
};

export type UpdateEntryDto = Partial<Omit<CreateEntryDto, "skillIds">> & {
  skillIds?: string[];
};
