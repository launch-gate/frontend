import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";
import { IStageSubmissionResponse } from "@/entities/stage";
import { stageSubmissionSchema } from "@/entities/stage/model/stage.validation";

import {
  IAiReviewCreatedResponse,
  IAssignmentListResponse,
  IAssignmentRequest,
  IAssignmentResponse,
  IReviewDraftRequest,
  IReviewResponse,
} from "../model/evaluation.types";
import {
  aiReviewCreatedSchema,
  assignmentListSchema,
  assignmentRequestSchema,
  assignmentSchema,
  reviewDraftRequestSchema,
  reviewSchema,
} from "../model/evaluation.validation";

export const getExpertReviewsKey = "getExpertReviews";
export const getExpertReviewSubmissionKey = "getExpertReviewSubmission";
export const saveExpertReviewDraftKey = "saveExpertReviewDraft";
export const publishExpertReviewKey = "publishExpertReview";
export const assignExpertKey = "assignExpert";
export const createAiReviewKey = "createAiReview";

export interface IAssignmentIdVariables {
  assignmentId: number;
}

export interface ISaveExpertReviewDraftVariables
  extends IAssignmentIdVariables {
  data: IReviewDraftRequest;
}

export interface ISubmissionIdVariables {
  submissionId: number;
}

export const getExpertReviews = (): Promise<IAssignmentListResponse> =>
  requestWithValidation<IAssignmentListResponse>(
    {
      url: "/expert/reviews",
      method: "GET",
    },
    assignmentListSchema,
    "/expert/reviews",
  );

export const getExpertReviewSubmission = ({
  assignmentId,
}: IAssignmentIdVariables): Promise<IStageSubmissionResponse> =>
  requestWithValidation<IStageSubmissionResponse>(
    {
      url: `/expert/reviews/${assignmentId}/submission`,
      method: "GET",
    },
    stageSubmissionSchema,
    "/expert/reviews/{assignmentId}/submission",
  );

export const saveExpertReviewDraft = async ({
  assignmentId,
  data,
}: ISaveExpertReviewDraftVariables): Promise<IReviewResponse> => {
  await validateWithSchema(
    data,
    reviewDraftRequestSchema,
    "/expert/reviews/{assignmentId}/draft",
  );

  return requestWithValidation<IReviewResponse>(
    {
      url: `/expert/reviews/${assignmentId}/draft`,
      method: "PUT",
      data,
    },
    reviewSchema,
    "/expert/reviews/{assignmentId}/draft",
  );
};

export const publishExpertReview = ({
  assignmentId,
}: IAssignmentIdVariables): Promise<IReviewResponse> =>
  requestWithValidation<IReviewResponse>(
    {
      url: `/expert/reviews/${assignmentId}/publish`,
      method: "POST",
    },
    reviewSchema,
    "/expert/reviews/{assignmentId}/publish",
  );

export const assignExpert = async (
  data: IAssignmentRequest,
): Promise<IAssignmentResponse> => {
  await validateWithSchema(
    data,
    assignmentRequestSchema,
    "/organizer/evaluations/assignments",
  );

  return requestWithValidation<IAssignmentResponse>(
    {
      url: "/organizer/evaluations/assignments",
      method: "POST",
      data,
    },
    assignmentSchema,
    "/organizer/evaluations/assignments",
  );
};

export const createAiReview = ({
  submissionId,
}: ISubmissionIdVariables): Promise<IAiReviewCreatedResponse> =>
  requestWithValidation<IAiReviewCreatedResponse>(
    {
      url: `/organizer/evaluations/${submissionId}/ai-review`,
      method: "POST",
    },
    aiReviewCreatedSchema,
    "/organizer/evaluations/{submissionId}/ai-review",
  );

export const useGetExpertReviews = () =>
  useQuery<IAssignmentListResponse, DetailsError>({
    queryKey: [getExpertReviewsKey],
    queryFn: getExpertReviews,
  });

export const useGetExpertReviewSubmission = (
  assignmentId: number,
  enabled = true,
) =>
  useQuery<IStageSubmissionResponse, DetailsError>({
    queryKey: [getExpertReviewSubmissionKey, assignmentId],
    queryFn: () => getExpertReviewSubmission({ assignmentId }),
    enabled,
  });

export const useSaveExpertReviewDraft = () => {
  const queryClient = useQueryClient();

  return useMutation<IReviewResponse, DetailsError, ISaveExpertReviewDraftVariables>({
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

export const usePublishExpertReview = () => {
  const queryClient = useQueryClient();

  return useMutation<IReviewResponse, DetailsError, IAssignmentIdVariables>({
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

export const useAssignExpert = () =>
  useMutation<IAssignmentResponse, DetailsError, IAssignmentRequest>({
    mutationKey: [assignExpertKey],
    mutationFn: assignExpert,
  });

export const useCreateAiReview = () =>
  useMutation<IAiReviewCreatedResponse, DetailsError, ISubmissionIdVariables>({
    mutationKey: [createAiReviewKey],
    mutationFn: createAiReview,
  });

export * from "../model/evaluation.types";
