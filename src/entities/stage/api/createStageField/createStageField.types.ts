import {
  IFieldResponse,
  ISubmissionFieldRequest,
} from "../../model/stage.types";

export interface ICreateStageFieldVariables {
  stageId: number;
  data: ISubmissionFieldRequest;
}

export type ICreateStageFieldResponse = IFieldResponse;
