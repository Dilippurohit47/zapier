import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("zapier-token");
  const { pathname } = request.nextUrl;

  if (sessionToken && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    !sessionToken &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/zap"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/zap/:path*", "/login", "/signup"],
};
