import { PropsWithChildren } from "react";
import { Sansation } from "next/font/google";
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

const sansation = Sansation({
  weight: ["300", "400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-sansation",
});

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
      <body className={`${sansation.variable} font-sans`}>
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
