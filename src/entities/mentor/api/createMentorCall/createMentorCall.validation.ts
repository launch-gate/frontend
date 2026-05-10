import {
  mentorCallCreatedSchema,
  scheduleCallRequestSchema,
} from "../../model/mentor.validation";

export const createMentorCallRequestSchema = scheduleCallRequestSchema;
export const createMentorCallResponseSchema = mentorCallCreatedSchema;
