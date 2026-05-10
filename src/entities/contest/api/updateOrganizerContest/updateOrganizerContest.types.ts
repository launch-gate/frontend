import {
  IContestInfoResponse,
  IContestRequest,
} from "../../model/contest.types";

export interface IUpdateContestVariables {
  contestId: number;
  data: IContestRequest;
}

export type IUpdateOrganizerContestResponse = IContestInfoResponse;
