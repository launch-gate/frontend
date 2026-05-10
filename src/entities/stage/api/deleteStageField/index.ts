import { useMutation } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IDeleteStageFieldResponse,
  IDeleteStageFieldVariables,
} from "./deleteStageField.types";
import { deleteStageFieldResponseSchema } from "./deleteStageField.validation";

export const deleteStageFieldKey = "deleteStageField";

export const deleteStageField = ({
  stageId,
  fieldId,
}: IDeleteStageFieldVariables): Promise<IDeleteStageFieldResponse> =>
  requestWithValidation<IDeleteStageFieldResponse>(
    {
      url: `/organizer/stages/${stageId}/fields/${fieldId}`,
      method: "DELETE",
    },
    deleteStageFieldResponseSchema,
    "/organizer/stages/{stageId}/fields/{fieldId}",
  );

export const useDeleteStageField = () =>
  useMutation<
    IDeleteStageFieldResponse,
    DetailsError,
    IDeleteStageFieldVariables
  >({
    mutationKey: [deleteStageFieldKey],
    mutationFn: deleteStageField,
  });

export * from "./deleteStageField.types";
export * from "./deleteStageField.validation";
