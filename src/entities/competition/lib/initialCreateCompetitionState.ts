import { ICreateCompetition } from "../model/createCompetitionFilters.types";

export const initialCreateCompetitionState: ICreateCompetition = {
  name: "",
  isDraft: false,
  registrationDateRange: [null, null],
  competitionDateRange: [null, null],
  resultDateRange: [null, null],
  shortDescription: "",
  tagInfos: [],
  competitionType: null,
  competitionFormat: null,
  isPublic: false,
  participantAgeRange: [14, 45],
  targetAudience: "",
  isTeamRequired: true,
  teamSizeRange: [2, 5],
  isCountry: true,
  managers: [],
  eventContacts: [],
  prize: { description: "", prizes: [] },
  currentStage: 0,
};
