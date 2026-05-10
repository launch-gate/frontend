import { SubmissionReviewPage } from "@/screens/SubmissionReviewPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.organizerStageSubmission", {
    index: false,
    follow: false,
  });

export default function OrganizerStageSubmission() {
  return <SubmissionReviewPage />;
}
