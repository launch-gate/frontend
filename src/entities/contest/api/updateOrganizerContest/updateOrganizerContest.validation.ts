import {
  contestInfoSchema,
  contestRequestSchema,
} from "../../model/contest.validation";

export const updateOrganizerContestRequestSchema = contestRequestSchema;
export const updateOrganizerContestResponseSchema = contestInfoSchema;
