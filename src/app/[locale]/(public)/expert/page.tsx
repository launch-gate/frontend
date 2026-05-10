import { ExpertPage } from "@/screens/ExpertPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.expert", {
    path: "/expert",
    index: false,
    follow: false,
  });

export default function Expert() {
  return <ExpertPage />;
}
