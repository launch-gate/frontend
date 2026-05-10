import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetTeamJoinRequestsResponse,
  IGetTeamJoinRequestsVariables,
} from "./getTeamJoinRequests.types";
import { getTeamJoinRequestsResponseSchema } from "./getTeamJoinRequests.validation";

export const getTeamJoinRequestsKey = "getTeamJoinRequests";

export const getTeamJoinRequests = ({
  teamId,
}: IGetTeamJoinRequestsVariables): Promise<IGetTeamJoinRequestsResponse> =>
  requestWithValidation<IGetTeamJoinRequestsResponse>(
    {
      url: `/contests/teams/${teamId}/join-requests`,
      method: "GET",
    },
    getTeamJoinRequestsResponseSchema,
    "/contests/teams/{teamId}/join-requests",
  );

export const useGetTeamJoinRequests = (teamId: number) =>
  useQuery<IGetTeamJoinRequestsResponse, DetailsError>({
    queryKey: [getTeamJoinRequestsKey, teamId],
    queryFn: () => getTeamJoinRequests({ teamId }),
  });

export * from "./getTeamJoinRequests.types";
export * from "./getTeamJoinRequests.validation";
