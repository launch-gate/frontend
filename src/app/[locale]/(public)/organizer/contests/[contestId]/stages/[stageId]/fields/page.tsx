import { StageFieldsBuilderPage } from "@/screens/StageFieldsBuilderPage";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.stageFieldsBuilder", {
    index: false,
    follow: false,
  });

export default function StageFields() {
  return <StageFieldsBuilderPage />;
}
