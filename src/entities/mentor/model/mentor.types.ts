import { IStageSubmissionResponse } from "@/entities/stage";

export interface IAssignMentorRequest {
  teamId: number;
  mentorUserId: number;
}

export interface IMentorAssignmentResponse {
  id?: number;
  contestId?: number;
  teamId?: number;
  mentorId?: number;
}

export interface IMentorAssignmentListResponse {
  assignments?: IMentorAssignmentResponse[];
}

export interface IMentorCommentRequest {
  stageSubmissionId: number;
  text: string;
}

export interface IMentorCommentCreatedResponse {
  commentId?: number;
}

export interface IMentorCommentResponse {
  id?: number;
  stageSubmissionId?: number;
  mentorId?: number;
  text?: string;
  createdAt?: string;
}

export interface IMentorCommentListResponse {
  comments?: IMentorCommentResponse[];
}

export interface IScheduleCallRequest {
  teamId: number;
  startsAt: string;
  endsAt: string;
  link?: string;
  notes?: string;
}

export interface IMentorCallCreatedResponse {
  callId?: number;
}

export interface IMentorCallResponse {
  id?: number;
  teamId?: number;
  mentorId?: number;
  startsAt?: string;
  endsAt?: string;
  link?: string;
  notes?: string;
}

export interface IMentorCallListResponse {
  calls?: IMentorCallResponse[];
}

export type IMentorStageSubmissionResponse = IStageSubmissionResponse;
