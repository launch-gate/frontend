import { CompetitionListPage } from "@/screens/CompetitionListPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.contests", {
    path: "/contests",
    index: true,
    follow: true,
  });

export default async function ContestList() {
  return <CompetitionListPage />;
}
