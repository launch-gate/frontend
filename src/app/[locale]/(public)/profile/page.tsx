import { ProfilePage } from "@/screens/ProfilePage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.profile", {
    path: "/profile",
    index: false,
    follow: false,
  });

export default function Profile() {
  return <ProfilePage />;
}
