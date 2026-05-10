import "server-only";

import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const BRAND_NAME = "LaunchGate";

const DEFAULT_SITE_URL = "http://localhost:3000";

export type PageSeo = {
  title: string;
  description: string;
  associations?: string[];
  path?: string;
  canonicalPath?: string;
  index?: boolean;
  follow?: boolean;
};

type SeoTranslator = {
  (key: string): string;
  raw: (key: string) => unknown;
};

type PageSeoOptions = Omit<PageSeo, "title" | "description" | "associations">;

const getSearchAssociations = (value: unknown) => {
  if (!Array.isArray(value)) return undefined;

  const associations = value.filter(
    (association): association is string => typeof association === "string",
  );

  return associations.length ? associations : undefined;
};

export const getSiteUrl = () => {
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined;
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    vercelProductionUrl ||
    DEFAULT_SITE_URL;

  try {
    const url = new URL(rawUrl);
    url.pathname = "/";
    url.search = "";
    url.hash = "";
    return url;
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
};

export const getAbsoluteUrl = (path = "/") =>
  new URL(path, getSiteUrl()).toString();

export const createPageMetadata = (seo: PageSeo): Metadata => {
  const index = seo.index ?? true;
  const follow = seo.follow ?? index;
  const canonicalPath = seo.canonicalPath ?? seo.path;

  return {
    metadataBase: getSiteUrl(),
    applicationName: BRAND_NAME,
    title: seo.title,
    description: seo.description,
    keywords: seo.associations,
    icons: {
      icon: [
        {
          url: "/favicon.ico",
          href: "/favicon.ico",
        },
      ],
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    alternates: canonicalPath ? { canonical: canonicalPath } : undefined,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalPath,
      siteName: BRAND_NAME,
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index,
      follow,
      notranslate: true,
      googleBot: {
        index,
        follow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
};

export const createPageSeoFromTranslations = (
  t: SeoTranslator,
  seo: PageSeoOptions = {},
): PageSeo => ({
  ...seo,
  title: t("title"),
  description: t("description"),
  associations: getSearchAssociations(t.raw("associations")),
});

export const getLocalizedPageSeo = async (
  namespace: string,
  seo: PageSeoOptions = {},
) => {
  const t = (await getTranslations(namespace as never)) as SeoTranslator;

  return createPageSeoFromTranslations(t, seo);
};

export const createLocalizedPageMetadata = async (
  namespace: string,
  seo: PageSeoOptions = {},
) => createPageMetadata(await getLocalizedPageSeo(namespace, seo));

export const getWebsiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND_NAME,
  url: getAbsoluteUrl("/home-page"),
  inLanguage: "ru-RU",
  potentialAction: {
    "@type": "SearchAction",
    target: getAbsoluteUrl("/contests?search={search_term_string}"),
    "query-input": "required name=search_term_string",
  },
});

export const toJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

export const cleanSeoText = (value?: string, fallback = "") => {
  const cleanValue = value?.replace(/\s+/g, " ").trim();

  return cleanValue || fallback;
};

export const truncateSeoText = (value: string, limit = 155) =>
  value.length > limit ? `${value.slice(0, limit - 1).trimEnd()}...` : value;
