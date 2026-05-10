import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { getOrganizerStageKey } from "../getOrganizerStage";
import {
  IUpdateOrganizerStageResponse,
  IUpdateOrganizerStageVariables,
} from "./updateOrganizerStage.types";
import {
  updateOrganizerStageRequestSchema,
  updateOrganizerStageResponseSchema,
} from "./updateOrganizerStage.validation";

export const updateOrganizerStageKey = "updateOrganizerStage";

export const updateOrganizerStage = async ({
  stageId,
  data,
}: IUpdateOrganizerStageVariables): Promise<IUpdateOrganizerStageResponse> => {
  await validateWithSchema(
    data,
    updateOrganizerStageRequestSchema,
    "/organizer/stages/{stageId}",
  );

  return requestWithValidation<IUpdateOrganizerStageResponse>(
    {
      url: `/organizer/stages/${stageId}`,
      method: "PATCH",
      data,
    },
    updateOrganizerStageResponseSchema,
    "/organizer/stages/{stageId}",
  );
};

export const useUpdateOrganizerStage = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IUpdateOrganizerStageResponse,
    DetailsError,
    IUpdateOrganizerStageVariables
  >({
    mutationKey: [updateOrganizerStageKey],
    mutationFn: updateOrganizerStage,
    onSuccess: (data, variables) => {
      queryClient.setQueryData([getOrganizerStageKey, variables.stageId], data);
    },
  });
};

export * from "./updateOrganizerStage.types";
export * from "./updateOrganizerStage.validation";
