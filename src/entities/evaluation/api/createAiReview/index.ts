import { useMutation } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  ICreateAiReviewResponse,
  ICreateAiReviewVariables,
} from "./createAiReview.types";
import { createAiReviewResponseSchema } from "./createAiReview.validation";

export const createAiReviewKey = "createAiReview";

export const createAiReview = ({
  submissionId,
}: ICreateAiReviewVariables): Promise<ICreateAiReviewResponse> =>
  requestWithValidation<ICreateAiReviewResponse>(
    {
      url: `/organizer/evaluations/${submissionId}/ai-review`,
      method: "POST",
    },
    createAiReviewResponseSchema,
    "/organizer/evaluations/{submissionId}/ai-review",
  );

export const useCreateAiReview = () =>
  useMutation<ICreateAiReviewResponse, DetailsError, ICreateAiReviewVariables>({
    mutationKey: [createAiReviewKey],
    mutationFn: createAiReview,
  });

export * from "./createAiReview.types";
export * from "./createAiReview.validation";
