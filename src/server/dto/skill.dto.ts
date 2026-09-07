export type SkillDto = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  createdAt: Date;
};

export type CreateSkillDto = {
  name: string;
  category: string;
  description?: string;
};

export type UpdateSkillDto = Partial<CreateSkillDto>;
