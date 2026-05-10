import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { getOrganizerStageFieldsKey } from "../getOrganizerStageFields";
import { IFieldListResponse } from "../../model/stage.types";
import {
  ICreateStageFieldResponse,
  ICreateStageFieldVariables,
} from "./createStageField.types";
import {
  createStageFieldRequestSchema,
  createStageFieldResponseSchema,
} from "./createStageField.validation";

export const createStageFieldKey = "createStageField";

export const createStageField = async ({
  stageId,
  data,
}: ICreateStageFieldVariables): Promise<ICreateStageFieldResponse> => {
  await validateWithSchema(
    data,
    createStageFieldRequestSchema,
    "/organizer/stages/{stageId}/fields",
  );

  return requestWithValidation<ICreateStageFieldResponse>(
    {
      url: `/organizer/stages/${stageId}/fields`,
      method: "POST",
      data,
    },
    createStageFieldResponseSchema,
    "/organizer/stages/{stageId}/fields",
  );
};

export const useCreateStageField = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ICreateStageFieldResponse,
    DetailsError,
    ICreateStageFieldVariables
  >({
    mutationKey: [createStageFieldKey],
    mutationFn: createStageField,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<IFieldListResponse>(
        [getOrganizerStageFieldsKey, variables.stageId],
        (current) => ({
          fields: [...(current?.fields ?? []), data],
        }),
      );
    },
  });
};

export * from "./createStageField.types";
export * from "./createStageField.validation";
