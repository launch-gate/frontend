import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetExpertReviewSubmissionResponse,
  IGetExpertReviewSubmissionVariables,
} from "./getExpertReviewSubmission.types";
import { getExpertReviewSubmissionResponseSchema } from "./getExpertReviewSubmission.validation";

export const getExpertReviewSubmissionKey = "getExpertReviewSubmission";

export const getExpertReviewSubmission = ({
  assignmentId,
}: IGetExpertReviewSubmissionVariables): Promise<IGetExpertReviewSubmissionResponse> =>
  requestWithValidation<IGetExpertReviewSubmissionResponse>(
    {
      url: `/expert/reviews/${assignmentId}/submission`,
      method: "GET",
    },
    getExpertReviewSubmissionResponseSchema,
    "/expert/reviews/{assignmentId}/submission",
  );

export const useGetExpertReviewSubmission = (
  assignmentId: number,
  enabled = true,
) =>
  useQuery<IGetExpertReviewSubmissionResponse, DetailsError>({
    queryKey: [getExpertReviewSubmissionKey, assignmentId],
    queryFn: () => getExpertReviewSubmission({ assignmentId }),
    enabled,
  });

export * from "./getExpertReviewSubmission.types";
export * from "./getExpertReviewSubmission.validation";
