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

export type AiReviewStatus = "COMPLETED" | "COMPLETED_WITH_WARNINGS";

export type AiFieldReviewStatus =
  | "COMPLETED"
  | "UNSUPPORTED_FORMAT"
  | "SKIPPED_NO_CRITERIA"
  | "SKIPPED_NO_DATA"
  | "FAILED";

export type AiCriterionReviewStatus =
  | "COMPLETED"
  | "SKIPPED"
  | "UNSUPPORTED_FORMAT"
  | "FAILED";

export interface IAiEvidenceResponse {
  path?: string;
  chunkIndex?: number;
  quote?: string;
  why?: string;
}

export interface IAiCriterionReviewResponse {
  criterionId?: number;
  order?: number;
  description?: string;
  status?: AiCriterionReviewStatus;
  score?: number;
  verdict?: string;
  answer?: string;
  evidence?: IAiEvidenceResponse[];
  confidence?: number;
}

export interface IAiFieldReviewResponse {
  fieldId?: number;
  order?: number;
  title?: string;
  type?: string;
  status?: AiFieldReviewStatus;
  sourceType?: string;
  message?: string;
  criteria?: IAiCriterionReviewResponse[];
}

export interface IAiReviewResponse {
  id?: number;
  submissionId?: number;
  status?: AiReviewStatus;
  createdAt?: string;
  updatedAt?: string;
  fields?: IAiFieldReviewResponse[];
}

export interface IAiReviewLookupResponse {
  exists?: boolean;
  review?: IAiReviewResponse | null;
}

export type IExpertReviewSubmissionResponse = IStageSubmissionResponse;
