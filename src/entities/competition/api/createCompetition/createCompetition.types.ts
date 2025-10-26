import { ICreateCompetition } from "../../model/createCompetitionFilters.types";

export type ICreateCompetitionRequest = Omit<
  ICreateCompetition,
  "currentStage"
>;
