import { TeamMentorPage } from "@/screens/TeamMentorPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.teamMentor", {
    index: false,
    follow: false,
  });

export default function TeamMentor() {
  return <TeamMentorPage />;
}
