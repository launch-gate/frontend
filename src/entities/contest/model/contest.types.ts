export type ParticipationMode = "INDIVIDUAL" | "TEAM";
export type ContestStatus = "DRAFT" | "PUBLISHED" | "RUNNING" | "FINISHED";
export type OrganizerRole = "CREATOR" | "ADMIN" | "EXPERT" | "MENTOR";
export type ExportFormat = "CSV" | "XLSX";

export interface IContestRequest {
  title: string;
  description?: string;
  rules?: string;
  participationMode: ParticipationMode;
  minTeamSize?: number;
  maxTeamSize?: number;
  registrationEndsAt?: string;
  teamBuildingEndsAt?: string;
  startsAt?: string;
  endsAt?: string;
  contacts?: string;
}

export interface IContestInfoResponse {
  id?: number;
  title?: string;
  description?: string;
  rules?: string;
  status?: ContestStatus;
  participationMode?: ParticipationMode;
  minTeamSize?: number;
  maxTeamSize?: number;
  registrationEndsAt?: string;
  teamBuildingEndsAt?: string;
  startsAt?: string;
  endsAt?: string;
  contacts?: string;
}

export interface IContestInfoResponse {
  id?: number;
  title?: string;
  description?: string;
  status?: ContestStatus;
  participationMode?: ParticipationMode;
  minTeamSize?: number;
  maxTeamSize?: number;
  registrationEndsAt?: string;
  teamBuildingEndsAt?: string;
  startsAt?: string;
  endsAt?: string;
  contacts?: string;
}

export interface IContestListInfoResponse {
  contests?: IContestInfoResponse[];
}

export interface IParticipantContestRegistrationResponse {
  registrationId?: number;
}

export interface IContestParticipantResponse {
  userId?: number;
  fullName?: string;
  nickname?: string;
  bio?: string;
  registeredAt?: string;
}

export interface IContestParticipantOrganizerResponse
  extends IContestParticipantResponse {
  email?: string;
}

export interface IContestParticipantListResponse {
  participants?: IContestParticipantResponse[];
}

export interface IContestParticipantOrganizerListResponse {
  participants?: IContestParticipantOrganizerResponse[];
}

export interface IAddOrganizerRequest {
  userId: number;
  role: OrganizerRole;
}

export interface IOrganizerResponse {
  id?: number;
  userId?: number;
  role?: OrganizerRole;
}

export interface IOrganizerListResponse {
  organizers?: IOrganizerResponse[];
}

export interface IContestAnalyticsResponse {
  registrations?: number;
  teams?: number;
  stages?: number;
  submittedWorks?: number;
}

export interface ICustomExportRequest {
  format: ExportFormat;
  prompt?: string;
}

export interface ICustomExportResponse {
  jobId?: number;
  preview?: string;
}
