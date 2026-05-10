import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { getStageResourcesKey } from "../getStageResources";
import { IResourceListResponse } from "../../model/stage.types";
import {
  ICreateStageResourceResponse,
  ICreateStageResourceVariables,
} from "./createStageResource.types";
import {
  createStageResourceRequestSchema,
  createStageResourceResponseSchema,
} from "./createStageResource.validation";

export const createStageResourceKey = "createStageResource";

export const createStageResource = async ({
  stageId,
  data,
}: ICreateStageResourceVariables): Promise<ICreateStageResourceResponse> => {
  await validateWithSchema(
    data,
    createStageResourceRequestSchema,
    "/organizer/stages/{stageId}/resources",
  );

  return requestWithValidation<ICreateStageResourceResponse>(
    {
      url: `/organizer/stages/${stageId}/resources`,
      method: "POST",
      data,
    },
    createStageResourceResponseSchema,
    "/organizer/stages/{stageId}/resources",
  );
};

export const useCreateStageResource = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ICreateStageResourceResponse,
    DetailsError,
    ICreateStageResourceVariables
  >({
    mutationKey: [createStageResourceKey],
    mutationFn: createStageResource,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<IResourceListResponse>(
        [getStageResourcesKey, variables.stageId],
        (current) => ({
          resources: [...(current?.resources ?? []), data],
        }),
      );
    },
  });
};

export * from "./createStageResource.types";
export * from "./createStageResource.validation";
