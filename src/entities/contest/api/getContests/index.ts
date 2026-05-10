import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { IGetContestsResponse } from "./getContests.types";
import { getContestsResponseSchema } from "./getContests.validation";

export const getContestsKey = "getContests";

export const getContests = (): Promise<IGetContestsResponse> =>
  requestWithValidation<IGetContestsResponse>(
    {
      url: "/contests",
      method: "GET",
    },
    getContestsResponseSchema,
    "/contests",
  );

export const useGetContests = () =>
  useQuery<IGetContestsResponse, DetailsError>({
    queryKey: [getContestsKey],
    queryFn: getContests,
  });

export * from "./getContests.types";
export * from "./getContests.validation";
