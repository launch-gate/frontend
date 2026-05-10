import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetOrganizerStageSubmissionResponse,
  IGetOrganizerStageSubmissionVariables,
} from "./getOrganizerStageSubmission.types";
import { getOrganizerStageSubmissionResponseSchema } from "./getOrganizerStageSubmission.validation";

export const getOrganizerStageSubmissionKey = "getOrganizerStageSubmission";

export const getOrganizerStageSubmission = ({
  submissionId,
}: IGetOrganizerStageSubmissionVariables): Promise<IGetOrganizerStageSubmissionResponse> =>
  requestWithValidation<IGetOrganizerStageSubmissionResponse>(
    {
      url: `/projects/organizer/stage-submissions/${submissionId}`,
      method: "GET",
    },
    getOrganizerStageSubmissionResponseSchema,
    "/projects/organizer/stage-submissions/{submissionId}",
  );

export const useGetOrganizerStageSubmission = (
  submissionId: number,
  enabled = true,
) =>
  useQuery<IGetOrganizerStageSubmissionResponse, DetailsError>({
    queryKey: [getOrganizerStageSubmissionKey, submissionId],
    queryFn: () => getOrganizerStageSubmission({ submissionId }),
    enabled,
  });

export * from "./getOrganizerStageSubmission.types";
export * from "./getOrganizerStageSubmission.validation";
