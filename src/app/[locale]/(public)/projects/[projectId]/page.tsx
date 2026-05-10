import { ProjectPage } from "@/screens/ProjectPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.project", {
    index: false,
    follow: false,
  });

export default function Project() {
  return <ProjectPage />;
}
