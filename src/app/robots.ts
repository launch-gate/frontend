import { MetadataRoute } from "next";

import { getAbsoluteUrl, getSiteUrl } from "@/shared/config/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/auth",
        "/profile",
        "/files",
        "/organizer",
        "/expert",
        "/mentor",
        "/projects",
        "/teams",
      ],
    },
    sitemap: getAbsoluteUrl("/sitemap.xml"),
    host: getSiteUrl().origin,
  };
}
