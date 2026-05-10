import { AuthPage } from "@/screens/AuthPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.auth", {
    path: "/auth",
    index: false,
    follow: false,
  });

export default function Auth() {
  return <AuthPage />;
}
