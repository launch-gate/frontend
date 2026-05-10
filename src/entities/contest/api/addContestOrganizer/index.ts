import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { getContestOrganizersKey } from "../getContestOrganizers";
import { IOrganizerListResponse } from "../../model/contest.types";
import {
  IAddContestOrganizerResponse,
  IAddContestOrganizerVariables,
} from "./addContestOrganizer.types";
import {
  addContestOrganizerRequestSchema,
  addContestOrganizerResponseSchema,
} from "./addContestOrganizer.validation";

export const addContestOrganizerKey = "addContestOrganizer";

export const addContestOrganizer = async ({
  contestId,
  data,
}: IAddContestOrganizerVariables): Promise<IAddContestOrganizerResponse> => {
  await validateWithSchema(
    data,
    addContestOrganizerRequestSchema,
    "/organizer/contests/{contestId}/organizers",
  );

  return requestWithValidation<IAddContestOrganizerResponse>(
    {
      url: `/organizer/contests/${contestId}/organizers`,
      method: "POST",
      data,
    },
    addContestOrganizerResponseSchema,
    "/organizer/contests/{contestId}/organizers",
  );
};

export const useAddContestOrganizer = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IAddContestOrganizerResponse,
    DetailsError,
    IAddContestOrganizerVariables
  >({
    mutationKey: [addContestOrganizerKey],
    mutationFn: addContestOrganizer,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<IOrganizerListResponse>(
        [getContestOrganizersKey, variables.contestId],
        (current) => ({
          organizers: [...(current?.organizers ?? []), data],
        }),
      );
    },
  });
};

export * from "./addContestOrganizer.types";
export * from "./addContestOrganizer.validation";
