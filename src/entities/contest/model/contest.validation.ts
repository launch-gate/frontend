import { array, mixed, number, object, string } from "yup";

import {
  ContestStatus,
  ExportFormat,
  OrganizerRole,
  ParticipationMode,
} from "./contest.types";

export const participationModeSchema = mixed<ParticipationMode>().oneOf([
  "INDIVIDUAL",
  "TEAM",
]);

export const contestStatusSchema = mixed<ContestStatus>().oneOf([
  "DRAFT",
  "PUBLISHED",
  "RUNNING",
  "FINISHED",
]);

export const organizerRoleSchema = mixed<OrganizerRole>().oneOf([
  "CREATOR",
  "ADMIN",
  "EXPERT",
  "MENTOR",
]);

export const exportFormatSchema = mixed<ExportFormat>().oneOf(["CSV", "XLSX"]);

export const contestRequestSchema = object({
  title: string().required(),
  description: string().optional(),
  rules: string().optional(),
  participationMode: participationModeSchema.required(),
  minTeamSize: number().integer().optional(),
  maxTeamSize: number().integer().optional(),
  registrationEndsAt: string().optional(),
  teamBuildingEndsAt: string().optional(),
  startsAt: string().optional(),
  endsAt: string().optional(),
  contacts: string().optional(),
});

export const contestInfoSchema = object({
  id: number().integer().nullable().optional(),
  title: string().nullable().optional(),
  description: string().nullable().optional(),
  rules: string().nullable().optional(),
  status: contestStatusSchema.nullable().optional(),
  participationMode: participationModeSchema.nullable().optional(),
  minTeamSize: number().integer().nullable().optional(),
  maxTeamSize: number().integer().nullable().optional(),
  registrationEndsAt: string().nullable().optional(),
  teamBuildingEndsAt: string().nullable().optional(),
  startsAt: string().nullable().optional(),
  endsAt: string().nullable().optional(),
  contacts: string().nullable().optional(),
}).required();

export const contestListInfoSchema = object({
  contests: array().of(contestInfoSchema).optional(),
}).required();

export const participantContestRegistrationSchema = object({
  registrationId: number().integer().optional(),
}).required();

export const contestParticipantSchema = object({
  userId: number().integer().optional(),
  fullName: string().optional(),
  nickname: string().optional(),
  bio: string().optional(),
  registeredAt: string().optional(),
});

export const contestParticipantOrganizerSchema = contestParticipantSchema.shape(
  {
    email: string().optional(),
  },
);

export const contestParticipantListSchema = object({
  participants: array().of(contestParticipantSchema).optional(),
}).required();

export const contestParticipantOrganizerListSchema = object({
  participants: array().of(contestParticipantOrganizerSchema).optional(),
}).required();

export const addOrganizerRequestSchema = object({
  userId: number().integer().required(),
  role: organizerRoleSchema.required(),
});

export const organizerSchema = object({
  id: number().integer().optional(),
  userId: number().integer().optional(),
  role: organizerRoleSchema.optional(),
});

export const organizerListSchema = object({
  organizers: array().of(organizerSchema).optional(),
}).required();

export const contestAnalyticsSchema = object({
  registrations: number().integer().optional(),
  teams: number().integer().optional(),
  stages: number().integer().optional(),
  submittedWorks: number().integer().optional(),
}).required();

export const customExportRequestSchema = object({
  format: exportFormatSchema.required(),
  prompt: string().optional(),
});

export const customExportSchema = object({
  jobId: number().integer().optional(),
  preview: string().optional(),
}).required();
