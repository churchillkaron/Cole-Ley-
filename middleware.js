import { NextResponse } from "next/server";

const AVANTIQO_LOGIN = "https://avantiqo.ai/login";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/dashboard") ||
    pathname.startsWith("/api/invoice") ||
    pathname.startsWith("/api/quotation") ||
    pathname.startsWith("/api/expenses")
  ) {
    return NextResponse.json(
      {
        error: "LEGACY_FINANCE_RETIRED",
        message: "Cole Ley finance is now governed in Avantiqo.",
      },
      {
        status: 410,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  return NextResponse.redirect(AVANTIQO_LOGIN, 307);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/invoice/:path*",
    "/expenses/:path*",
    "/api/dashboard/:path*",
    "/api/invoice/:path*",
    "/api/quotation/:path*",
    "/api/expenses/:path*",
  ],
};
