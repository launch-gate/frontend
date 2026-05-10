import { IResourceRequest, IResourceResponse } from "../../model/stage.types";

export interface IUpdateStageResourceVariables {
  stageId: number;
  resourceId: number;
  data: IResourceRequest;
}

export type IUpdateStageResourceResponse = IResourceResponse;
