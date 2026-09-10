"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createApplication } from "../actions";

export function AddApplicationModal() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openModal() {
    setError("");
    setOpen(true);
    dialogRef.current?.showModal();
  }

  function closeModal() {
    setOpen(false);
    dialogRef.current?.close();
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) closeModal();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const url = (form.elements.namedItem("url") as HTMLInputElement).value.trim();
    const title = (form.elements.namedItem("title") as HTMLInputElement).value.trim();
    const company = (form.elements.namedItem("company") as HTMLInputElement).value.trim();

    setError("");
    startTransition(async () => {
      try {
        const { id } = await createApplication(url, title || undefined, company || undefined);
        closeModal();
        router.push(`/applications/${id}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add application");
      }
    });
  }

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        + Add
      </button>

      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="backdrop:bg-black/40 backdrop:backdrop-blur-sm rounded-2xl shadow-xl w-full max-w-md p-0 border-0 outline-none m-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-zinc-900">Add Application</h2>
            <button
              type="button"
              onClick={closeModal}
              className="text-zinc-400 hover:text-zinc-600 transition-colors text-xl leading-none"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                Job URL <span className="text-red-400">*</span>
              </label>
              <input
                name="url"
                type="url"
                required
                placeholder="https://example.com/jobs/123"
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                Title <span className="text-zinc-400 font-normal">(auto-detected from URL)</span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                Company <span className="text-zinc-400 font-normal">(auto-detected from URL)</span>
              </label>
              <input
                name="company"
                type="text"
                placeholder="e.g. Acme Corp"
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pending}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {pending ? "Adding…" : "Add Application"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
