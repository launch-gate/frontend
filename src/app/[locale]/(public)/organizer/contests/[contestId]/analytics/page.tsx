import { ContestAnalyticsPage } from "@/screens/ContestAnalyticsPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.organizerAnalytics", {
    index: false,
    follow: false,
  });

export default function ContestAnalytics() {
  return <ContestAnalyticsPage />;
}
