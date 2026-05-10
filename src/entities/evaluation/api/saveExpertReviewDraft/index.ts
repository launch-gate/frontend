import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { getExpertReviewsKey } from "../getExpertReviews";
import { IAssignmentListResponse } from "../../model/evaluation.types";
import {
  ISaveExpertReviewDraftResponse,
  ISaveExpertReviewDraftVariables,
} from "./saveExpertReviewDraft.types";
import {
  saveExpertReviewDraftRequestSchema,
  saveExpertReviewDraftResponseSchema,
} from "./saveExpertReviewDraft.validation";

export const saveExpertReviewDraftKey = "saveExpertReviewDraft";

export const saveExpertReviewDraft = async ({
  assignmentId,
  data,
}: ISaveExpertReviewDraftVariables): Promise<ISaveExpertReviewDraftResponse> => {
  await validateWithSchema(
    data,
    saveExpertReviewDraftRequestSchema,
    "/expert/reviews/{assignmentId}/draft",
  );

  return requestWithValidation<ISaveExpertReviewDraftResponse>(
    {
      url: `/expert/reviews/${assignmentId}/draft`,
      method: "PUT",
      data,
    },
    saveExpertReviewDraftResponseSchema,
    "/expert/reviews/{assignmentId}/draft",
  );
};

export const useSaveExpertReviewDraft = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ISaveExpertReviewDraftResponse,
    DetailsError,
    ISaveExpertReviewDraftVariables
  >({
    mutationKey: [saveExpertReviewDraftKey],
    mutationFn: saveExpertReviewDraft,
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

export * from "./saveExpertReviewDraft.types";
export * from "./saveExpertReviewDraft.validation";
