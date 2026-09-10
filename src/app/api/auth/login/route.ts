import { cookies } from "next/headers";
import { signSession, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  const { passphrase } = await req.json();

  if (passphrase !== process.env.AUTH_PASSPHRASE) {
    return Response.json({ error: "Invalid passphrase" }, { status: 401 });
  }

  const token = await signSession();
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return Response.json({ ok: true });
}
