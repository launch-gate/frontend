import { IContestParticipantOrganizerListResponse } from "../../model/contest.types";

export interface IGetOrganizerContestParticipantsVariables {
  contestId: number;
}

export type IGetOrganizerContestParticipantsResponse =
  IContestParticipantOrganizerListResponse;
