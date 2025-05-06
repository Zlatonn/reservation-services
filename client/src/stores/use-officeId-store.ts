import { create } from "zustand";

interface OfficeId {
  currentOfficeId: string;
  setOfficeId: (id: string) => void;
}

export const useOfficeIdStore = create<OfficeId>((set) => ({
  currentOfficeId: "",
  setOfficeId: (id: string) => set({ currentOfficeId: id }),
}));
