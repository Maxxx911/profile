import { prisma } from "@/server/infrastructure/prisma";
import { openai } from "@/server/infrastructure/openai";
import { UnitOfWork } from "@/server/unit-of-work";

import { SkillRepository } from "@/server/repository/skill.repository";
import { KnowledgeRepository } from "@/server/repository/knowledge.repository";
import { EmbeddingRepository } from "@/server/repository/embedding.repository";
import { JobApplicationRepository } from "@/server/repository/job-application.repository";

import { SkillService } from "@/server/services/skill.service";
import { KnowledgeService } from "@/server/services/knowledge.service";
import { EmbeddingService } from "@/server/services/embedding.service";
import { JobApplicationService } from "@/server/services/job-application.service";

import { KnowledgeComposition } from "@/server/compositions/knowledge.composition";
import { SkillComposition } from "@/server/compositions/skill.composition";
import { JobApplicationComposition } from "@/server/compositions/job-application.composition";

// Infrastructure
const uow = new UnitOfWork(prisma, process.env.VERCEL === "1");

// Repositories
const skillRepo = new SkillRepository(prisma);
const knowledgeRepo = new KnowledgeRepository(prisma);
const embeddingRepo = new EmbeddingRepository(prisma);
const jobApplicationRepo = new JobApplicationRepository(prisma);

// Services
const skillService = new SkillService(skillRepo);
const knowledgeService = new KnowledgeService(knowledgeRepo);
const embeddingService = new EmbeddingService(embeddingRepo, openai);
const jobApplicationService = new JobApplicationService(jobApplicationRepo);

// Compositions — only these are exported and used by the UI layer
export const knowledgeComposition = new KnowledgeComposition(
  knowledgeService,
  knowledgeRepo,
  embeddingService,
  embeddingRepo,
  uow
);

export const skillComposition = new SkillComposition(
  skillService,
  knowledgeService
);

export const jobApplicationComposition = new JobApplicationComposition(jobApplicationService);
