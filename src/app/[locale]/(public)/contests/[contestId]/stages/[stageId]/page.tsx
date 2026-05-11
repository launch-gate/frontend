import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";

import { getContestStageQueryOptions } from "@/entities/stage";
import { StagePage } from "@/screens/StagePage";
import { fetchPublicApi } from "@/shared/api/publicApi";
import { createQueryClient } from "@/shared/api/queryClient";
import {
  BRAND_NAME,
  cleanSeoText,
  createPageMetadata,
  getLocalizedPageSeo,
  truncateSeoText,
} from "@/shared/config/seo";

type PageProps = {
  params: Promise<{ contestId: string; stageId: string }>;
};

type StageSeoInfo = {
  title?: string;
  description?: string;
};

const fetchStageSeo = (stageId: string) =>
  fetchPublicApi<StageSeoInfo>(`/contests/stages/${stageId}`);

const prefetchStagePage = async (stageId: number) => {
  const queryClient = createQueryClient();

  if (Number.isFinite(stageId) && stageId > 0) {
    await queryClient.prefetchQuery(getContestStageQueryOptions(stageId));
  }

  return dehydrate(queryClient);
};

export async function generateMetadata({ params }: PageProps) {
  const { contestId, stageId } = await params;
  const t = await getTranslations("seo.pages.contestStage");
  const pageSeo = await getLocalizedPageSeo("seo.pages.contestStage", {
    index: true,
    follow: true,
  });
  const stage = await fetchStageSeo(stageId);
  const title = cleanSeoText(stage?.title);
  const titlePart = t("titlePart");
  const description = truncateSeoText(
    cleanSeoText(stage?.description, pageSeo.description),
  );

  return createPageMetadata({
    ...pageSeo,
    path: `/contests/${contestId}/stages/${stageId}`,
    title: title
      ? `${title} | ${titlePart} | ${BRAND_NAME}`
      : pageSeo.title,
    description,
  });
}

export default async function StagePageRoute({ params }: PageProps) {
  const { stageId } = await params;
  const stageState = await prefetchStagePage(Number(stageId));

  return (
    <HydrationBoundary state={stageState}>
      <StagePage />
    </HydrationBoundary>
  );
}
