import { UsePaginationStore } from "@/types/types";
import { create } from "zustand";

export const usePaginationStore = create<UsePaginationStore>((set) => ({
  skip: 0,
  take: 10,
  totalCount: 0,
  setSkip: (skip: number) => set({ skip }),
  setTake: (take: number) => set({ take }),
  setTotalCount: (totalCount: number) => set({ totalCount }),
}));
