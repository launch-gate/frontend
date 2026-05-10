import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { locales } from "@/entities/locale";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "ru",
  localePrefix: "never",
});

export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|web|auth|routes|guest|assets|.*\\..*).*)"],
};
