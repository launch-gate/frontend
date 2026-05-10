import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetOrganizerContestParticipantsResponse,
  IGetOrganizerContestParticipantsVariables,
} from "./getOrganizerContestParticipants.types";
import { getOrganizerContestParticipantsResponseSchema } from "./getOrganizerContestParticipants.validation";

export const getOrganizerContestParticipantsKey =
  "getOrganizerContestParticipants";

export const getOrganizerContestParticipants = ({
  contestId,
}: IGetOrganizerContestParticipantsVariables): Promise<IGetOrganizerContestParticipantsResponse> =>
  requestWithValidation<IGetOrganizerContestParticipantsResponse>(
    {
      url: `/organizer/contests/${contestId}/participants`,
      method: "GET",
    },
    getOrganizerContestParticipantsResponseSchema,
    "/organizer/contests/{contestId}/participants",
  );

export const useGetOrganizerContestParticipants = (contestId: number) =>
  useQuery<IGetOrganizerContestParticipantsResponse, DetailsError>({
    queryKey: [getOrganizerContestParticipantsKey, contestId],
    queryFn: () => getOrganizerContestParticipants({ contestId }),
  });

export * from "./getOrganizerContestParticipants.types";
export * from "./getOrganizerContestParticipants.validation";
