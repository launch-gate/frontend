import { OrganizerPage } from "@/screens/OrganizerPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.organizer", {
    path: "/organizer",
    index: false,
    follow: false,
  });

export default function Organizer() {
  return <OrganizerPage />;
}
