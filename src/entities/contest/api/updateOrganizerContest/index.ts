import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { getContestKey } from "../getContest";
import { getContestsKey } from "../getContests";
import { getOrganizerContestsKey } from "../getOrganizerContests";
import { IContestListInfoResponse } from "../../model/contest.types";
import {
  IUpdateContestVariables,
  IUpdateOrganizerContestResponse,
} from "./updateOrganizerContest.types";
import {
  updateOrganizerContestRequestSchema,
  updateOrganizerContestResponseSchema,
} from "./updateOrganizerContest.validation";

export const updateOrganizerContestKey = "updateOrganizerContest";

export const updateOrganizerContest = async ({
  contestId,
  data,
}: IUpdateContestVariables): Promise<IUpdateOrganizerContestResponse> => {
  await validateWithSchema(
    data,
    updateOrganizerContestRequestSchema,
    "/organizer/contests/{contestId}",
  );

  return requestWithValidation<IUpdateOrganizerContestResponse>(
    {
      url: `/organizer/contests/${contestId}`,
      method: "PATCH",
      data,
    },
    updateOrganizerContestResponseSchema,
    "/organizer/contests/{contestId}",
  );
};

export const useUpdateOrganizerContest = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IUpdateOrganizerContestResponse,
    DetailsError,
    IUpdateContestVariables
  >({
    mutationKey: [updateOrganizerContestKey],
    mutationFn: updateOrganizerContest,
    onSuccess: (data, variables) => {
      queryClient.setQueryData([getContestKey, variables.contestId], data);
      queryClient.setQueryData<IContestListInfoResponse>(
        [getOrganizerContestsKey],
        (current) => ({
          contests: (current?.contests ?? []).map((contest) =>
            contest.id === variables.contestId ? data : contest,
          ),
        }),
      );
      queryClient.setQueryData<IContestListInfoResponse>(
        [getContestsKey],
        (current) =>
          current
            ? {
                contests: (current.contests ?? []).map((contest) =>
                  contest.id === variables.contestId ? data : contest,
                ),
              }
            : current,
      );
    },
  });
};

export * from "./updateOrganizerContest.types";
export * from "./updateOrganizerContest.validation";
