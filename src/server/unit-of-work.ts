import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";

export class UnitOfWork {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly isServerless = false
  ) {}

  async execute<T>(
    work: (tx: Prisma.TransactionClient) => Promise<T>
  ): Promise<T> {
    try {
      return await this.prisma.$transaction(work);
    } finally {
      if (this.isServerless) await this.prisma.$disconnect();
    }
  }
}
