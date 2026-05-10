import { OrganizerEvaluationsPage } from "@/screens/OrganizerEvaluationsPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.organizerEvaluations", {
    path: "/organizer/evaluations",
    index: false,
    follow: false,
  });

export default function OrganizerEvaluations() {
  return <OrganizerEvaluationsPage />;
}
