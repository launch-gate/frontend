import {
  mentorCommentCreatedSchema,
  mentorCommentRequestSchema,
} from "../../model/mentor.validation";

export const createMentorCommentRequestSchema = mentorCommentRequestSchema;
export const createMentorCommentResponseSchema = mentorCommentCreatedSchema;
