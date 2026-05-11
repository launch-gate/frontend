import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetContestTeamsResponse,
  IGetContestTeamsVariables,
} from "./getContestTeams.types";
import { getContestTeamsResponseSchema } from "./getContestTeams.validation";

export const getContestTeamsKey = "getContestTeams";

export const getContestTeams = ({
  contestId,
}: IGetContestTeamsVariables): Promise<IGetContestTeamsResponse> =>
  requestWithValidation<IGetContestTeamsResponse>(
    {
      url: `/contests/teams/${contestId}`,
      method: "GET",
    },
    getContestTeamsResponseSchema,
    "/contests/teams/{contestId}",
  );

export const useGetContestTeams = (contestId: number, enabled = true) =>
  useQuery<IGetContestTeamsResponse, DetailsError>({
    ...getContestTeamsQueryOptions(contestId),
    enabled,
  });

export const getContestTeamsQueryOptions = (contestId: number) => ({
    queryKey: [getContestTeamsKey, contestId],
    queryFn: () => getContestTeams({ contestId }),
});

export * from "./getContestTeams.types";
export * from "./getContestTeams.validation";
