import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetContestStageResponse,
  IGetContestStageVariables,
} from "./getContestStage.types";
import { getContestStageResponseSchema } from "./getContestStage.validation";

export const getContestStageKey = "getContestStage";

export const getContestStage = ({
  stageId,
}: IGetContestStageVariables): Promise<IGetContestStageResponse> =>
  requestWithValidation<IGetContestStageResponse>(
    {
      url: `/contests/stages/${stageId}`,
      method: "GET",
    },
    getContestStageResponseSchema,
    "/contests/stages/{stageId}",
  );

export const useGetContestStage = (stageId: number, enabled = true) =>
  useQuery<IGetContestStageResponse, DetailsError>({
    ...getContestStageQueryOptions(stageId),
    enabled,
  });

export const getContestStageQueryOptions = (stageId: number) => ({
    queryKey: [getContestStageKey, stageId],
    queryFn: () => getContestStage({ stageId }),
});

export * from "./getContestStage.types";
export * from "./getContestStage.validation";
