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
  isDraft: boolean;
  registrationDateRange: Pair<DateType>;
  competitionDateRange: Pair<DateType>;
  resultDateRange: Pair<DateType>;
  shortDescription: string;
  tagInfos: ITag["name"][];
  competitionType: CompetitionType | null;
  competitionFormat: CompetitionFormatType | null;
  isPublic: boolean;
  participantAgeRange: Pair<number>;
  targetAudience: string;
  isTeamRequired: boolean;
  teamSizeRange: Pair<number>;
  isCountry: boolean;
  managers: IManager[];
  eventContacts: IEventContact[];
  prize: IPrizes;
}
