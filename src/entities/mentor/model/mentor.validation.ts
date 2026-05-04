import { array, number, object, string } from "yup";

export const assignMentorRequestSchema = object({
  teamId: number().integer().required(),
  mentorUserId: number().integer().required(),
});

export const mentorAssignmentSchema = object({
  id: number().integer().optional(),
  contestId: number().integer().optional(),
  teamId: number().integer().optional(),
  mentorId: number().integer().optional(),
}).required();

export const mentorAssignmentListSchema = object({
  assignments: array().of(mentorAssignmentSchema).optional(),
}).required();

export const mentorCommentRequestSchema = object({
  stageSubmissionId: number().integer().required(),
  text: string().required(),
});

export const mentorCommentCreatedSchema = object({
  commentId: number().integer().optional(),
}).required();

export const mentorCommentSchema = object({
  id: number().integer().optional(),
  stageSubmissionId: number().integer().optional(),
  mentorId: number().integer().optional(),
  text: string().optional(),
  createdAt: string().optional(),
}).required();

export const mentorCommentListSchema = object({
  comments: array().of(mentorCommentSchema).optional(),
}).required();

export const scheduleCallRequestSchema = object({
  teamId: number().integer().required(),
  startsAt: string().required(),
  endsAt: string().required(),
  link: string().optional(),
  notes: string().optional(),
});

export const mentorCallCreatedSchema = object({
  callId: number().integer().optional(),
}).required();

export const mentorCallSchema = object({
  id: number().integer().optional(),
  teamId: number().integer().optional(),
  mentorId: number().integer().optional(),
  startsAt: string().optional(),
  endsAt: string().optional(),
  link: string().optional(),
  notes: string().optional(),
}).required();

export const mentorCallListSchema = object({
  calls: array().of(mentorCallSchema).optional(),
}).required();
