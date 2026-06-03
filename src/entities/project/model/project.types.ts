import {
  IStageOrganizesResponse,
  IStageSubmissionResponse,
  IValueRequestInput,
  IValueResponse,
  StageSubmissionStatus,
} from "@/entities/stage";

export interface IProjectRequest {
  contestId: number;
  teamId?: number;
}

export interface IProjectResponse {
  id?: number;
  contestId?: number;
  teamId?: number;
  ownerParticipantId?: number;
  stages?: IStageSubmissionResponse[];
}

export interface IMyProjectsResponse {
  activeProjects?: IProjectResponse[];
  archivedProjects?: IProjectResponse[];
}

export interface ISaveProjectStageValueVariables {
  projectId: number;
  stageId: number;
  data: IValueRequestInput;
}

export interface ISubmitProjectStageVariables {
  projectId: number;
  stageId: number;
}

export interface ISubmissionSummary {
  submissionId?: number;
  projectId?: number;
  stageId?: number;
  contestId?: number;
  solutionTitle?: string;
  status?: StageSubmissionStatus;
}

export interface IOrganizerStageSubmissionResponse {
  summary?: ISubmissionSummary;
  id?: number;
  status?: StageSubmissionStatus;
  values?: IValueResponse[];
}

export interface IOrganizerStageSubmissionListResponse {
  stage?: IStageOrganizesResponse;
  submissions?: IOrganizerStageSubmissionResponse[];
}
