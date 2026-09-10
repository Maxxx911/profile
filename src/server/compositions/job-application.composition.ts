import type { ApplicationStatus } from "@prisma/client";
import type { JobApplicationService } from "@/server/services/job-application.service";
import { parseJobUrl } from "@/server/infrastructure/job-parser";
import type { JobApplicationDto, UpdateJobApplicationDto } from "@/server/dto/job-application.dto";

export class JobApplicationComposition {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  async getAll(status?: ApplicationStatus): Promise<JobApplicationDto[]> {
    return this.jobApplicationService.getAll(status);
  }

  async getById(id: string): Promise<JobApplicationDto> {
    return this.jobApplicationService.getById(id);
  }

  async createFromUrl(
    url: string,
    overrides?: { title?: string; company?: string }
  ): Promise<JobApplicationDto> {
    const title = overrides?.title?.trim();
    const company = overrides?.company?.trim();

    if (title && company) {
      return this.jobApplicationService.create({ url, title, company });
    }

    const parsed = await parseJobUrl(url);
    return this.jobApplicationService.create({
      url,
      title: title || parsed.title,
      company: company || parsed.company,
    });
  }

  async update(id: string, dto: UpdateJobApplicationDto): Promise<JobApplicationDto> {
    return this.jobApplicationService.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    return this.jobApplicationService.delete(id);
  }
}
