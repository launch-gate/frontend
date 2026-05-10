import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { getStageSubmissionMentorCommentsKey } from "../getStageSubmissionMentorComments";
import { IMentorCommentListResponse } from "../../model/mentor.types";
import {
  ICreateMentorCommentResponse,
  ICreateMentorCommentVariables,
} from "./createMentorComment.types";
import {
  createMentorCommentRequestSchema,
  createMentorCommentResponseSchema,
} from "./createMentorComment.validation";

export const createMentorCommentKey = "createMentorComment";

export const createMentorComment = async (
  data: ICreateMentorCommentVariables,
): Promise<ICreateMentorCommentResponse> => {
  await validateWithSchema(
    data,
    createMentorCommentRequestSchema,
    "/mentor/comments",
  );

  return requestWithValidation<ICreateMentorCommentResponse>(
    {
      url: "/mentor/comments",
      method: "POST",
      data,
    },
    createMentorCommentResponseSchema,
    "/mentor/comments",
  );
};

export const useCreateMentorComment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ICreateMentorCommentResponse,
    DetailsError,
    ICreateMentorCommentVariables
  >({
    mutationKey: [createMentorCommentKey],
    mutationFn: createMentorComment,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<IMentorCommentListResponse>(
        [getStageSubmissionMentorCommentsKey, variables.stageSubmissionId],
        (current) => ({
          comments: [
            ...(current?.comments ?? []),
            {
              id: data.commentId,
              stageSubmissionId: variables.stageSubmissionId,
              text: variables.text,
              createdAt: new Date().toISOString(),
            },
          ],
        }),
      );
    },
  });
};

export * from "./createMentorComment.types";
export * from "./createMentorComment.validation";
