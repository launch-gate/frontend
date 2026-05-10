import {
  contestInfoSchema,
  contestRequestSchema,
} from "../../model/contest.validation";

export const createOrganizerContestRequestSchema = contestRequestSchema;
export const createOrganizerContestResponseSchema = contestInfoSchema;
