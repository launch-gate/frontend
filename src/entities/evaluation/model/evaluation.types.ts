import { IStageSubmissionResponse } from "@/entities/stage";

export type ReviewStatus = "NEW" | "DRAFT" | "COMPLETED";

export interface IReviewDraftRequest {
  score?: number;
  comment?: string;
}

export interface IReviewResponse {
  assignmentId?: number;
  submissionId?: number;
  expertId?: number;
  status?: ReviewStatus;
  score?: number;
  comment?: string;
  finalizedAt?: string;
}

export interface IAssignmentRequest {
  submissionId: number;
  expertUserId: number;
}

export interface IAssignmentResponse {
  id?: number;
  stageId?: number;
  submissionId?: number;
  expertId?: number;
  status?: ReviewStatus;
}

export interface IAssignmentListResponse {
  assignments?: IAssignmentResponse[];
}

export interface IAiReviewCreatedResponse {
  aiReviewId?: number;
}

export type AiReviewFieldStatus =
  | "SUCCESS"
  | "UNSUPPORTED_FORMAT"
  | "SKIPPED_NO_CRITERIA"
  | "SKIPPED_NO_DATA"
  | "FAILED";

export interface IAiReviewCriterionResult {
  criterionDescription?: string;
  score?: number;
  comment?: string;
}

export interface IAiReviewFieldResult {
  fieldId?: number;
  fieldTitle?: string;
  status?: AiReviewFieldStatus;
  result?: string;
  criteriaResults?: IAiReviewCriterionResult[];
}

export interface IAiReviewResponse {
  id?: number;
  submissionId?: number;
  status?: string;
  createdAt?: string;
  fieldResults?: IAiReviewFieldResult[];
}

export type IExpertReviewSubmissionResponse = IStageSubmissionResponse;
