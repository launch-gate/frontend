import { useMutation } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IExportContestRankingResponse,
  IExportContestRankingVariables,
} from "./exportContestRanking.types";
import { exportContestRankingResponseSchema } from "./exportContestRanking.validation";

export const exportContestRankingKey = "exportContestRanking";

export const exportContestRanking = ({
  contestId,
  format = "CSV",
}: IExportContestRankingVariables): Promise<IExportContestRankingResponse> =>
  requestWithValidation<IExportContestRankingResponse>(
    {
      url: `/organizer/contests/${contestId}/exports/ranking`,
      method: "GET",
      params: { format },
      responseType: "blob",
    },
    exportContestRankingResponseSchema,
    "/organizer/contests/{contestId}/exports/ranking",
  );

export const useExportContestRanking = () =>
  useMutation<
    IExportContestRankingResponse,
    DetailsError,
    IExportContestRankingVariables
  >({
    mutationKey: [exportContestRankingKey],
    mutationFn: exportContestRanking,
  });

export * from "./exportContestRanking.types";
export * from "./exportContestRanking.validation";
