import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetOrganizerStageResponse,
  IGetOrganizerStageVariables,
} from "./getOrganizerStage.types";
import { getOrganizerStageResponseSchema } from "./getOrganizerStage.validation";

export const getOrganizerStageKey = "getOrganizerStage";

export const getOrganizerStage = ({
  stageId,
}: IGetOrganizerStageVariables): Promise<IGetOrganizerStageResponse> =>
  requestWithValidation<IGetOrganizerStageResponse>(
    {
      url: `/organizer/stages/${stageId}`,
      method: "GET",
    },
    getOrganizerStageResponseSchema,
    "/organizer/stages/{stageId}",
  );

export const useGetOrganizerStage = (stageId: number) =>
  useQuery<IGetOrganizerStageResponse, DetailsError>({
    queryKey: [getOrganizerStageKey, stageId],
    queryFn: () => getOrganizerStage({ stageId }),
  });

export * from "./getOrganizerStage.types";
export * from "./getOrganizerStage.validation";
