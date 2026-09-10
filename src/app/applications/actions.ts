"use server";

import { revalidatePath } from "next/cache";
import { jobApplicationComposition } from "@/server/container";
import { requireAuth } from "@/lib/require-auth";
import type { ApplicationStatus } from "@prisma/client";

export async function createApplication(
  url: string,
  title?: string,
  company?: string
): Promise<{ id: string }> {
  await requireAuth();
  const app = await jobApplicationComposition.createFromUrl(url, { title, company });
  revalidatePath("/applications");
  return { id: app.id };
}

export async function updateStatus(id: string, status: ApplicationStatus): Promise<void> {
  await requireAuth();
  await jobApplicationComposition.update(id, { status });
  revalidatePath(`/applications/${id}`);
  revalidatePath("/applications");
}

export async function updateNotes(id: string, notes: string): Promise<void> {
  await requireAuth();
  await jobApplicationComposition.update(id, { notes });
  revalidatePath(`/applications/${id}`);
}
