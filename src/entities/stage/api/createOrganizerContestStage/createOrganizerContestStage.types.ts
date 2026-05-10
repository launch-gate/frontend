import {
  IStageOrganizesResponse,
  IStageRequest,
} from "../../model/stage.types";

export interface ICreateOrganizerContestStageVariables {
  contestId: number;
  data: IStageRequest;
}

export type ICreateOrganizerContestStageResponse = IStageOrganizesResponse;
