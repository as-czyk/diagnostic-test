"use client";

import { create } from "zustand";
import { BrowserSessionStore } from "./BrowserSessionStore";

type QuestionControllerState = {
  currentQuestion: any | null;
  exam: any | null;
  examId: string;
};

type QuestionControllerActions = {
  setCurrentQuestion: (q: any) => void;
  resetCurrentQuestion: () => void;
  clearStore: () => void;
  setExam: (exam: any) => void;
};

type QuestionControllerStore = QuestionControllerState &
  QuestionControllerActions;

export const useQuestionControllerStore = create<QuestionControllerStore>(
  (set, get) => ({
    /* Question that is currently display */
    currentQuestion: null,
    setCurrentQuestion: (q) => set({ currentQuestion: q }),
    resetCurrentQuestion: () => set({ currentQuestion: null }),

    /* Id of the exam that is currently being taken */
    examId: "",
    exam: null,

    setExam: (exam: any) => {
      set({ examId: exam.id, exam });
    },

    clearCandidatesAndCurrent: () => {
      set({
        currentQuestion: null,
      });
    },

    clearStore: () => {
      //BrowserSessionStore.remove(SessionKeys.QUESTION_IN_EXAM);
      //BrowserSessionStore.remove(SessionKeys.EXAM_ID);
      set({
        currentQuestion: null,
        examId: "",
      });
    },
  })
);
