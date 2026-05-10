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
  return <CompetitionListPage />;
}
