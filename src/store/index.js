import { create } from "zustand";
import { TRANSACTIONS, categoryEmoji } from "../data/data";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist((set) => ({
    theme: "light",
    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === "light" ? "dark" : "light";
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        return { theme: newTheme };
      }),
    initTheme: () =>
      set((state) => {
        if (state.theme === "dark") {
          document.documentElement.classList.add("dark");
        }
        return {};
      }),
  }),{name:'financify-theme'}),
);

export const useTransactionStore = create(
  persist(
    (set) => ({
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
      editTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t,
          ),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
    }),
    { name: "financify-transactions" },
  ),
);

export const useRoleStore = create(
  persist(
    (set) => ({
      role: "viewer",
      setRole: (role) => set({ role }),
    }),
    { name: "financify-role" },
  ),
);
