import { create } from "zustand";

interface Pagination {
  skip: number;
  take: number;
  totalCount: number;
  setSkip: (skip: number) => void;
  setTake: (take: number) => void;
  setTotalCount: (total: number) => void;
}

export const usePagination = create<Pagination>((set) => ({
  skip: 0,
  take: 10,
  totalCount: 0,
  setSkip: (skip: number) => set({ skip }),
  setTake: (take: number) => set({ take }),
  setTotalCount: (totalCount: number) => set({ totalCount }),
}));
