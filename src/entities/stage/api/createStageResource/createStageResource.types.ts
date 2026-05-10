import { IResourceRequest, IResourceResponse } from "../../model/stage.types";

export interface ICreateStageResourceVariables {
  stageId: number;
  data: IResourceRequest;
}

export type ICreateStageResourceResponse = IResourceResponse;
