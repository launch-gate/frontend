import { array, boolean, mixed, number, object, string } from "yup";

import {
  ResourceType,
  ScoreScale,
  StageSubmissionStatus,
  SubmissionFieldType,
} from "./stage.types";

export const resourceTypeSchema = mixed<ResourceType>().oneOf([
  "LINK",
  "FILE",
  "TEXT",
]);

export const submissionFieldTypeSchema = mixed<SubmissionFieldType>().oneOf([
  "TEXT",
  "LINK",
  "FILE",
  "FILES",
  "VIDEO",
  "PHOTO",
  "SELECT",
  "NUMBER",
]);

export const scoreScaleSchema = mixed<ScoreScale>().oneOf([
  "POINTS_10",
  "POINTS_100",
  "PASS_FAIL",
  "STARS_5",
]);

export const stageSubmissionStatusSchema = mixed<StageSubmissionStatus>().oneOf(
  ["DRAFT", "SUBMITTED"],
);

export const resourceRequestSchema = object({
  order: number().integer().optional(),
  type: resourceTypeSchema.required(),
  title: string().required(),
  description: string().optional(),
  linkUrl: string().optional(),
  fileId: number().integer().optional(),
});

export const resourceSchema = object({
  id: number().integer().optional(),
  order: number().integer().optional(),
  type: resourceTypeSchema.optional(),
  title: string().optional(),
  description: string().nullable().optional(),
  linkUrl: string().nullable().optional(),
  fileId: number().integer().nullable().optional(),
});

export const resourceListSchema = object({
  resources: array().of(resourceSchema).optional(),
}).required();

export const submissionFieldRequestSchema = object({
  order: number().integer().optional(),
  title: string().required(),
  type: submissionFieldTypeSchema.required(),
  required: boolean().optional(),
  fileFormats: string().optional(),
  maxFileSizeMb: number().integer().optional(),
  options: string().optional(),
  participantHint: string().optional(),
  exampleValue: string().optional(),
  expertNote: string().optional(),
  criteriaDescription: string().optional(),
});

export const fieldParticipantSchema = object({
  id: number().integer().optional(),
  order: number().integer().optional(),
  title: string().optional(),
  type: submissionFieldTypeSchema.optional(),
  required: boolean().optional(),
  fileFormats: string().nullable().optional(),
  maxFileSizeMb: number().integer().nullable().optional(),
  options: string().nullable().optional(),
  participantHint: string().nullable().optional(),
  exampleValue: string().nullable().optional(),
});

export const fieldSchema = fieldParticipantSchema.shape({
  expertNote: string().optional(),
  criteriaDescription: string().optional(),
});

export const fieldListSchema = object({
  fields: array().of(fieldSchema).optional(),
}).required();

export const fieldParticipantListSchema = object({
  fields: array().of(fieldParticipantSchema).optional(),
}).required();

export const stageRequestSchema = object({
  title: string().required(),
  description: string().optional(),
  rules: string().optional(),
  extraInfo: string().optional(),
  deadlineAt: string().optional(),
  eliminating: boolean().optional(),
  scoreScale: scoreScaleSchema.required(),
  order: number().integer().optional(),
});

export const stageParticipantSchema = object({
  id: number().integer().optional(),
  order: number().integer().optional(),
  title: string().optional(),
  description: string().optional(),
  rules: string().optional(),
  deadlineAt: string().optional(),
  eliminating: boolean().optional(),
  scoreScale: scoreScaleSchema.optional(),
  fields: array().of(fieldParticipantSchema).optional(),
  resources: array().of(resourceSchema).optional(),
});

export const stageOrganizesSchema = object({
  id: number().integer().optional(),
  order: number().integer().optional(),
  title: string().optional(),
  description: string().optional(),
  rules: string().optional(),
  extraInfo: string().optional(),
  deadlineAt: string().optional(),
  eliminating: boolean().optional(),
  scoreScale: scoreScaleSchema.optional(),
  fields: array().of(fieldSchema).optional(),
  resources: array().of(resourceSchema).optional(),
});

export const stageParticipantListSchema = object({
  stages: array().of(stageParticipantSchema).optional(),
}).required();

export const stageOrganizesListSchema = object({
  stages: array().of(stageOrganizesSchema).optional(),
}).required();

export const valueRequestSchema = object({
  fieldId: number().integer().required(),
  valueText: string().optional(),
  fileIds: string().optional(),
});

export const valueSchema = object({
  id: number().integer().optional(),
  fieldId: number().integer().optional(),
  valueText: string().optional(),
  fileIds: string().optional(),
});

export const stageSubmissionSchema = object({
  id: number().integer().optional(),
  status: stageSubmissionStatusSchema.optional(),
  stage: stageParticipantSchema.optional(),
  values: array().of(valueSchema).optional(),
}).required();

export const deletedSchema = object({
  id: number().integer().optional(),
}).required();
