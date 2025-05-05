import { create } from "zustand";

interface OfficeId {
  currentOfficeId: string;
  setOfficeId: (id: string) => void;
}

export const useOfficeId = create<OfficeId>((set) => ({
  currentOfficeId: "",
  setOfficeId: (id: string) => set({ currentOfficeId: id }),
}));
