import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  const userRole = request.cookies.get("userRole")?.value;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};