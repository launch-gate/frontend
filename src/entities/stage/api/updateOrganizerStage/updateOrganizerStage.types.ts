import {
  IStageOrganizesResponse,
  IStageRequest,
} from "../../model/stage.types";

export interface IUpdateOrganizerStageVariables {
  stageId: number;
  data: IStageRequest;
}

export type IUpdateOrganizerStageResponse = IStageOrganizesResponse;
