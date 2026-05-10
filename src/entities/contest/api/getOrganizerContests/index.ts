import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { IGetOrganizerContestsResponse } from "./getOrganizerContests.types";
import { getOrganizerContestsResponseSchema } from "./getOrganizerContests.validation";

export const getOrganizerContestsKey = "getOrganizerContests";

export const getOrganizerContests =
  (): Promise<IGetOrganizerContestsResponse> =>
    requestWithValidation<IGetOrganizerContestsResponse>(
      {
        url: "/organizer/contests",
        method: "GET",
      },
      getOrganizerContestsResponseSchema,
      "/organizer/contests",
    );

export const useGetOrganizerContests = () =>
  useQuery<IGetOrganizerContestsResponse, DetailsError>({
    queryKey: [getOrganizerContestsKey],
    queryFn: getOrganizerContests,
  });

export * from "./getOrganizerContests.types";
export * from "./getOrganizerContests.validation";
