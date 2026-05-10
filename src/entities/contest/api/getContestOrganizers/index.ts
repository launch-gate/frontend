import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetContestOrganizersResponse,
  IGetContestOrganizersVariables,
} from "./getContestOrganizers.types";
import { getContestOrganizersResponseSchema } from "./getContestOrganizers.validation";

export const getContestOrganizersKey = "getContestOrganizers";

export const getContestOrganizers = ({
  contestId,
}: IGetContestOrganizersVariables): Promise<IGetContestOrganizersResponse> =>
  requestWithValidation<IGetContestOrganizersResponse>(
    {
      url: `/organizer/contests/${contestId}/organizers`,
      method: "GET",
    },
    getContestOrganizersResponseSchema,
    "/organizer/contests/{contestId}/organizers",
  );

export const useGetContestOrganizers = (contestId: number) =>
  useQuery<IGetContestOrganizersResponse, DetailsError>({
    queryKey: [getContestOrganizersKey, contestId],
    queryFn: () => getContestOrganizers({ contestId }),
  });

export * from "./getContestOrganizers.types";
export * from "./getContestOrganizers.validation";
