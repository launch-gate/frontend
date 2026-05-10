import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { getOrganizerContestStagesKey } from "../getOrganizerContestStages";
import { getOrganizerStageKey } from "../getOrganizerStage";
import { IStageOrganizesListResponse } from "../../model/stage.types";
import {
  ICreateOrganizerContestStageResponse,
  ICreateOrganizerContestStageVariables,
} from "./createOrganizerContestStage.types";
import {
  createOrganizerContestStageRequestSchema,
  createOrganizerContestStageResponseSchema,
} from "./createOrganizerContestStage.validation";

export const createOrganizerContestStageKey = "createOrganizerContestStage";

export const createOrganizerContestStage = async ({
  contestId,
  data,
}: ICreateOrganizerContestStageVariables): Promise<ICreateOrganizerContestStageResponse> => {
  await validateWithSchema(
    data,
    createOrganizerContestStageRequestSchema,
    "/organizer/contests/{contestId}/stages",
  );

  return requestWithValidation<ICreateOrganizerContestStageResponse>(
    {
      url: `/organizer/contests/${contestId}/stages`,
      method: "POST",
      data,
    },
    createOrganizerContestStageResponseSchema,
    "/organizer/contests/{contestId}/stages",
  );
};

export const useCreateOrganizerContestStage = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ICreateOrganizerContestStageResponse,
    DetailsError,
    ICreateOrganizerContestStageVariables
  >({
    mutationKey: [createOrganizerContestStageKey],
    mutationFn: createOrganizerContestStage,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<IStageOrganizesListResponse>(
        [getOrganizerContestStagesKey, variables.contestId],
        (current) => ({
          stages: [...(current?.stages ?? []), data],
        }),
      );

      if (data.id)
        queryClient.setQueryData([getOrganizerStageKey, data.id], data);
    },
  });
};

export * from "./createOrganizerContestStage.types";
export * from "./createOrganizerContestStage.validation";
