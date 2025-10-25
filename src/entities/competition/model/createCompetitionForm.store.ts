import { create } from "zustand";
import { persist } from "zustand/middleware";

import { initialCreateCompetitionState } from "../lib/initialCreateCompetitionState";
import { ICreateCompetitionStore } from "./createCompetitionFilters.types";

export const createCompetitionStore = create<ICreateCompetitionStore>()(
  persist(
    (set, get) => ({
      createCompetitionState: initialCreateCompetitionState,

      setState: (updatedState) =>
        set((state) => ({
          createCompetitionState: {
            ...state.createCompetitionState,
            ...updatedState,
          },
        })),

      resetState: () =>
        set(() => ({
          createCompetitionState: initialCreateCompetitionState,
        })),

      getState: () => {
        const state = get();
        return state.createCompetitionState;
      },
    }),
    {
      name: "create-competition",
    },
  ),
);
