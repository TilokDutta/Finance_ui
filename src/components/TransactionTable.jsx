import { Pencil, Trash2 } from "lucide-react";
import { CATEGORY_COLORS, categoryEmoji } from "../data/data";
import { useRoleStore, useTransactionStore } from "../store";
import { useState } from "react";
import { CATEGORIES } from '../data/data'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TransactionTable({ transactions }) {
  const role = useRoleStore((s) => s.role);
  const editTransaction = useTransactionStore((s) => s.editTransaction);
  const deleteTransaction = useTransactionStore((s) => s.deleteTransaction);
  const isAdmin = role === "admin";
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditForm({ description: t.description, amount: t.amount, category: t.category, type: t.type, date: t.date });
  };

  const saveEdit = () => {
    editTransaction(editingId, { ...editForm, amount: Number(editForm.amount), emoji: categoryEmoji[editForm.category] });
    setEditingId(null);
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-2xl p-12 text-center shadow-sm">
        <p className="text-gray-400 dark:text-zinc-500 text-sm">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-5 px-6 py-4 border-b border-gray-100 dark:border-zinc-700 place-items-center">
        {["Date", "Description", "Category", "Type", "Amount"].map((h) => (
          <p key={h} className="text-sm font-semibold text-gray-400 dark:text-zinc-500">{h}</p>
        ))}
      </div>

      {/* Rows */}
      {transactions.map((t) => {
        const cat = CATEGORY_COLORS[t.category] || { bg: "bg-gray-50", text: "text-gray-500" };
        const isEditing = editingId === t.id;

        return (
          <div
            key={t.id}
            className="grid grid-cols-5 px-6 py-4 border-b border-gray-50 dark:border-zinc-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-zinc-700/40 transition-colors items-center"
          >
            {/* Date */}
            <div className="place-items-center">
              <p className="text-sm text-gray-400 dark:text-zinc-400">{formatDate(t.date)}</p>
            </div>

            {/* Description */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-700 flex items-center justify-center text-lg flex-shrink-0">
                {t.emoji}
              </div>
              {isEditing ? (
                <input
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="text-sm border border-gray-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white rounded-lg px-2 py-1 outline-none w-36"
                />
              ) : (
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.description}</p>
              )}
            </div>

            {/* Category */}
            <div className="text-center">
              {isEditing ? (
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="text-sm border border-gray-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white rounded-lg px-2 py-1 outline-none"
                >
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              ) : (
                <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${cat.bg} ${cat.text}`}>
                  {t.category}
                </span>
              )}
            </div>

            {/* Type */}
            <div className="text-center">
              <span className="text-sm font-semibold px-3 py-1.5 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400 capitalize">
                {t.type}
              </span>
            </div>

            {/* Amount */}
            <div className="flex flex-col items-center gap-1">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                    className="text-sm border border-gray-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white rounded-lg px-2 py-1 outline-none w-24"
                  />
                  <button onClick={saveEdit} className="text-xs bg-[#E8604A] text-white px-3 py-1.5 rounded-lg cursor-pointer">
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="text-xs bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300 px-3 py-1.5 rounded-lg cursor-pointer">
                    Cancel
                  </button>
                </div>
              ) : (
                <p className={`text-sm font-bold ${t.type === "income" ? "text-green-500" : "text-red-500"}`}>
                  {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString("en-IN")}
                </p>
              )}
              {isAdmin && !isEditing && (
                <div className="flex items-center gap-2">
                  <button onClick={() => startEdit(t)} className="text-gray-400 hover:text-[#E8604A] transition-colors cursor-pointer">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => deleteTransaction(t.id)} className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                    <Trash2 size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
