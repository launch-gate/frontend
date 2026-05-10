import {
  IAddOrganizerRequest,
  IOrganizerResponse,
} from "../../model/contest.types";

export interface IAddContestOrganizerVariables {
  contestId: number;
  data: IAddOrganizerRequest;
}

export type IAddContestOrganizerResponse = IOrganizerResponse;
