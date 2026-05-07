import { ICompetitionStore } from "../model/competitionFilters.types";

export const initialFilters: ICompetitionStore = {
  search: "",
  statuses: [],
  duration: null,
  durationRange: [null, null],
  prizeMin: 0,
  prizeMax: 5000000,
};
