import type { SkillRepository } from "@/server/repository/skill.repository";
import { NotFoundError } from "@/server/errors/not-found.error";
import type { CreateSkillDto, UpdateSkillDto, SkillDto } from "@/server/dto/skill.dto";
import type { Skill } from "@prisma/client";

function toDto(skill: Skill): SkillDto {
  return {
    id: skill.id,
    name: skill.name,
    category: skill.category,
    description: skill.description,
    createdAt: skill.createdAt,
  };
}

export class SkillService {
  constructor(private readonly skillRepo: SkillRepository) {}

  async getAll(): Promise<SkillDto[]> {
    const skills = await this.skillRepo.findAll();
    return skills.map(toDto);
  }

  async getById(id: string): Promise<SkillDto> {
    const skill = await this.skillRepo.findById(id);
    if (!skill) throw new NotFoundError("Skill", id);
    return toDto(skill);
  }

  async getByCategory(category: string): Promise<SkillDto[]> {
    const skills = await this.skillRepo.findByCategory(category);
    return skills.map(toDto);
  }

  async create(dto: CreateSkillDto): Promise<SkillDto> {
    const skill = await this.skillRepo.create(dto);
    return toDto(skill);
  }

  async update(id: string, dto: UpdateSkillDto): Promise<SkillDto> {
    await this.getById(id);
    const skill = await this.skillRepo.update(id, dto);
    return toDto(skill);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.skillRepo.delete(id);
  }
}
