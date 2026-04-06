import { create } from "zustand";
import { TRANSACTIONS,categoryEmoji } from "../data/data";

export const useAppStore = create((set) => ({
  // --- Role ---
  role: "viewer",
  setRole: (role) => set({ role }),

  // --- Transactions ---
  transactions: TRANSACTIONS,
  addTransaction: (tx) =>
    set((state) => ({
      transactions: [
        {
          ...tx,
          id: Date.now(),
          emoji: categoryEmoji[tx.category] ?? "📦", 
        },
        ...state.transactions,
      ],
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));