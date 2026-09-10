import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

const BEARER_PROTECTED = /^\/api\/(?!auth\/)/;
const SESSION_PROTECTED = [/^\/applications(\/|$)/, /^\/knowledge\/new(\/|$)/, /^\/knowledge\/[^/]+\/edit(\/|$)/];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (BEARER_PROTECTED.test(pathname)) {
    const auth = request.headers.get("authorization");
    if (!auth || auth !== `Bearer ${process.env.API_SECRET_KEY}`) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (SESSION_PROTECTED.some((re) => re.test(pathname))) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      await verifySession(token);
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
