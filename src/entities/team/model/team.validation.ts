import { array, mixed, number, object, string } from "yup";

import { participantContestRegistrationSchema } from "@/entities/contest/model/contest.validation";

import { TeamJoinRequestStatus } from "./team.types";

export const teamJoinRequestStatusSchema = mixed<TeamJoinRequestStatus>().oneOf(
  ["PENDING", "APPROVED", "REJECTED"],
);

export const teamRequestSchema = object({
  name: string().required(),
});

export const teamSchema = object({
  id: number().integer().optional(),
  contestId: number().integer().optional(),
  leaderId: number().integer().optional(),
  name: string().optional(),
  inviteToken: string().optional(),
  memberIds: array().of(number().integer().required()).optional(),
}).required();

export const allTeamsSchema = object({
  teams: array().of(teamSchema).optional(),
}).required();

export const teamRequestJoinSchema = object({
  joinRequestId: number().integer().optional(),
}).required();

export const teamJoinRequestSchema = object({
  id: number().integer().optional(),
  teamId: number().integer().optional(),
  participantId: number().integer().optional(),
  participantFullName: string().optional(),
  participantNickname: string().optional(),
  status: teamJoinRequestStatusSchema.optional(),
  createdAt: string().optional(),
}).required();

export const teamJoinRequestListSchema = object({
  requests: array().of(teamJoinRequestSchema).optional(),
}).required();

export { participantContestRegistrationSchema };
