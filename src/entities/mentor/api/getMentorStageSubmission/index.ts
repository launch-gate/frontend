import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetMentorStageSubmissionResponse,
  IGetMentorStageSubmissionVariables,
} from "./getMentorStageSubmission.types";
import { getMentorStageSubmissionResponseSchema } from "./getMentorStageSubmission.validation";

export const getMentorStageSubmissionKey = "getMentorStageSubmission";

export const getMentorStageSubmission = ({
  stageSubmissionId,
}: IGetMentorStageSubmissionVariables): Promise<IGetMentorStageSubmissionResponse> =>
  requestWithValidation<IGetMentorStageSubmissionResponse>(
    {
      url: `/mentor/stage-submissions/${stageSubmissionId}`,
      method: "GET",
    },
    getMentorStageSubmissionResponseSchema,
    "/mentor/stage-submissions/{stageSubmissionId}",
  );

export const useGetMentorStageSubmission = (
  stageSubmissionId: number,
  enabled = true,
) =>
  useQuery<IGetMentorStageSubmissionResponse, DetailsError>({
    queryKey: [getMentorStageSubmissionKey, stageSubmissionId],
    queryFn: () => getMentorStageSubmission({ stageSubmissionId }),
    enabled,
  });

export * from "./getMentorStageSubmission.types";
export * from "./getMentorStageSubmission.validation";
