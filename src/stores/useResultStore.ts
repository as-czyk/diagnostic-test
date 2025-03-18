import { create } from "zustand";

// Types for the state
type ResultState = {
  results: {
    questionId: string;
    correctAnswer: string;
    userAnswer: string | null;
    timeTaken: number;
  }[];
};

// Types for the actions
type ResultActions = {
  addResult: (result: {
    questionId: string;
    correctAnswer: string;
    userAnswer: string | null;
    timeTaken: number;
  }) => void;
  clearResults: () => void;
  getResults: () => ResultState["results"];
};

// Union type for the whole store
type ResultStore = ResultState & ResultActions;

// Create the store
export const useResultStore = create<ResultStore>((set, get) => ({
  // Initial state
  results: [],

  // Actions
  addResult: (result) =>
    set((state) => ({
      results: [...state.results, result],
    })),

  clearResults: () =>
    set(() => ({
      results: [],
    })),

  getResults: () => get().results,
}));
