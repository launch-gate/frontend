import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { getContestTeamsKey } from "../getContestTeams";
import { IAllTeamsResponse } from "../../model/team.types";
import {
  ICreateContestTeamResponse,
  ICreateContestTeamVariables,
} from "./createContestTeam.types";
import {
  createContestTeamRequestSchema,
  createContestTeamResponseSchema,
} from "./createContestTeam.validation";

export const createContestTeamKey = "createContestTeam";

export const createContestTeam = async ({
  contestId,
  data,
}: ICreateContestTeamVariables): Promise<ICreateContestTeamResponse> => {
  await validateWithSchema(
    data,
    createContestTeamRequestSchema,
    "/contests/teams/{contestId}",
  );

  return requestWithValidation<ICreateContestTeamResponse>(
    {
      url: `/contests/teams/${contestId}`,
      method: "POST",
      data,
    },
    createContestTeamResponseSchema,
    "/contests/teams/{contestId}",
  );
};

export const useCreateContestTeam = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ICreateContestTeamResponse,
    DetailsError,
    ICreateContestTeamVariables
  >({
    mutationKey: [createContestTeamKey],
    mutationFn: createContestTeam,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<IAllTeamsResponse>(
        [getContestTeamsKey, variables.contestId],
        (current) => ({
          teams: [...(current?.teams ?? []), data],
        }),
      );
    },
  });
};

export * from "./createContestTeam.types";
export * from "./createContestTeam.validation";
