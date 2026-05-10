import { HomePage } from "@/screens/HomePage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.homePage", {
    path: "/home-page",
    index: true,
    follow: true,
  });

export default async function Home() {
  return <HomePage />;
}
