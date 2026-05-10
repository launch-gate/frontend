import {
  fieldSchema,
  submissionFieldRequestSchema,
} from "../../model/stage.validation";

export const createStageFieldRequestSchema = submissionFieldRequestSchema;
export const createStageFieldResponseSchema = fieldSchema;
