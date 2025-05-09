import { create } from "zustand";

import { UseFormDialogStore } from "@/types/types";

export const useFormDialogStore = create<UseFormDialogStore>((set) => ({
  isOpen: false,
  id: "",
  openDialog: (id) => set({ isOpen: true, id }),
  closeDialog: () => set({ isOpen: false, id: "" }),
}));
