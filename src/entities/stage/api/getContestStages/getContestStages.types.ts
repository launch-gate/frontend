import { IStageParticipantListResponse } from "../../model/stage.types";

export interface IGetContestStagesVariables {
  contestId: number;
}

export type IGetContestStagesResponse = IStageParticipantListResponse;
