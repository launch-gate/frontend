import { IDeletedResponse } from "../../model/stage.types";

export interface IDeleteStageResourceVariables {
  stageId: number;
  resourceId: number;
}

export type IDeleteStageResourceResponse = IDeletedResponse;
