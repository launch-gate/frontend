import { useMutation } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IDeleteStageResourceResponse,
  IDeleteStageResourceVariables,
} from "./deleteStageResource.types";
import { deleteStageResourceResponseSchema } from "./deleteStageResource.validation";

export const deleteStageResourceKey = "deleteStageResource";

export const deleteStageResource = ({
  stageId,
  resourceId,
}: IDeleteStageResourceVariables): Promise<IDeleteStageResourceResponse> =>
  requestWithValidation<IDeleteStageResourceResponse>(
    {
      url: `/organizer/stages/${stageId}/resources/${resourceId}`,
      method: "DELETE",
    },
    deleteStageResourceResponseSchema,
    "/organizer/stages/{stageId}/resources/{resourceId}",
  );

export const useDeleteStageResource = () =>
  useMutation<
    IDeleteStageResourceResponse,
    DetailsError,
    IDeleteStageResourceVariables
  >({
    mutationKey: [deleteStageResourceKey],
    mutationFn: deleteStageResource,
  });

export * from "./deleteStageResource.types";
export * from "./deleteStageResource.validation";
