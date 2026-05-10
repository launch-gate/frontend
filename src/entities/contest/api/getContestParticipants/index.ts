import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetContestParticipantsResponse,
  IGetContestParticipantsVariables,
} from "./getContestParticipants.types";
import { getContestParticipantsResponseSchema } from "./getContestParticipants.validation";

export const getContestParticipantsKey = "getContestParticipants";

export const getContestParticipants = ({
  contestId,
}: IGetContestParticipantsVariables): Promise<IGetContestParticipantsResponse> =>
  requestWithValidation<IGetContestParticipantsResponse>(
    {
      url: `/contests/${contestId}/participants`,
      method: "GET",
    },
    getContestParticipantsResponseSchema,
    "/contests/{contestId}/participants",
  );

export const useGetContestParticipants = (contestId: number, enabled = true) =>
  useQuery<IGetContestParticipantsResponse, DetailsError>({
    queryKey: [getContestParticipantsKey, contestId],
    queryFn: () => getContestParticipants({ contestId }),
    enabled,
  });

export * from "./getContestParticipants.types";
export * from "./getContestParticipants.validation";
