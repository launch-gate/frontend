import { IContestParticipantListResponse } from "../../model/contest.types";

export interface IGetContestParticipantsVariables {
  contestId: number;
}

export type IGetContestParticipantsResponse = IContestParticipantListResponse;
