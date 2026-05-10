import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { getContestKey } from "../getContest";
import { getContestsKey } from "../getContests";
import { getOrganizerContestsKey } from "../getOrganizerContests";
import { IContestListInfoResponse } from "../../model/contest.types";
import {
  IDeleteOrganizerContestResponse,
  IDeleteOrganizerContestVariables,
} from "./deleteOrganizerContest.types";
import { deleteOrganizerContestResponseSchema } from "./deleteOrganizerContest.validation";

export const deleteOrganizerContestKey = "deleteOrganizerContest";

export const deleteOrganizerContest = ({
  contestId,
}: IDeleteOrganizerContestVariables): Promise<IDeleteOrganizerContestResponse> =>
  requestWithValidation<IDeleteOrganizerContestResponse>(
    {
      url: `/organizer/contests/${contestId}`,
      method: "DELETE",
    },
    deleteOrganizerContestResponseSchema,
    "/organizer/contests/{contestId}",
  );

export const useDeleteOrganizerContest = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IDeleteOrganizerContestResponse,
    DetailsError,
    IDeleteOrganizerContestVariables
  >({
    mutationKey: [deleteOrganizerContestKey],
    mutationFn: deleteOrganizerContest,
    onSuccess: (_, variables) => {
      queryClient.removeQueries({
        queryKey: [getContestKey, variables.contestId],
      });
      queryClient.setQueryData<IContestListInfoResponse>(
        [getOrganizerContestsKey],
        (current) => ({
          contests: (current?.contests ?? []).filter(
            (contest) => contest.id !== variables.contestId,
          ),
        }),
      );
      queryClient.setQueryData<IContestListInfoResponse>(
        [getContestsKey],
        (current) =>
          current
            ? {
                contests: (current.contests ?? []).filter(
                  (contest) => contest.id !== variables.contestId,
                ),
              }
            : current,
      );
    },
  });
};

export * from "./deleteOrganizerContest.types";
export * from "./deleteOrganizerContest.validation";
