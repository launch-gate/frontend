import { IStageSubmissionResponse, IValueRequestInput } from "@/entities/stage";

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
