import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { getContestKey } from "../getContest";
import { getOrganizerContestsKey } from "../getOrganizerContests";
import {
  ICreateOrganizerContestResponse,
  ICreateOrganizerContestVariables,
} from "./createOrganizerContest.types";
import {
  createOrganizerContestRequestSchema,
  createOrganizerContestResponseSchema,
} from "./createOrganizerContest.validation";
import { IContestListInfoResponse } from "../../model/contest.types";

export const createOrganizerContestKey = "createOrganizerContest";

export const createOrganizerContest = async (
  data: ICreateOrganizerContestVariables,
): Promise<ICreateOrganizerContestResponse> => {
  await validateWithSchema(
    data,
    createOrganizerContestRequestSchema,
    "/organizer/contests",
  );

  return requestWithValidation<ICreateOrganizerContestResponse>(
    {
      url: "/organizer/contests",
      method: "POST",
      data,
    },
    createOrganizerContestResponseSchema,
    "/organizer/contests",
  );
};

export const useCreateOrganizerContest = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ICreateOrganizerContestResponse,
    DetailsError,
    ICreateOrganizerContestVariables
  >({
    mutationKey: [createOrganizerContestKey],
    mutationFn: createOrganizerContest,
    onSuccess: (data) => {
      queryClient.setQueryData<IContestListInfoResponse>(
        [getOrganizerContestsKey],
        (current) => ({
          contests: [...(current?.contests ?? []), data],
        }),
      );

      if (data.id) queryClient.setQueryData([getContestKey, data.id], data);
    },
  });
};

export * from "./createOrganizerContest.types";
export * from "./createOrganizerContest.validation";
