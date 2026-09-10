import type { ApplicationStatus } from "@prisma/client";

export type JobApplicationDto = {
  id: string;
  url: string;
  title: string;
  company: string;
  coverLetter: string | null;
  status: ApplicationStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateJobApplicationDto = {
  url: string;
  title: string;
  company: string;
  coverLetter?: string;
};

export type UpdateJobApplicationDto = {
  status?: ApplicationStatus;
  notes?: string;
  coverLetter?: string;
};
