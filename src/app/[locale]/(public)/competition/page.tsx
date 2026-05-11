import { HydrationBoundary } from "@tanstack/react-query";

import { prefetchGetContests } from "@/entities/contest";
import { CompetitionListPage } from "@/screens/CompetitionListPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.legacyCompetitionList", {
    path: "/competition",
    canonicalPath: "/contests",
    index: false,
    follow: true,
  });

export default async function CompetitionList() {
  const contestsState = await prefetchGetContests();

  return (
    <HydrationBoundary state={contestsState}>
      <CompetitionListPage />
    </HydrationBoundary>
  );
}
