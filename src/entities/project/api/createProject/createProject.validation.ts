import {
  projectRequestSchema,
  projectSchema,
} from "../../model/project.validation";

export const createProjectRequestSchema = projectRequestSchema;
export const createProjectResponseSchema = projectSchema;
