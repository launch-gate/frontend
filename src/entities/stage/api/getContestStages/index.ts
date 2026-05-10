import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetContestStagesResponse,
  IGetContestStagesVariables,
} from "./getContestStages.types";
import { getContestStagesResponseSchema } from "./getContestStages.validation";

export const getContestStagesKey = "getContestStages";

export const getContestStages = ({
  contestId,
}: IGetContestStagesVariables): Promise<IGetContestStagesResponse> =>
  requestWithValidation<IGetContestStagesResponse>(
    {
      url: `/contests/${contestId}/stages`,
      method: "GET",
    },
    getContestStagesResponseSchema,
    "/contests/{contestId}/stages",
  );

export const useGetContestStages = (contestId: number, enabled = true) =>
  useQuery<IGetContestStagesResponse, DetailsError>({
    queryKey: [getContestStagesKey, contestId],
    queryFn: () => getContestStages({ contestId }),
    enabled,
  });

export * from "./getContestStages.types";
export * from "./getContestStages.validation";
