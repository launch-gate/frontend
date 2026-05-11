import { create } from "zustand";

interface BreadcrumbLabels {
  contestTitle?: string;
  stageTitle?: string;
}

interface BreadcrumbStore extends BreadcrumbLabels {
  setLabels: (labels: BreadcrumbLabels) => void;
  clearLabels: () => void;
}

export const useBreadcrumbStore = create<BreadcrumbStore>((set) => ({
  contestTitle: undefined,
  stageTitle: undefined,
  setLabels: (labels) => set(labels),
  clearLabels: () => set({ contestTitle: undefined, stageTitle: undefined }),
}));
