import { useMutation } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IDeleteOrganizerStageResponse,
  IDeleteOrganizerStageVariables,
} from "./deleteOrganizerStage.types";
import { deleteOrganizerStageResponseSchema } from "./deleteOrganizerStage.validation";

export const deleteOrganizerStageKey = "deleteOrganizerStage";

export const deleteOrganizerStage = ({
  stageId,
}: IDeleteOrganizerStageVariables): Promise<IDeleteOrganizerStageResponse> =>
  requestWithValidation<IDeleteOrganizerStageResponse>(
    {
      url: `/organizer/stages/${stageId}`,
      method: "DELETE",
    },
    deleteOrganizerStageResponseSchema,
    "/organizer/stages/{stageId}",
  );

export const useDeleteOrganizerStage = () =>
  useMutation<
    IDeleteOrganizerStageResponse,
    DetailsError,
    IDeleteOrganizerStageVariables
  >({
    mutationKey: [deleteOrganizerStageKey],
    mutationFn: deleteOrganizerStage,
  });

export * from "./deleteOrganizerStage.types";
export * from "./deleteOrganizerStage.validation";
