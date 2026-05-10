import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetOrganizerContestStagesResponse,
  IGetOrganizerContestStagesVariables,
} from "./getOrganizerContestStages.types";
import { getOrganizerContestStagesResponseSchema } from "./getOrganizerContestStages.validation";

export const getOrganizerContestStagesKey = "getOrganizerContestStages";

export const getOrganizerContestStages = ({
  contestId,
}: IGetOrganizerContestStagesVariables): Promise<IGetOrganizerContestStagesResponse> =>
  requestWithValidation<IGetOrganizerContestStagesResponse>(
    {
      url: `/organizer/contests/${contestId}/stages`,
      method: "GET",
    },
    getOrganizerContestStagesResponseSchema,
    "/organizer/contests/{contestId}/stages",
  );

export const useGetOrganizerContestStages = (contestId: number) =>
  useQuery<IGetOrganizerContestStagesResponse, DetailsError>({
    queryKey: [getOrganizerContestStagesKey, contestId],
    queryFn: () => getOrganizerContestStages({ contestId }),
  });

export * from "./getOrganizerContestStages.types";
export * from "./getOrganizerContestStages.validation";
