import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import {
  getContestStageFieldsQueryOptions,
  getContestStageQueryOptions,
  getStageResourcesQueryOptions,
} from "@/entities/stage";
import { StageSubmissionPage } from "@/screens/StageSubmissionPage";
import { createQueryClient } from "@/shared/api/queryClient";
import { createLocalizedPageMetadata } from "@/shared/config/seo";

type PageProps = {
  params: Promise<{ projectId: string; stageId: string }>;
};

const prefetchStageSubmissionPage = async (stageId: number) => {
  const queryClient = createQueryClient();

  if (Number.isFinite(stageId) && stageId > 0) {
    await Promise.all([
      queryClient.prefetchQuery(getContestStageQueryOptions(stageId)),
      queryClient.prefetchQuery(getContestStageFieldsQueryOptions(stageId)),
      queryClient.prefetchQuery(getStageResourcesQueryOptions(stageId)),
    ]);
  }

  return dehydrate(queryClient);
};

export const generateMetadata = () =>
  createLocalizedPageMetadata("seo.pages.projectStage", {
    index: false,
    follow: false,
  });

export default async function StageSubmission({ params }: PageProps) {
  const { stageId } = await params;
  const stageSubmissionState = await prefetchStageSubmissionPage(
    Number(stageId),
  );

  return (
    <HydrationBoundary state={stageSubmissionState}>
      <StageSubmissionPage />
    </HydrationBoundary>
  );
}
