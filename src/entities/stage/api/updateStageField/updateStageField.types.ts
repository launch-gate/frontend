import {
  IFieldResponse,
  ISubmissionFieldRequest,
} from "../../model/stage.types";

export interface IUpdateStageFieldVariables {
  stageId: number;
  fieldId: number;
  data: ISubmissionFieldRequest;
}

export type IUpdateStageFieldResponse = IFieldResponse;
