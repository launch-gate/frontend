import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetContestStageFieldsResponse,
  IGetContestStageFieldsVariables,
} from "./getContestStageFields.types";
import { getContestStageFieldsResponseSchema } from "./getContestStageFields.validation";

export const getContestStageFieldsKey = "getContestStageFields";

export const getContestStageFields = ({
  stageId,
}: IGetContestStageFieldsVariables): Promise<IGetContestStageFieldsResponse> =>
  requestWithValidation<IGetContestStageFieldsResponse>(
    {
      url: `/contests/stages/${stageId}/fields`,
      method: "GET",
    },
    getContestStageFieldsResponseSchema,
    "/contests/stages/{stageId}/fields",
  );

export const useGetContestStageFields = (stageId: number, enabled = true) =>
  useQuery<IGetContestStageFieldsResponse, DetailsError>({
    queryKey: [getContestStageFieldsKey, stageId],
    queryFn: () => getContestStageFields({ stageId }),
    enabled,
  });

export * from "./getContestStageFields.types";
export * from "./getContestStageFields.validation";
