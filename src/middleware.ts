import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { locales } from "@/entities/locale";
import { publicRoutes } from "@/shared/config";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "ru",
  localePrefix: "never",
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathIgnoreName =
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/web/") ||
    pathname.startsWith("/auth/") ||
    pathname.startsWith("/routes/") ||
    pathname.startsWith("/guest/") ||
    pathname.startsWith("/assets/") ||
    pathname === "/changelog.json" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/service-worker.js" ||
    pathname === "/favicon.ico";

  if (pathIgnoreName) {
    return NextResponse.next();
  }

  const currentRoute = pathname.replace(/(\/[^\/]+)$/, "") || pathname;

  if (publicRoutes.includes(currentRoute)) {
    return intlMiddleware(request);
  }

  return intlMiddleware(request);
}

export const config = {
  runtime: "nodejs",
};
