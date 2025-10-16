import { getRequestConfig } from "next-intl/server";

import { LanguageType } from "../model/locale.types";
import { routing } from "./routing";

export const locales: LanguageType[] = ["ru"];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as LanguageType;

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../../../locales/ru.json`)).default,
  };
});
