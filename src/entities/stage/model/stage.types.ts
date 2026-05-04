export type ScoreScale = "POINTS_10" | "POINTS_100" | "PASS_FAIL" | "STARS_5";
export type SubmissionFieldType =
  | "TEXT"
  | "LINK"
  | "FILE"
  | "FILES"
  | "VIDEO"
  | "PHOTO"
  | "SELECT"
  | "NUMBER";
export type ResourceType = "LINK" | "FILE" | "TEXT";
export type StageSubmissionStatus = "DRAFT" | "SUBMITTED";

export interface IResourceRequest {
  order?: number;
  type: ResourceType;
  title: string;
  description?: string;
  linkUrl?: string;
  fileId?: number;
}

export interface IResourceResponse {
  id?: number;
  order?: number;
  type?: ResourceType;
  title?: string;
  description?: string;
  linkUrl?: string;
  fileId?: number;
}

export interface IResourceListResponse {
  resources?: IResourceResponse[];
}

export interface ISubmissionFieldRequest {
  order?: number;
  title: string;
  type: SubmissionFieldType;
  required?: boolean;
  fileFormats?: string;
  maxFileSizeMb?: number;
  options?: string;
  participantHint?: string;
  exampleValue?: string;
  expertNote?: string;
  criteriaDescription?: string;
}

export interface IFieldParticipantResponse {
  id?: number;
  order?: number;
  title?: string;
  type?: SubmissionFieldType;
  required?: boolean;
  fileFormats?: string;
  maxFileSizeMb?: number;
  options?: string;
  participantHint?: string;
  exampleValue?: string;
}

export interface IFieldResponse extends IFieldParticipantResponse {
  expertNote?: string;
  criteriaDescription?: string;
}

export interface IFieldListResponse {
  fields?: IFieldResponse[];
}

export interface IFieldParticipantListResponse {
  fields?: IFieldParticipantResponse[];
}

export interface IStageRequest {
  title: string;
  description?: string;
  rules?: string;
  extraInfo?: string;
  deadlineAt?: string;
  eliminating?: boolean;
  scoreScale: ScoreScale;
  order?: number;
}

export interface IStageParticipantResponse {
  id?: number;
  order?: number;
  title?: string;
  description?: string;
  rules?: string;
  deadlineAt?: string;
  eliminating?: boolean;
  scoreScale?: ScoreScale;
  fields?: IFieldParticipantResponse[];
  resources?: IResourceResponse[];
}

export interface IStageOrganizesResponse {
  id?: number;
  order?: number;
  title?: string;
  description?: string;
  rules?: string;
  extraInfo?: string;
  deadlineAt?: string;
  eliminating?: boolean;
  scoreScale?: ScoreScale;
  fields?: IFieldResponse[];
  resources?: IResourceResponse[];
}

export interface IStageParticipantListResponse {
  stages?: IStageParticipantResponse[];
}

export interface IStageOrganizesListResponse {
  stages?: IStageOrganizesResponse[];
}

export interface IValueRequest {
  fieldId: number;
  valueText?: string;
  fileIds?: string;
}

export type ValueFileIdsInput = string | number[];

export interface IValueRequestInput extends Omit<IValueRequest, "fileIds"> {
  fileIds?: ValueFileIdsInput;
}

export interface IValueResponse {
  id?: number;
  fieldId?: number;
  valueText?: string;
  fileIds?: string;
}

export interface IStageSubmissionResponse {
  id?: number;
  status?: StageSubmissionStatus;
  stage?: IStageParticipantResponse;
  values?: IValueResponse[];
}

export interface IDeletedResponse {
  id?: number;
}
