import { IParticipantContestRegistrationResponse } from "@/entities/contest";

export type TeamJoinRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ITeamRequest {
  name: string;
}

export interface ITeamResponse {
  id?: number;
  contestId?: number;
  leaderId?: number;
  name?: string;
  inviteToken?: string;
  memberIds?: number[];
}

export interface IAllTeamsResponse {
  teams?: ITeamResponse[];
}

export interface ITeamRequestJoinResponse {
  joinRequestId?: number;
}

export interface ITeamJoinRequestResponse {
  id?: number;
  teamId?: number;
  participantId?: number;
  participantFullName?: string;
  participantNickname?: string;
  status?: TeamJoinRequestStatus;
  createdAt?: string;
}

export interface ITeamJoinRequestListResponse {
  requests?: ITeamJoinRequestResponse[];
}

export type ITeamContestRegistrationResponse =
  IParticipantContestRegistrationResponse;
