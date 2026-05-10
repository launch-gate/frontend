import { useMutation } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";
import { toValueRequest } from "@/entities/stage";

import {
  ISaveProjectStageValueRequestVariables,
  ISaveProjectStageValueResponse,
} from "./saveProjectStageValue.types";
import {
  saveProjectStageValueRequestSchema,
  saveProjectStageValueResponseSchema,
} from "./saveProjectStageValue.validation";

export const saveProjectStageValueKey = "saveProjectStageValue";

export const saveProjectStageValue = async ({
  projectId,
  stageId,
  data,
}: ISaveProjectStageValueRequestVariables): Promise<ISaveProjectStageValueResponse> => {
  const requestData = toValueRequest(data);
  await validateWithSchema(
    requestData,
    saveProjectStageValueRequestSchema,
    "/projects/{projectId}/stages/{stageId}/values",
  );

  return requestWithValidation<ISaveProjectStageValueResponse>(
    {
      url: `/projects/${projectId}/stages/${stageId}/values`,
      method: "POST",
      data: requestData,
    },
    saveProjectStageValueResponseSchema,
    "/projects/{projectId}/stages/{stageId}/values",
  );
};

export const useSaveProjectStageValue = () =>
  useMutation<
    ISaveProjectStageValueResponse,
    DetailsError,
    ISaveProjectStageValueRequestVariables
  >({
    mutationKey: [saveProjectStageValueKey],
    mutationFn: saveProjectStageValue,
  });

export * from "./saveProjectStageValue.types";
export * from "./saveProjectStageValue.validation";
