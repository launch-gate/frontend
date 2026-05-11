import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IGetAiReviewResponse,
  IGetAiReviewVariables,
} from "./getAiReview.types";
import { getAiReviewResponseSchema } from "./getAiReview.validation";

export const getAiReviewKey = "getAiReview";

export const getAiReview = ({
  submissionId,
}: IGetAiReviewVariables): Promise<IGetAiReviewResponse> =>
  requestWithValidation<IGetAiReviewResponse>(
    {
      url: `/organizer/evaluations/${submissionId}/ai-review`,
      method: "GET",
    },
    getAiReviewResponseSchema,
    "/organizer/evaluations/{submissionId}/ai-review",
  );

export const useGetAiReview = (submissionId: number, enabled = true) =>
  useQuery<IGetAiReviewResponse, DetailsError>({
    queryKey: [getAiReviewKey, submissionId],
    queryFn: () => getAiReview({ submissionId }),
    enabled,
    retry: false,
  });

export * from "./getAiReview.types";
export * from "./getAiReview.validation";
