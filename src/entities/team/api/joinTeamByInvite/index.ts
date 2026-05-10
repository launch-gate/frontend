import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { getContestTeamsKey } from "../getContestTeams";
import { IAllTeamsResponse } from "../../model/team.types";
import {
  IJoinTeamByInviteResponse,
  IJoinTeamByInviteVariables,
} from "./joinTeamByInvite.types";
import { joinTeamByInviteResponseSchema } from "./joinTeamByInvite.validation";

export const joinTeamByInviteKey = "joinTeamByInvite";

export const joinTeamByInvite = ({
  inviteToken,
}: IJoinTeamByInviteVariables): Promise<IJoinTeamByInviteResponse> =>
  requestWithValidation<IJoinTeamByInviteResponse>(
    {
      url: `/contests/teams/join-by-invite/${inviteToken}`,
      method: "POST",
    },
    joinTeamByInviteResponseSchema,
    "/contests/teams/join-by-invite/{inviteToken}",
  );

export const useJoinTeamByInvite = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IJoinTeamByInviteResponse,
    DetailsError,
    IJoinTeamByInviteVariables
  >({
    mutationKey: [joinTeamByInviteKey],
    mutationFn: joinTeamByInvite,
    onSuccess: (data) => {
      if (!data.contestId) return;

      queryClient.setQueryData<IAllTeamsResponse>(
        [getContestTeamsKey, data.contestId],
        (current) =>
          current
            ? {
                teams: (current.teams ?? []).map((team) =>
                  team.id === data.id ? data : team,
                ),
              }
            : current,
      );
    },
  });
};

export * from "./joinTeamByInvite.types";
export * from "./joinTeamByInvite.validation";
