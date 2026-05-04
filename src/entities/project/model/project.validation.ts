import { array, number, object } from "yup";

import {
  stageSubmissionSchema,
  valueRequestSchema,
} from "@/entities/stage/model/stage.validation";

export const projectRequestSchema = object({
  contestId: number().integer().required(),
  teamId: number().integer().optional(),
});

export const projectSchema = object({
  id: number().integer().optional(),
  contestId: number().integer().optional(),
  teamId: number().integer().optional(),
  ownerParticipantId: number().integer().optional(),
  stages: array().of(stageSubmissionSchema).optional(),
}).required();

export const myProjectsSchema = object({
  activeProjects: array().of(projectSchema).optional(),
  archivedProjects: array().of(projectSchema).optional(),
}).required();

export { valueRequestSchema };
