import { useMutation } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IRegisterTeamContestResponse,
  IRegisterTeamContestVariables,
} from "./registerTeamContest.types";
import { registerTeamContestResponseSchema } from "./registerTeamContest.validation";

export const registerTeamContestKey = "registerTeamContest";

export const registerTeamContest = ({
  contestId,
}: IRegisterTeamContestVariables): Promise<IRegisterTeamContestResponse> =>
  requestWithValidation<IRegisterTeamContestResponse>(
    {
      url: `/contests/teams/${contestId}/registrations`,
      method: "POST",
    },
    registerTeamContestResponseSchema,
    "/contests/teams/{contestId}/registrations",
  );

export const useRegisterTeamContest = () =>
  useMutation<
    IRegisterTeamContestResponse,
    DetailsError,
    IRegisterTeamContestVariables
  >({
    mutationKey: [registerTeamContestKey],
    mutationFn: registerTeamContest,
  });

export * from "./registerTeamContest.types";
export * from "./registerTeamContest.validation";
