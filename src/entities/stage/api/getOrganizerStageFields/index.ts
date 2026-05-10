import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetOrganizerStageFieldsResponse,
  IGetOrganizerStageFieldsVariables,
} from "./getOrganizerStageFields.types";
import { getOrganizerStageFieldsResponseSchema } from "./getOrganizerStageFields.validation";

export const getOrganizerStageFieldsKey = "getOrganizerStageFields";

export const getOrganizerStageFields = ({
  stageId,
}: IGetOrganizerStageFieldsVariables): Promise<IGetOrganizerStageFieldsResponse> =>
  requestWithValidation<IGetOrganizerStageFieldsResponse>(
    {
      url: `/organizer/stages/${stageId}/fields`,
      method: "GET",
    },
    getOrganizerStageFieldsResponseSchema,
    "/organizer/stages/{stageId}/fields",
  );

export const useGetOrganizerStageFields = (stageId: number) =>
  useQuery<IGetOrganizerStageFieldsResponse, DetailsError>({
    queryKey: [getOrganizerStageFieldsKey, stageId],
    queryFn: () => getOrganizerStageFields({ stageId }),
  });

export * from "./getOrganizerStageFields.types";
export * from "./getOrganizerStageFields.validation";
