import { create } from "zustand";

import { UseOfficeIdStore } from "@/types/types";

export const useOfficeIdStore = create<UseOfficeIdStore>((set) => ({
  currentOfficeId: "",
  setOfficeId: (id: string) => set({ currentOfficeId: id }),
}));
