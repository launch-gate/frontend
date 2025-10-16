import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru"],
  defaultLocale: "ru",
  pathnames: {},
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;

export const { getPathname, redirect, usePathname, useRouter, Link } =
  createNavigation(routing);
