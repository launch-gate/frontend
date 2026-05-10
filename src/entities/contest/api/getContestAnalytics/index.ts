import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetContestAnalyticsResponse,
  IGetContestAnalyticsVariables,
} from "./getContestAnalytics.types";
import { getContestAnalyticsResponseSchema } from "./getContestAnalytics.validation";

export const getContestAnalyticsKey = "getContestAnalytics";

export const getContestAnalytics = ({
  contestId,
}: IGetContestAnalyticsVariables): Promise<IGetContestAnalyticsResponse> =>
  requestWithValidation<IGetContestAnalyticsResponse>(
    {
      url: `/organizer/contests/${contestId}/analytics`,
      method: "GET",
    },
    getContestAnalyticsResponseSchema,
    "/organizer/contests/{contestId}/analytics",
  );

export const useGetContestAnalytics = (contestId: number) =>
  useQuery<IGetContestAnalyticsResponse, DetailsError>({
    queryKey: [getContestAnalyticsKey, contestId],
    queryFn: () => getContestAnalytics({ contestId }),
  });

export * from "./getContestAnalytics.types";
export * from "./getContestAnalytics.validation";
