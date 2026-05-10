import {
  stageOrganizesSchema,
  stageRequestSchema,
} from "../../model/stage.validation";

export const updateOrganizerStageRequestSchema = stageRequestSchema;
export const updateOrganizerStageResponseSchema = stageOrganizesSchema;
