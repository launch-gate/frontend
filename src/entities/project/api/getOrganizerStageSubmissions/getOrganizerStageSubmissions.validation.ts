import { array, number, object, string } from "yup";

import {
  stageOrganizesSchema,
  stageSubmissionStatusSchema,
  valueSchema,
} from "@/entities/stage";

export const submissionSummarySchema = object({
  submissionId: number().integer().optional(),
  projectId: number().integer().optional(),
  stageId: number().integer().optional(),
  contestId: number().integer().optional(),
  solutionTitle: string().nullable().optional(),
  status: stageSubmissionStatusSchema.optional(),
});

export const organizerStageSubmissionSchema = object({
  summary: submissionSummarySchema.optional(),
  id: number().integer().optional(),
  status: stageSubmissionStatusSchema.optional(),
  values: array().of(valueSchema).optional(),
});

export const getOrganizerStageSubmissionsResponseSchema = object({
  stage: stageOrganizesSchema.optional(),
  submissions: array().of(organizerStageSubmissionSchema).optional(),
}).required();
