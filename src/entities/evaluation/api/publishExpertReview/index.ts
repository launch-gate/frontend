import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { getExpertReviewsKey } from "../getExpertReviews";
import { IAssignmentListResponse } from "../../model/evaluation.types";
import {
  IPublishExpertReviewResponse,
  IPublishExpertReviewVariables,
} from "./publishExpertReview.types";
import { publishExpertReviewResponseSchema } from "./publishExpertReview.validation";

export const publishExpertReviewKey = "publishExpertReview";

export const publishExpertReview = ({
  assignmentId,
}: IPublishExpertReviewVariables): Promise<IPublishExpertReviewResponse> =>
  requestWithValidation<IPublishExpertReviewResponse>(
    {
      url: `/expert/reviews/${assignmentId}/publish`,
      method: "POST",
    },
    publishExpertReviewResponseSchema,
    "/expert/reviews/{assignmentId}/publish",
  );

export const usePublishExpertReview = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IPublishExpertReviewResponse,
    DetailsError,
    IPublishExpertReviewVariables
  >({
    mutationKey: [publishExpertReviewKey],
    mutationFn: publishExpertReview,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<IAssignmentListResponse>(
        [getExpertReviewsKey],
        (current) =>
          current
            ? {
                assignments: (current.assignments ?? []).map((assignment) =>
                  assignment.id === variables.assignmentId
                    ? { ...assignment, status: data.status }
                    : assignment,
                ),
              }
            : current,
      );
    },
  });
};

export * from "./publishExpertReview.types";
export * from "./publishExpertReview.validation";
