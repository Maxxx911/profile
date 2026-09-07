import type { PrismaClient, Skill } from "@prisma/client";
import type { Prisma } from "@prisma/client";

type PrismaCtx = PrismaClient | Prisma.TransactionClient;

export class SkillRepository {
  constructor(private readonly prisma: PrismaCtx) {}

  withTx(tx: Prisma.TransactionClient): SkillRepository {
    return new SkillRepository(tx);
  }

  async findAll(): Promise<Skill[]> {
    return this.prisma.skill.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
  }

  async findById(id: string): Promise<Skill | null> {
    return this.prisma.skill.findUnique({ where: { id } });
  }

  async findByName(name: string): Promise<Skill | null> {
    return this.prisma.skill.findUnique({ where: { name } });
  }

  async findByCategory(category: string): Promise<Skill[]> {
    return this.prisma.skill.findMany({
      where: { category },
      orderBy: { name: "asc" },
    });
  }

  async create(data: Prisma.SkillCreateInput): Promise<Skill> {
    return this.prisma.skill.create({ data });
  }

  async update(id: string, data: Prisma.SkillUpdateInput): Promise<Skill> {
    return this.prisma.skill.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.skill.delete({ where: { id } });
  }
}
