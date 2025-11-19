import { ITag } from "@/entities/tags";

import {
  CompetitionFormatType,
  CompetitionType,
  DateType,
  ICreateCompetition,
  IEventContact,
  IManager,
  IPrize,
  Pair,
} from "../../model/createCompetitionFilters.types";

export type ICreateCompetitionRequest = Omit<
  ICreateCompetition,
  "currentStage"
>;

export interface IPrizes {
  description?: string | null;
  prizes: IPrize[];
}

export interface IGetCreateCompetition {
  id: number;
  name: string;
  competitionDateRange: Pair<DateType>;
  tagInfos: ITag["name"][];
  competitionType: CompetitionType | null;
  competitionFormat: CompetitionFormatType | null;
  isPublic: boolean;
  targetAudience: string;
  isTeamRequired: boolean;
  teamSizeRange: Pair<number>;
  prize: IPrizes;
  mainImageUrl: string;
}
