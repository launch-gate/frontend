import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { getOrganizerStageFieldsKey } from "../getOrganizerStageFields";
import { IFieldListResponse } from "../../model/stage.types";
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

export const useDeleteStageField = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IDeleteStageFieldResponse,
    DetailsError,
    IDeleteStageFieldVariables
  >({
    mutationKey: [deleteStageFieldKey],
    mutationFn: deleteStageField,
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<IFieldListResponse>(
        [getOrganizerStageFieldsKey, variables.stageId],
        (current) => ({
          fields: (current?.fields ?? []).filter(
            (field) => field.id !== variables.fieldId,
          ),
        }),
      );
    },
  });
};

export * from "./deleteStageField.types";
export * from "./deleteStageField.validation";
