import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { getContestOrganizersKey } from "../getContestOrganizers";
import { IOrganizerListResponse } from "../../model/contest.types";
import {
  IDeleteContestOrganizerResponse,
  IDeleteContestOrganizerVariables,
} from "./deleteContestOrganizer.types";
import { deleteContestOrganizerResponseSchema } from "./deleteContestOrganizer.validation";

export const deleteContestOrganizerKey = "deleteContestOrganizer";

export const deleteContestOrganizer = ({
  contestId,
  organizerId,
}: IDeleteContestOrganizerVariables): Promise<IDeleteContestOrganizerResponse> =>
  requestWithValidation<IDeleteContestOrganizerResponse>(
    {
      url: `/organizer/contests/${contestId}/organizers/${organizerId}`,
      method: "DELETE",
    },
    deleteContestOrganizerResponseSchema,
    "/organizer/contests/{contestId}/organizers/{organizerId}",
  );

export const useDeleteContestOrganizer = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IDeleteContestOrganizerResponse,
    DetailsError,
    IDeleteContestOrganizerVariables
  >({
    mutationKey: [deleteContestOrganizerKey],
    mutationFn: deleteContestOrganizer,
    onSuccess: (_, variables) => {
      queryClient.setQueryData<IOrganizerListResponse>(
        [getContestOrganizersKey, variables.contestId],
        (current) => ({
          organizers: (current?.organizers ?? []).filter(
            (organizer) => organizer.id !== variables.organizerId,
          ),
        }),
      );
    },
  });
};

export * from "./deleteContestOrganizer.types";
export * from "./deleteContestOrganizer.validation";
