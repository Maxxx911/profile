import type { PrismaClient, JobApplication, ApplicationStatus } from "@prisma/client";
import type { Prisma } from "@prisma/client";

type PrismaCtx = PrismaClient | Prisma.TransactionClient;

export class JobApplicationRepository {
  constructor(private readonly prisma: PrismaCtx) {}

  withTx(tx: Prisma.TransactionClient): JobApplicationRepository {
    return new JobApplicationRepository(tx);
  }

  async findAll(status?: ApplicationStatus): Promise<JobApplication[]> {
    return this.prisma.jobApplication.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string): Promise<JobApplication | null> {
    return this.prisma.jobApplication.findUnique({ where: { id } });
  }

  async create(data: Prisma.JobApplicationCreateInput): Promise<JobApplication> {
    return this.prisma.jobApplication.create({ data });
  }

  async update(id: string, data: Prisma.JobApplicationUpdateInput): Promise<JobApplication> {
    return this.prisma.jobApplication.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.jobApplication.delete({ where: { id } });
  }
}
