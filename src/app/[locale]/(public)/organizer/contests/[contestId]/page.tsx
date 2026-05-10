import { ContestBuilderPage } from "@/screens/ContestBuilderPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.organizerContest", {
    index: false,
    follow: false,
  });

export default function OrganizerContest() {
  return <ContestBuilderPage />;
}
