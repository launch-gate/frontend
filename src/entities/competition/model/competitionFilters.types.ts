export interface ICompetitionStore {
  search: string;
  statuses: string[];
  duration: string | null;
  durationRange: [number | null, number | null];
  prizeMin: number;
  prizeMax: number;
}

export interface ICompetitionFiltersStore {
  competitionState: ICompetitionStore;

  setFilters: (filters: Partial<ICompetitionStore>) => void;
  resetFilters: () => void;
  getFilters: () => ICompetitionStore;
}
