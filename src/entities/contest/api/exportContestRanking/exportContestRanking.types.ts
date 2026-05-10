import { ExportFormat } from "../../model/contest.types";

export interface IExportContestRankingVariables {
  contestId: number;
  format?: ExportFormat;
}

export type IExportContestRankingResponse = Blob;
