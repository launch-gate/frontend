import { array, mixed, number, object, string } from "yup";

import { ReviewStatus } from "./evaluation.types";

export const reviewStatusSchema = mixed<ReviewStatus>().oneOf([
  "NEW",
  "DRAFT",
  "COMPLETED",
]);

export const reviewDraftRequestSchema = object({
  score: number().optional(),
  comment: string().optional(),
});

export const reviewSchema = object({
  assignmentId: number().integer().optional(),
  submissionId: number().integer().optional(),
  expertId: number().integer().optional(),
  status: reviewStatusSchema.optional(),
  score: number().optional(),
  comment: string().optional(),
  finalizedAt: string().optional(),
}).required();

export const assignmentRequestSchema = object({
  submissionId: number().integer().required(),
  expertUserId: number().integer().required(),
});

export const assignmentSchema = object({
  id: number().integer().optional(),
  stageId: number().integer().optional(),
  submissionId: number().integer().optional(),
  expertId: number().integer().optional(),
  status: reviewStatusSchema.optional(),
}).required();

export const assignmentListSchema = object({
  assignments: array().of(assignmentSchema).optional(),
}).required();

export const aiReviewCreatedSchema = object({
  aiReviewId: number().integer().optional(),
}).required();
