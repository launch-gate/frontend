import {
  ICustomExportRequest,
  ICustomExportResponse,
} from "../../model/contest.types";

export interface ICreateCustomContestExportVariables {
  contestId: number;
  data: ICustomExportRequest;
}

export type ICreateCustomContestExportResponse = ICustomExportResponse;
