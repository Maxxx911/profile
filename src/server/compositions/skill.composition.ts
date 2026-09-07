import type { SkillService } from "@/server/services/skill.service";
import type { KnowledgeService } from "@/server/services/knowledge.service";
import type { CreateSkillDto, UpdateSkillDto, SkillDto } from "@/server/dto/skill.dto";
import type { KnowledgeEntryDto } from "@/server/dto/knowledge.dto";

export type SkillWithEntries = {
  skill: SkillDto;
  entries: KnowledgeEntryDto[];
};

export class SkillComposition {
  constructor(
    private readonly skillService: SkillService,
    private readonly knowledgeService: KnowledgeService
  ) {}

  async getAll(): Promise<SkillDto[]> {
    return this.skillService.getAll();
  }

  async getAllGroupedByCategory(): Promise<Record<string, SkillDto[]>> {
    const skills = await this.skillService.getAll();
    return skills.reduce<Record<string, SkillDto[]>>((acc, skill) => {
      (acc[skill.category] ??= []).push(skill);
      return acc;
    }, {});
  }

  async getSkillWithEntries(id: string): Promise<SkillWithEntries> {
    const [skill, entries] = await Promise.all([
      this.skillService.getById(id),
      this.knowledgeService.getBySkillId(id),
    ]);
    return { skill, entries };
  }

  async createSkill(dto: CreateSkillDto): Promise<SkillDto> {
    return this.skillService.create(dto);
  }

  async updateSkill(id: string, dto: UpdateSkillDto): Promise<SkillDto> {
    return this.skillService.update(id, dto);
  }

  async deleteSkill(id: string): Promise<void> {
    return this.skillService.delete(id);
  }
}
