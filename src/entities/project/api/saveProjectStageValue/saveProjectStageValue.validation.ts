import { stageSubmissionSchema } from "@/entities/stage/model/stage.validation";

import { valueRequestSchema } from "../../model/project.validation";

export const saveProjectStageValueRequestSchema = valueRequestSchema;
export const saveProjectStageValueResponseSchema = stageSubmissionSchema;
