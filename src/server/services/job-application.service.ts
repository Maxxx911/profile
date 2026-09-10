import type { ApplicationStatus } from "@prisma/client";
import type { JobApplicationRepository } from "@/server/repository/job-application.repository";
import { NotFoundError } from "@/server/errors/not-found.error";
import type {
  JobApplicationDto,
  CreateJobApplicationDto,
  UpdateJobApplicationDto,
} from "@/server/dto/job-application.dto";
import type { JobApplication } from "@prisma/client";

function toDto(app: JobApplication): JobApplicationDto {
  return {
    id: app.id,
    url: app.url,
    title: app.title,
    company: app.company,
    coverLetter: app.coverLetter,
    status: app.status,
    notes: app.notes,
    createdAt: app.createdAt,
    updatedAt: app.updatedAt,
  };
}

export class JobApplicationService {
  constructor(private readonly jobApplicationRepo: JobApplicationRepository) {}

  async getAll(status?: ApplicationStatus): Promise<JobApplicationDto[]> {
    const apps = await this.jobApplicationRepo.findAll(status);
    return apps.map(toDto);
  }

  async getById(id: string): Promise<JobApplicationDto> {
    const app = await this.jobApplicationRepo.findById(id);
    if (!app) throw new NotFoundError("JobApplication", id);
    return toDto(app);
  }

  async create(dto: CreateJobApplicationDto): Promise<JobApplicationDto> {
    const app = await this.jobApplicationRepo.create({
      url: dto.url,
      title: dto.title,
      company: dto.company,
      coverLetter: dto.coverLetter,
    });
    return toDto(app);
  }

  async update(id: string, dto: UpdateJobApplicationDto): Promise<JobApplicationDto> {
    const existing = await this.jobApplicationRepo.findById(id);
    if (!existing) throw new NotFoundError("JobApplication", id);

    const app = await this.jobApplicationRepo.update(id, {
      status: dto.status,
      notes: dto.notes,
      coverLetter: dto.coverLetter,
    });
    return toDto(app);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.jobApplicationRepo.findById(id);
    if (!existing) throw new NotFoundError("JobApplication", id);
    await this.jobApplicationRepo.delete(id);
  }
}
