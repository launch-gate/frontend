import { ExpertReviewPage } from "@/screens/ExpertReviewPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.expertReview", {
    index: false,
    follow: false,
  });

export default function ExpertReview() {
  return <ExpertReviewPage />;
}
