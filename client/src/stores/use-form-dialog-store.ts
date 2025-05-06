import { create } from "zustand";

interface FormDialog {
  isOpen: boolean;
  id: string;
  openDialog: (id?: string) => void;
  closeDialog: () => void;
}

export const useFormDialogStore = create<FormDialog>((set) => ({
  isOpen: false,
  id: "",
  openDialog: (id) => set({ isOpen: true, id }),
  closeDialog: () => set({ isOpen: false, id: "" }),
}));
