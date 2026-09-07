import type { EntryType } from "@prisma/client";

const config: Record<EntryType, { label: string; className: string }> = {
  ARTICLE:     { label: "Article",     className: "bg-blue-50 text-blue-600 border-blue-100" },
  EXAMPLE:     { label: "Example",     className: "bg-green-50 text-green-600 border-green-100" },
  EXPLANATION: { label: "Explanation", className: "bg-purple-50 text-purple-600 border-purple-100" },
  NOTE:        { label: "Note",        className: "bg-amber-50 text-amber-600 border-amber-100" },
};

export function TypeBadge({ type }: { type: EntryType }) {
  const { label, className } = config[type];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      {label}
    </span>
  );
}
