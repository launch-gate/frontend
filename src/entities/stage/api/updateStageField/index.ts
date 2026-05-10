import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { getOrganizerStageFieldsKey } from "../getOrganizerStageFields";
import { IFieldListResponse } from "../../model/stage.types";
import {
  IUpdateStageFieldResponse,
  IUpdateStageFieldVariables,
} from "./updateStageField.types";
import {
  updateStageFieldRequestSchema,
  updateStageFieldResponseSchema,
} from "./updateStageField.validation";

export const updateStageFieldKey = "updateStageField";

export const updateStageField = async ({
  stageId,
  fieldId,
  data,
}: IUpdateStageFieldVariables): Promise<IUpdateStageFieldResponse> => {
  await validateWithSchema(
    data,
    updateStageFieldRequestSchema,
    "/organizer/stages/{stageId}/fields/{fieldId}",
  );

  return requestWithValidation<IUpdateStageFieldResponse>(
    {
      url: `/organizer/stages/${stageId}/fields/${fieldId}`,
      method: "PATCH",
      data,
    },
    updateStageFieldResponseSchema,
    "/organizer/stages/{stageId}/fields/{fieldId}",
  );
};

export const useUpdateStageField = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IUpdateStageFieldResponse,
    DetailsError,
    IUpdateStageFieldVariables
  >({
    mutationKey: [updateStageFieldKey],
    mutationFn: updateStageField,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<IFieldListResponse>(
        [getOrganizerStageFieldsKey, variables.stageId],
        (current) => ({
          fields: (current?.fields ?? []).map((field) =>
            field.id === variables.fieldId ? data : field,
          ),
        }),
      );
    },
  });
};

export * from "./updateStageField.types";
export * from "./updateStageField.validation";
