import { create } from "zustand";

interface PickSlipItem {
  marketId: string;
  outcomeId: string;
  outcomeLabel: string;
  marketQuestion: string;
  multiplier: number;
  stake: number;
}

interface PickSlipState {
  items: PickSlipItem[];
  isOpen: boolean;
  addItem: (item: Omit<PickSlipItem, "stake">) => void;
  removeItem: (marketId: string) => void;
  setStake: (marketId: string, stake: number) => void;
  clear: () => void;
  toggle: () => void;
}

export const usePickSlipStore = create<PickSlipState>((set) => ({
  items: [],
  isOpen: false,
  addItem: (item) =>
    set((state) => {
      const exists = state.items.find((i) => i.marketId === item.marketId);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.marketId === item.marketId ? { ...item, stake: i.stake } : i,
          ),
        };
      }
      return { items: [...state.items, { ...item, stake: 0 }], isOpen: true };
    }),
  removeItem: (marketId) =>
    set((state) => ({
      items: state.items.filter((i) => i.marketId !== marketId),
    })),
  setStake: (marketId, stake) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.marketId === marketId ? { ...i, stake } : i,
      ),
    })),
  clear: () => set({ items: [], isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
