import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetStageSubmissionMentorCommentsResponse,
  IGetStageSubmissionMentorCommentsVariables,
} from "./getStageSubmissionMentorComments.types";
import { getStageSubmissionMentorCommentsResponseSchema } from "./getStageSubmissionMentorComments.validation";

export const getStageSubmissionMentorCommentsKey =
  "getStageSubmissionMentorComments";

export const getStageSubmissionMentorComments = ({
  stageSubmissionId,
}: IGetStageSubmissionMentorCommentsVariables): Promise<IGetStageSubmissionMentorCommentsResponse> =>
  requestWithValidation<IGetStageSubmissionMentorCommentsResponse>(
    {
      url: `/stage-submissions/${stageSubmissionId}/mentor-comments`,
      method: "GET",
    },
    getStageSubmissionMentorCommentsResponseSchema,
    "/stage-submissions/{stageSubmissionId}/mentor-comments",
  );

export const useGetStageSubmissionMentorComments = (
  stageSubmissionId: number,
  enabled = true,
) =>
  useQuery<IGetStageSubmissionMentorCommentsResponse, DetailsError>({
    queryKey: [getStageSubmissionMentorCommentsKey, stageSubmissionId],
    queryFn: () => getStageSubmissionMentorComments({ stageSubmissionId }),
    enabled,
  });

export * from "./getStageSubmissionMentorComments.types";
export * from "./getStageSubmissionMentorComments.validation";
