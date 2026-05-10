import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { getContestKey } from "../getContest";
import { getContestsKey } from "../getContests";
import { getOrganizerContestsKey } from "../getOrganizerContests";
import { IContestListInfoResponse } from "../../model/contest.types";
import {
  IPublishOrganizerContestResponse,
  IPublishOrganizerContestVariables,
} from "./publishOrganizerContest.types";
import { publishOrganizerContestResponseSchema } from "./publishOrganizerContest.validation";

export const publishOrganizerContestKey = "publishOrganizerContest";

export const publishOrganizerContest = ({
  contestId,
}: IPublishOrganizerContestVariables): Promise<IPublishOrganizerContestResponse> =>
  requestWithValidation<IPublishOrganizerContestResponse>(
    {
      url: `/organizer/contests/${contestId}/publish`,
      method: "POST",
    },
    publishOrganizerContestResponseSchema,
    "/organizer/contests/{contestId}/publish",
  );

export const usePublishOrganizerContest = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IPublishOrganizerContestResponse,
    DetailsError,
    IPublishOrganizerContestVariables
  >({
    mutationKey: [publishOrganizerContestKey],
    mutationFn: publishOrganizerContest,
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

export * from "./publishOrganizerContest.types";
export * from "./publishOrganizerContest.validation";
