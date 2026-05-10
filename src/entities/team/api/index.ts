import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";
import { IParticipantContestRegistrationResponse } from "@/entities/contest";

import {
  IAllTeamsResponse,
  ITeamJoinRequestListResponse,
  ITeamJoinRequestResponse,
  ITeamRequest,
  ITeamRequestJoinResponse,
  ITeamResponse,
} from "../model/team.types";
import {
  allTeamsSchema,
  participantContestRegistrationSchema,
  teamJoinRequestListSchema,
  teamJoinRequestSchema,
  teamRequestJoinSchema,
  teamRequestSchema,
  teamSchema,
} from "../model/team.validation";

export const getContestTeamsKey = "getContestTeams";
export const createContestTeamKey = "createContestTeam";
export const registerTeamContestKey = "registerTeamContest";
export const joinTeamByInviteKey = "joinTeamByInvite";
export const requestJoinTeamKey = "requestJoinTeam";
export const getTeamJoinRequestsKey = "getTeamJoinRequests";
export const approveTeamJoinRequestKey = "approveTeamJoinRequest";
export const rejectTeamJoinRequestKey = "rejectTeamJoinRequest";

export interface IContestIdVariables {
  contestId: number;
}

export interface ITeamIdVariables {
  teamId: number;
}

export interface IRequestIdVariables {
  requestId: number;
}

export interface IInviteTokenVariables {
  inviteToken: string;
}

export interface ICreateContestTeamVariables extends IContestIdVariables {
  data: ITeamRequest;
}

export const getContestTeams = ({
  contestId,
}: IContestIdVariables): Promise<IAllTeamsResponse> =>
  requestWithValidation<IAllTeamsResponse>(
    {
      url: `/contests/teams/${contestId}`,
      method: "GET",
    },
    allTeamsSchema,
    "/contests/teams/{contestId}",
  );

export const createContestTeam = async ({
  contestId,
  data,
}: ICreateContestTeamVariables): Promise<ITeamResponse> => {
  await validateWithSchema(
    data,
    teamRequestSchema,
    "/contests/teams/{contestId}",
  );

  return requestWithValidation<ITeamResponse>(
    {
      url: `/contests/teams/${contestId}`,
      method: "POST",
      data,
    },
    null,
    "/contests/teams/{contestId}",
  );
};

export const registerTeamContest = ({
  contestId,
}: IContestIdVariables): Promise<IParticipantContestRegistrationResponse> =>
  requestWithValidation<IParticipantContestRegistrationResponse>(
    {
      url: `/contests/teams/${contestId}/registrations`,
      method: "POST",
    },
    participantContestRegistrationSchema,
    "/contests/teams/{contestId}/registrations",
  );

export const joinTeamByInvite = ({
  inviteToken,
}: IInviteTokenVariables): Promise<ITeamResponse> =>
  requestWithValidation<ITeamResponse>(
    {
      url: `/contests/teams/join-by-invite/${inviteToken}`,
      method: "POST",
    },
    teamSchema,
    "/contests/teams/join-by-invite/{inviteToken}",
  );

export const requestJoinTeam = ({
  teamId,
}: ITeamIdVariables): Promise<ITeamRequestJoinResponse> =>
  requestWithValidation<ITeamRequestJoinResponse>(
    {
      url: `/contests/teams/${teamId}/join-requests`,
      method: "POST",
    },
    teamRequestJoinSchema,
    "/contests/teams/{teamId}/join-requests",
  );

export const getTeamJoinRequests = ({
  teamId,
}: ITeamIdVariables): Promise<ITeamJoinRequestListResponse> =>
  requestWithValidation<ITeamJoinRequestListResponse>(
    {
      url: `/contests/teams/${teamId}/join-requests`,
      method: "GET",
    },
    teamJoinRequestListSchema,
    "/contests/teams/{teamId}/join-requests",
  );

export const approveTeamJoinRequest = ({
  requestId,
}: IRequestIdVariables): Promise<ITeamResponse> =>
  requestWithValidation<ITeamResponse>(
    {
      url: `/contests/teams/team-join-requests/${requestId}/approve`,
      method: "POST",
    },
    teamSchema,
    "/contests/teams/team-join-requests/{requestId}/approve",
  );

export const rejectTeamJoinRequest = ({
  requestId,
}: IRequestIdVariables): Promise<ITeamJoinRequestResponse> =>
  requestWithValidation<ITeamJoinRequestResponse>(
    {
      url: `/contests/teams/team-join-requests/${requestId}/reject`,
      method: "POST",
    },
    teamJoinRequestSchema,
    "/contests/teams/team-join-requests/{requestId}/reject",
  );

export const useGetContestTeams = (contestId: number, enabled = true) =>
  useQuery<IAllTeamsResponse, DetailsError>({
    queryKey: [getContestTeamsKey, contestId],
    queryFn: () => getContestTeams({ contestId }),
    enabled,
  });

export const useCreateContestTeam = () => {
  const queryClient = useQueryClient();

  return useMutation<ITeamResponse, DetailsError, ICreateContestTeamVariables>({
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

export const useRegisterTeamContest = () =>
  useMutation<
    IParticipantContestRegistrationResponse,
    DetailsError,
    IContestIdVariables
  >({
    mutationKey: [registerTeamContestKey],
    mutationFn: registerTeamContest,
  });

export const useJoinTeamByInvite = () => {
  const queryClient = useQueryClient();

  return useMutation<ITeamResponse, DetailsError, IInviteTokenVariables>({
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

export const useRequestJoinTeam = () =>
  useMutation<ITeamRequestJoinResponse, DetailsError, ITeamIdVariables>({
    mutationKey: [requestJoinTeamKey],
    mutationFn: requestJoinTeam,
  });

export const useGetTeamJoinRequests = (teamId: number) =>
  useQuery<ITeamJoinRequestListResponse, DetailsError>({
    queryKey: [getTeamJoinRequestsKey, teamId],
    queryFn: () => getTeamJoinRequests({ teamId }),
  });

export const useApproveTeamJoinRequest = () =>
  useMutation<ITeamResponse, DetailsError, IRequestIdVariables>({
    mutationKey: [approveTeamJoinRequestKey],
    mutationFn: approveTeamJoinRequest,
  });

export const useRejectTeamJoinRequest = () =>
  useMutation<ITeamJoinRequestResponse, DetailsError, IRequestIdVariables>({
    mutationKey: [rejectTeamJoinRequestKey],
    mutationFn: rejectTeamJoinRequest,
  });

export * from "../model/team.types";
