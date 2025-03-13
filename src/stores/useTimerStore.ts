import { BrowserSessionStore } from "./BrowserSessionStore";
import { create } from "zustand";
import { SessionKeys } from "../constants/SessionKeys";
import { Constants } from "@/constants/Constants";

type TimeStoreState = {
  timer: number;
  timerIsRunning: boolean;
};

type TimeStoreAction = {
  updateTimer: (arg: number) => void;
  resetTimerStore: () => void;
  setTimer: (arg: number) => void;
  startTimer: () => void;
};

type TimeStore = TimeStoreState & TimeStoreAction;

export const useTimerStore = create<TimeStore>((set) => ({
  timerIsRunning: BrowserSessionStore.get(SessionKeys.TIMER_RUNNING) ?? false,
  startTimer: () => {
    BrowserSessionStore.set(SessionKeys.TIMER_RUNNING, true);
    set({ timerIsRunning: true });
  },
  stopTimer: () => {
    BrowserSessionStore.set(SessionKeys.TIMER_RUNNING, false);
    set({ timerIsRunning: false });
  },

  timer:
    BrowserSessionStore.get(SessionKeys.TIME_REMAINING) ??
    Constants.MOCK_DEFAULT_TIME_IN_MS,
  updateTimer: (time: number) => {
    BrowserSessionStore.set(SessionKeys.TIME_REMAINING, time);
    set({ timer: time });
  },
  setTimer: (initialTime: number) => set({ timer: initialTime }),

  resetTimerStore: () => {
    BrowserSessionStore.remove(SessionKeys.TIME_REMAINING);
    BrowserSessionStore.remove(SessionKeys.TIMER_RUNNING);
    set({ timer: Constants.MOCK_DEFAULT_TIME_IN_MS, timerIsRunning: false });
  },
}));
