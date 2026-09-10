import { jobApplicationComposition } from "@/server/container";
import { updateJobApplicationSchema } from "@/server/validators/job-application.validator";
import { NotFoundError } from "@/server/errors/not-found.error";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  try {
    const app = await jobApplicationComposition.getById(id);
    return Response.json(app);
  } catch (err) {
    if (err instanceof NotFoundError) return Response.json({ error: "Not found" }, { status: 404 });
    throw err;
  }
}

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = updateJobApplicationSchema.parse(await req.json());
    const app = await jobApplicationComposition.update(id, body);
    return Response.json(app);
  } catch (err) {
    if (err instanceof NotFoundError) return Response.json({ error: "Not found" }, { status: 404 });
    const message = err instanceof Error ? err.message : "Bad request";
    return Response.json({ error: message }, { status: 400 });
  }
}
