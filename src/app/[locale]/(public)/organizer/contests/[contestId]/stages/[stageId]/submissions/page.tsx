import { OrganizerStageSubmissionsPage } from "@/screens/OrganizerStageSubmissionsPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.organizerStageSubmissions", {
    index: false,
    follow: false,
  });

export default function OrganizerStageSubmissions() {
  return <OrganizerStageSubmissionsPage />;
}
