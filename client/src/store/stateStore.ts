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
}

export const useStateStore = create<StateStore>((set) => ({
  user: { name: "", age: "", grade: "", theme: "" },
  setUser: (value) => set({ user: value }),
}));
