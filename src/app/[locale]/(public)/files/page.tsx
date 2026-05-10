import { FilesPage } from "@/screens/FilesPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.files", {
    path: "/files",
    index: false,
    follow: false,
  });

export default function Files() {
  return <FilesPage />;
}
