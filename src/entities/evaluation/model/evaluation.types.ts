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

export type IExpertReviewSubmissionResponse = IStageSubmissionResponse;
