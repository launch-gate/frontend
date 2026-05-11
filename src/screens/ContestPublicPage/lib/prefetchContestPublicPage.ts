import { dehydrate } from "@tanstack/react-query";

import {
  getContestParticipantsQueryOptions,
  getContestQueryOptions,
} from "@/entities/contest";
import { getContestStagesQueryOptions } from "@/entities/stage";
import { getContestTeamsQueryOptions } from "@/entities/team";
import { createQueryClient } from "@/shared/api/queryClient";

export const prefetchContestPublicPage = async (contestId: number) => {
  const queryClient = createQueryClient();

  if (Number.isFinite(contestId) && contestId > 0) {
    await Promise.all([
      queryClient.prefetchQuery(getContestQueryOptions(contestId)),
      queryClient.prefetchQuery(getContestStagesQueryOptions(contestId)),
      queryClient.prefetchQuery(getContestParticipantsQueryOptions(contestId)),
      queryClient.prefetchQuery(getContestTeamsQueryOptions(contestId)),
    ]);
  }

  return dehydrate(queryClient);
};
