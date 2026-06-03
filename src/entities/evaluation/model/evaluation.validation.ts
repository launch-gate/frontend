import { array, boolean, mixed, number, object, string } from "yup";

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

export const aiReviewStatusSchema = mixed<
  import("./evaluation.types").AiReviewStatus
>().oneOf(["COMPLETED", "COMPLETED_WITH_WARNINGS"]);

export const aiFieldReviewStatusSchema = mixed<
  import("./evaluation.types").AiFieldReviewStatus
>().oneOf([
  "COMPLETED",
  "UNSUPPORTED_FORMAT",
  "SKIPPED_NO_CRITERIA",
  "SKIPPED_NO_DATA",
  "FAILED",
]);

export const aiCriterionReviewStatusSchema = mixed<
  import("./evaluation.types").AiCriterionReviewStatus
>().oneOf(["COMPLETED", "SKIPPED", "UNSUPPORTED_FORMAT", "FAILED"]);

export const aiEvidenceSchema = object({
  path: string().nullable().optional(),
  chunkIndex: number().integer().nullable().optional(),
  quote: string().nullable().optional(),
  why: string().nullable().optional(),
});

export const aiCriterionReviewSchema = object({
  criterionId: number().integer().nullable().optional(),
  order: number().integer().optional(),
  description: string().nullable().optional(),
  status: aiCriterionReviewStatusSchema.optional(),
  score: number().integer().nullable().optional(),
  verdict: string().nullable().optional(),
  answer: string().nullable().optional(),
  evidence: array().of(aiEvidenceSchema).nullable().optional(),
  confidence: number().nullable().optional(),
});

export const aiFieldReviewSchema = object({
  fieldId: number().integer().optional(),
  order: number().integer().optional(),
  title: string().nullable().optional(),
  type: string().nullable().optional(),
  status: aiFieldReviewStatusSchema.optional(),
  sourceType: string().nullable().optional(),
  message: string().nullable().optional(),
  criteria: array().of(aiCriterionReviewSchema).nullable().optional(),
});

export const aiReviewSchema = object({
  id: number().integer().optional(),
  submissionId: number().integer().optional(),
  status: aiReviewStatusSchema.optional(),
  createdAt: string().optional(),
  updatedAt: string().optional(),
  fields: array().of(aiFieldReviewSchema).optional(),
}).required();

export const aiReviewLookupSchema = object({
  exists: boolean().optional(),
  review: aiReviewSchema.nullable().optional(),
}).required();
