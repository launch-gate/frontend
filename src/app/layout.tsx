import { PropsWithChildren } from "react";
import { Sansation } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { LanguageType } from "@/entities/locale";
import { WithProviders } from "@/app/(providers)";
import "./(theme)/global.css";

const sansation = Sansation({
  weight: ["300", "400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-sansation",
});

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t("metadata.title.main"),
    description: t("metadata.description"),
    robots: {
      index: true,
      notranslate: true,
    },
    icons: {
      icon: [
        {
          media: "(prefers-color-scheme: light)",
          url: "/favicon-light.ico",
          href: "/favicon-light.ico",
        },
      ],
    },
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale: LanguageType = "ru";
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${sansation.variable} font-sans`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <WithProviders>{children}</WithProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
