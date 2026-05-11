import { PropsWithChildren } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { LanguageType } from "@/entities/locale";
import { WithProviders } from "@/app/(providers)";
import {
  createLocalizedPageMetadata,
  getWebsiteJsonLd,
  toJsonLd,
} from "@/shared/config/seo";
import "./(theme)/global.css";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.homePage", {
    path: "/home-page",
    index: true,
    follow: true,
  });

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale: LanguageType = "ru";
  setRequestLocale(locale);

  const messages = await getMessages();
  const websiteJsonLd = getWebsiteJsonLd();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sansation:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(websiteJsonLd) }}
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <WithProviders>{children}</WithProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
