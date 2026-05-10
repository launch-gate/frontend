import { ITeamRequest, ITeamResponse } from "../../model/team.types";

export interface ICreateContestTeamVariables {
  contestId: number;
  data: ITeamRequest;
}

export type ICreateContestTeamResponse = ITeamResponse;
