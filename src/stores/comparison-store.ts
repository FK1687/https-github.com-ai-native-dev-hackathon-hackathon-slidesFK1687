import { create } from 'zustand';

interface ComparisonState {
  compareList: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  compareList: [],

  addToCompare: (id: string) => {
    const { compareList } = get();
    if (compareList.length >= 4 || compareList.includes(id)) return;
    set({ compareList: [...compareList, id] });
  },

  removeFromCompare: (id: string) => {
    set((state) => ({
      compareList: state.compareList.filter((pid) => pid !== id),
    }));
  },

  clearCompare: () => {
    set({ compareList: [] });
  },

  isInCompare: (id: string) => {
    return get().compareList.includes(id);
  },
}));
