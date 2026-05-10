import { IDeletedResponse } from "@/entities/stage";

export interface IDeleteContestOrganizerVariables {
  contestId: number;
  organizerId: number;
}

export type IDeleteContestOrganizerResponse = IDeletedResponse;
