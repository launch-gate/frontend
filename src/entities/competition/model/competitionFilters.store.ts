import { create } from "zustand";

import { ICompetitionFiltersStore } from "./competitionFilters.types";
import { initialFilters } from "../lib/initialCompetitionFilters";

export const competitionFilterStore = create<ICompetitionFiltersStore>(
  (set, get) => ({
    competitionState: initialFilters,

    setFilters: (filters) =>
      set((state) => ({
        ...state,
        competitionState: {
          ...state.competitionState,
          ...filters,
        },
      })),

    resetFilters: () =>
      set(() => ({
        competitionState: initialFilters,
      })),

    getFilters: () => {
      const args = get();
      return args.competitionState;
    },
  }),
);
