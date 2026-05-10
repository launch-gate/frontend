import { MentorPage } from "@/screens/MentorPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.mentor", {
    path: "/mentor",
    index: false,
    follow: false,
  });

export default function Mentor() {
  return <MentorPage />;
}
