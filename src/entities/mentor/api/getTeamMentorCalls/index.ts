import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetTeamMentorCallsResponse,
  IGetTeamMentorCallsVariables,
} from "./getTeamMentorCalls.types";
import { getTeamMentorCallsResponseSchema } from "./getTeamMentorCalls.validation";

export const getTeamMentorCallsKey = "getTeamMentorCalls";

export const getTeamMentorCalls = ({
  teamId,
}: IGetTeamMentorCallsVariables): Promise<IGetTeamMentorCallsResponse> =>
  requestWithValidation<IGetTeamMentorCallsResponse>(
    {
      url: `/teams/${teamId}/mentor-calls`,
      method: "GET",
    },
    getTeamMentorCallsResponseSchema,
    "/teams/{teamId}/mentor-calls",
  );

export const useGetTeamMentorCalls = (teamId: number, enabled = true) =>
  useQuery<IGetTeamMentorCallsResponse, DetailsError>({
    queryKey: [getTeamMentorCallsKey, teamId],
    queryFn: () => getTeamMentorCalls({ teamId }),
    enabled,
  });

export * from "./getTeamMentorCalls.types";
export * from "./getTeamMentorCalls.validation";
