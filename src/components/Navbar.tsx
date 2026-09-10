"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const PUBLIC_LINKS = [
  { href: "/", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/knowledge", label: "Knowledge" },
];

export default function Navbar({ isAuthenticated }: { isAuthenticated: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const links = isAuthenticated
    ? [...PUBLIC_LINKS, { href: "/applications", label: "Applications" }]
    : PUBLIC_LINKS;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-zinc-200">
      <nav className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-zinc-900 font-semibold text-lg tracking-tight hover:text-indigo-600 transition-colors"
        >
          Maxim Spasyonov
        </Link>
        <div className="flex items-center gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname === href || pathname.startsWith(href + "/")
                  ? "text-indigo-600"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {label}
            </Link>
          ))}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={`text-sm font-medium transition-colors ${
                pathname === "/login" ? "text-indigo-600" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
