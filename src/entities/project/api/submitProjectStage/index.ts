import { useMutation } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  ISubmitProjectStageRequestVariables,
  ISubmitProjectStageResponse,
} from "./submitProjectStage.types";
import { submitProjectStageResponseSchema } from "./submitProjectStage.validation";

export const submitProjectStageKey = "submitProjectStage";

export const submitProjectStage = ({
  projectId,
  stageId,
}: ISubmitProjectStageRequestVariables): Promise<ISubmitProjectStageResponse> =>
  requestWithValidation<ISubmitProjectStageResponse>(
    {
      url: `/projects/${projectId}/stages/${stageId}/submit`,
      method: "POST",
    },
    submitProjectStageResponseSchema,
    "/projects/{projectId}/stages/{stageId}/submit",
  );

export const useSubmitProjectStage = () =>
  useMutation<
    ISubmitProjectStageResponse,
    DetailsError,
    ISubmitProjectStageRequestVariables
  >({
    mutationKey: [submitProjectStageKey],
    mutationFn: submitProjectStage,
  });

export * from "./submitProjectStage.types";
export * from "./submitProjectStage.validation";
