import { useMutation } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IRejectTeamJoinRequestResponse,
  IRejectTeamJoinRequestVariables,
} from "./rejectTeamJoinRequest.types";
import { rejectTeamJoinRequestResponseSchema } from "./rejectTeamJoinRequest.validation";

export const rejectTeamJoinRequestKey = "rejectTeamJoinRequest";

export const rejectTeamJoinRequest = ({
  requestId,
}: IRejectTeamJoinRequestVariables): Promise<IRejectTeamJoinRequestResponse> =>
  requestWithValidation<IRejectTeamJoinRequestResponse>(
    {
      url: `/contests/teams/team-join-requests/${requestId}/reject`,
      method: "POST",
    },
    rejectTeamJoinRequestResponseSchema,
    "/contests/teams/team-join-requests/{requestId}/reject",
  );

export const useRejectTeamJoinRequest = () =>
  useMutation<
    IRejectTeamJoinRequestResponse,
    DetailsError,
    IRejectTeamJoinRequestVariables
  >({
    mutationKey: [rejectTeamJoinRequestKey],
    mutationFn: rejectTeamJoinRequest,
  });

export * from "./rejectTeamJoinRequest.types";
export * from "./rejectTeamJoinRequest.validation";
