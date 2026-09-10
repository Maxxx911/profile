import { notFound } from "next/navigation";
import { jobApplicationComposition } from "@/server/container";
import { NotFoundError } from "@/server/errors/not-found.error";
import { StatusBadge } from "../_components/StatusBadge";
import { StatusSelect } from "../_components/StatusSelect";
import { NotesEditor } from "../_components/NotesEditor";

type Params = Promise<{ id: string }>;

export default async function ApplicationDetailPage({ params }: { params: Params }) {
  const { id } = await params;

  let app;
  try {
    app = await jobApplicationComposition.getById(id);
  } catch (e) {
    if (e instanceof NotFoundError) notFound();
    throw e;
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-8">
        <a href="/applications" className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-4 inline-block">
          ← Applications
        </a>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-500 mb-1">{app.company}</p>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">{app.title}</h1>
          </div>
          <StatusBadge status={app.status} />
        </div>
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors truncate max-w-xs"
        >
          {app.url}
        </a>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-sm font-semibold text-zinc-700 mb-3">Status</h2>
          <StatusSelect id={app.id} current={app.status} />
        </section>

        {app.coverLetter && (
          <section>
            <h2 className="text-sm font-semibold text-zinc-700 mb-3">Cover Letter</h2>
            <div className="prose prose-sm max-w-none text-zinc-600 whitespace-pre-wrap bg-zinc-50 rounded-lg px-4 py-3 border border-zinc-200">
              {app.coverLetter}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-sm font-semibold text-zinc-700 mb-3">Notes</h2>
          <NotesEditor id={app.id} initialNotes={app.notes} />
        </section>

        <p className="text-xs text-zinc-400">
          Added{" "}
          {new Date(app.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </main>
  );
}
