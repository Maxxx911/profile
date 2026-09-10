import { jobApplicationComposition } from "@/server/container";
import { createJobApplicationSchema } from "@/server/validators/job-application.validator";

export async function POST(req: Request) {
  try {
    const body = createJobApplicationSchema.parse(await req.json());
    const app = await jobApplicationComposition.createFromUrl(body.url);
    return Response.json(app, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bad request";
    return Response.json({ error: message }, { status: 400 });
  }
}
