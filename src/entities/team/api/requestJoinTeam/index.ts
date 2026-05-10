import { useMutation } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IRequestJoinTeamResponse,
  IRequestJoinTeamVariables,
} from "./requestJoinTeam.types";
import { requestJoinTeamResponseSchema } from "./requestJoinTeam.validation";

export const requestJoinTeamKey = "requestJoinTeam";

export const requestJoinTeam = ({
  teamId,
}: IRequestJoinTeamVariables): Promise<IRequestJoinTeamResponse> =>
  requestWithValidation<IRequestJoinTeamResponse>(
    {
      url: `/contests/teams/${teamId}/join-requests`,
      method: "POST",
    },
    requestJoinTeamResponseSchema,
    "/contests/teams/{teamId}/join-requests",
  );

export const useRequestJoinTeam = () =>
  useMutation<
    IRequestJoinTeamResponse,
    DetailsError,
    IRequestJoinTeamVariables
  >({
    mutationKey: [requestJoinTeamKey],
    mutationFn: requestJoinTeam,
  });

export * from "./requestJoinTeam.types";
export * from "./requestJoinTeam.validation";
