import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetStageResourcesResponse,
  IGetStageResourcesVariables,
} from "./getStageResources.types";
import { getStageResourcesResponseSchema } from "./getStageResources.validation";

export const getStageResourcesKey = "getStageResources";

export const getStageResources = ({
  stageId,
}: IGetStageResourcesVariables): Promise<IGetStageResourcesResponse> =>
  requestWithValidation<IGetStageResourcesResponse>(
    {
      url: `/stages/${stageId}/resources`,
      method: "GET",
    },
    getStageResourcesResponseSchema,
    "/stages/{stageId}/resources",
  );

export const useGetStageResources = (stageId: number, enabled = true) =>
  useQuery<IGetStageResourcesResponse, DetailsError>({
    queryKey: [getStageResourcesKey, stageId],
    queryFn: () => getStageResources({ stageId }),
    enabled,
  });

export * from "./getStageResources.types";
export * from "./getStageResources.validation";
