import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { IGetMentorTeamsResponse } from "./getMentorTeams.types";
import { getMentorTeamsResponseSchema } from "./getMentorTeams.validation";

export const getMentorTeamsKey = "getMentorTeams";

export const getMentorTeams = (): Promise<IGetMentorTeamsResponse> =>
  requestWithValidation<IGetMentorTeamsResponse>(
    {
      url: "/mentor/teams",
      method: "GET",
    },
    getMentorTeamsResponseSchema,
    "/mentor/teams",
  );

export const useGetMentorTeams = () =>
  useQuery<IGetMentorTeamsResponse, DetailsError>({
    queryKey: [getMentorTeamsKey],
    queryFn: getMentorTeams,
  });

export * from "./getMentorTeams.types";
export * from "./getMentorTeams.validation";
