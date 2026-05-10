import {
  stageOrganizesSchema,
  stageRequestSchema,
} from "../../model/stage.validation";

export const createOrganizerContestStageRequestSchema = stageRequestSchema;
export const createOrganizerContestStageResponseSchema = stageOrganizesSchema;
