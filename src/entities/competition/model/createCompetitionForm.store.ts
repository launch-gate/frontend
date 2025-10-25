import { create } from "zustand";
import { persist } from "zustand/middleware";

import { initialCreateCompetitionState } from "../lib/initialCreateCompetitionState";
import { ICreateCompetition } from "./createCompetitionFilters.types";

export const createCompetitionStore = create<ICreateCompetition>()(
  persist(
    (set, get) => ({
      createCompetitionState: initialCreateCompetitionState,

      setState: (updatedState) =>
        set((state) => ({
          createCompetitionState: {
            ...state.competitionState,
            ...updatedState,
          },
        })),

      resetState: () =>
        set(() => ({
          createCompetitionState: initialFilters,
        })),

      getState: () => {
        const state = get();
        return state.competitionState;
      },
    }),
    {
      name: "create-competition",
    },
  ),
);
