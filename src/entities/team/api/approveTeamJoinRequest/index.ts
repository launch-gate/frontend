import { useMutation } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IApproveTeamJoinRequestResponse,
  IApproveTeamJoinRequestVariables,
} from "./approveTeamJoinRequest.types";
import { approveTeamJoinRequestResponseSchema } from "./approveTeamJoinRequest.validation";

export const approveTeamJoinRequestKey = "approveTeamJoinRequest";

export const approveTeamJoinRequest = ({
  requestId,
}: IApproveTeamJoinRequestVariables): Promise<IApproveTeamJoinRequestResponse> =>
  requestWithValidation<IApproveTeamJoinRequestResponse>(
    {
      url: `/contests/teams/team-join-requests/${requestId}/approve`,
      method: "POST",
    },
    approveTeamJoinRequestResponseSchema,
    "/contests/teams/team-join-requests/{requestId}/approve",
  );

export const useApproveTeamJoinRequest = () =>
  useMutation<
    IApproveTeamJoinRequestResponse,
    DetailsError,
    IApproveTeamJoinRequestVariables
  >({
    mutationKey: [approveTeamJoinRequestKey],
    mutationFn: approveTeamJoinRequest,
  });

export * from "./approveTeamJoinRequest.types";
export * from "./approveTeamJoinRequest.validation";
