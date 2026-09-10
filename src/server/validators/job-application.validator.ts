import { z } from "zod";

export const createJobApplicationSchema = z.object({
  url: z.url(),
});

export const updateJobApplicationSchema = z.object({
  status: z
    .enum([
      "APPLIED",
      "HR_SCREENING",
      "TECH_INTERVIEW",
      "TEAM_INTERVIEW",
      "CTO_INTERVIEW",
      "REJECTED",
      "DONE",
    ])
    .optional(),
  notes: z.string().optional(),
  coverLetter: z.string().optional(),
});
