import { dehydrate, useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";
import { createQueryClient } from "@/shared/api/queryClient";

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
  useQuery<IGetContestsResponse, DetailsError>(getContestsQueryOptions());

export const getContestsQueryOptions = () => ({
    queryKey: [getContestsKey],
    queryFn: getContests,
});

export const prefetchGetContests = async () => {
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery(getContestsQueryOptions());

  return dehydrate(queryClient);
};

export * from "./getContests.types";
export * from "./getContests.validation";
