import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { IGetMentorCallsResponse } from "./getMentorCalls.types";
import { getMentorCallsResponseSchema } from "./getMentorCalls.validation";

export const getMentorCallsKey = "getMentorCalls";

export const getMentorCalls = (): Promise<IGetMentorCallsResponse> =>
  requestWithValidation<IGetMentorCallsResponse>(
    {
      url: "/mentor/calls",
      method: "GET",
    },
    getMentorCallsResponseSchema,
    "/mentor/calls",
  );

export const useGetMentorCalls = () =>
  useQuery<IGetMentorCallsResponse, DetailsError>({
    queryKey: [getMentorCallsKey],
    queryFn: getMentorCalls,
  });

export * from "./getMentorCalls.types";
export * from "./getMentorCalls.validation";
