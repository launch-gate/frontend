import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { getStageResourcesKey } from "../getStageResources";
import { IResourceListResponse } from "../../model/stage.types";
import {
  IUpdateStageResourceResponse,
  IUpdateStageResourceVariables,
} from "./updateStageResource.types";
import {
  updateStageResourceRequestSchema,
  updateStageResourceResponseSchema,
} from "./updateStageResource.validation";

export const updateStageResourceKey = "updateStageResource";

export const updateStageResource = async ({
  stageId,
  resourceId,
  data,
}: IUpdateStageResourceVariables): Promise<IUpdateStageResourceResponse> => {
  await validateWithSchema(
    data,
    updateStageResourceRequestSchema,
    "/organizer/stages/{stageId}/resources/{resourceId}",
  );

  return requestWithValidation<IUpdateStageResourceResponse>(
    {
      url: `/organizer/stages/${stageId}/resources/${resourceId}`,
      method: "PATCH",
      data,
    },
    updateStageResourceResponseSchema,
    "/organizer/stages/{stageId}/resources/{resourceId}",
  );
};

export const useUpdateStageResource = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IUpdateStageResourceResponse,
    DetailsError,
    IUpdateStageResourceVariables
  >({
    mutationKey: [updateStageResourceKey],
    mutationFn: updateStageResource,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<IResourceListResponse>(
        [getStageResourcesKey, variables.stageId],
        (current) => ({
          resources: (current?.resources ?? []).map((resource) =>
            resource.id === variables.resourceId ? data : resource,
          ),
        }),
      );
    },
  });
};

export * from "./updateStageResource.types";
export * from "./updateStageResource.validation";
