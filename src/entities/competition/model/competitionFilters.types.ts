export interface ICompetitionStore {
  search: string;
}

export interface ICompetitionFiltersStore {
  competitionState: ICompetitionStore;

  setFilters: (filters: ICompetitionStore) => void;
  resetFilters: () => void;
  getFilters: () => ICompetitionStore;
}
