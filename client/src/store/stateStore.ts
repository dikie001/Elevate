import { create } from "zustand";

interface MainTypes {
  name: string;
  age: string;
  grade: string;
  theme: string;
}

interface StateStore {
  user: MainTypes;
  setUser: (value: MainTypes) => void;

  currentRoute: string;
  setCurrentRoute: (Value: string) => void;
}

export const useStateStore = create<StateStore>((set) => ({
  // User data state
  user: { name: "", age: "", grade: "", theme: "" },
  setUser: (value) => set({ user: value }),

  // Current Route State
  currentRoute: "/",
  setCurrentRoute: (value) => set({ currentRoute: value }),
}));
