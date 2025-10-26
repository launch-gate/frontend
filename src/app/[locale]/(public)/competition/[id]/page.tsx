"use server";

import { getTranslations } from "next-intl/server";

import { CompetitionPage } from "@/screens/CompetitionPage";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t("metadata.title.competition"),
    description: t("metadata.description"),
  };
}

export default async function Competition() {
  return <CompetitionPage />;
}
