import { StageSubmissionPage } from "@/screens/StageSubmissionPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.projectStage", {
    index: false,
    follow: false,
  });

export default function StageSubmission() {
  return <StageSubmissionPage />;
}
