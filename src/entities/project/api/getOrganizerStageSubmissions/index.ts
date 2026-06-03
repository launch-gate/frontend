import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetOrganizerStageSubmissionsResponse,
  IGetOrganizerStageSubmissionsVariables,
} from "./getOrganizerStageSubmissions.types";
import { getOrganizerStageSubmissionsResponseSchema } from "./getOrganizerStageSubmissions.validation";

export const getOrganizerStageSubmissionsKey = "getOrganizerStageSubmissions";

export const getOrganizerStageSubmissions = ({
  stageId,
}: IGetOrganizerStageSubmissionsVariables): Promise<IGetOrganizerStageSubmissionsResponse> =>
  requestWithValidation<IGetOrganizerStageSubmissionsResponse>(
    {
      url: `/organizer/stages/${stageId}/submissions`,
      method: "GET",
    },
    getOrganizerStageSubmissionsResponseSchema,
    "/organizer/stages/{stageId}/submissions",
  );

export const useGetOrganizerStageSubmissions = (
  stageId: number,
  enabled = true,
) =>
  useQuery<IGetOrganizerStageSubmissionsResponse, DetailsError>({
    queryKey: [getOrganizerStageSubmissionsKey, stageId],
    queryFn: () => getOrganizerStageSubmissions({ stageId }),
    enabled,
  });

export * from "./getOrganizerStageSubmissions.types";
export * from "./getOrganizerStageSubmissions.validation";
