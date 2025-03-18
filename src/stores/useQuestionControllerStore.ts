"use client";

import { create } from "zustand";

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
  getNextQuestionId: () => string | null;
  getCurrentQuestionIndex: () => number;
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

    getNextQuestionId: () => {
      const { currentQuestion, exam } = get();

      // If no current question, return the first question
      if (!currentQuestion) {
        return exam.questions[0];
      }

      // Find the current question's index in the array
      const currentIndex = exam.questions.findIndex(
        (qId: string) => qId === currentQuestion.id
      );

      // If current question not found or it's the last question, return null
      if (currentIndex === -1 || currentIndex >= exam.questions.length - 1) {
        return null;
      }

      // Return the next question ID
      return exam.questions[currentIndex + 1];
    },

    getCurrentQuestionIndex: () => {
      const { currentQuestion, exam } = get();

      return exam.questions.findIndex(
        (qId: string) => qId === currentQuestion.id
      );
    },

    clearCurrentQuestion: () => {
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
