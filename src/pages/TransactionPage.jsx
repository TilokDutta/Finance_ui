import { useState } from "react";
import { Search, SlidersHorizontal, Plus, X } from "lucide-react";
import { CATEGORIES } from "../data/data";
import TransactionTable from "../components/TransactionTable";
import { useTransactionStore, useRoleStore } from "../store";

const EMPTY_FORM = {
  description: "",
  amount: "",
  type: "expense",
  category: "Food",
  date: new Date().toISOString().split("T")[0],
};

export default function TransactionPage() {
  // — Filters (local UI state) —
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // — Modal (local UI state) —
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // — Zustand store —
  const role = useRoleStore((s) => s.role);
  const transactions = useTransactionStore((s) => s.transactions); // ✅ from store, not static import
  const addTransaction = useTransactionStore((s) => s.addTransaction);

  // — Filtered list —
  const filtered = transactions.filter((t) => {
    const matchSearch = t.description
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory = category === "All" || t.category === category;
    const matchType = type === "All" || t.type === type.toLowerCase();
    const matchFrom = !dateFrom || t.date >= dateFrom;
    const matchTo = !dateTo || t.date <= dateTo;
    return matchSearch && matchCategory && matchType && matchFrom && matchTo;
  });

  // — Form helpers —
  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = "Enter a valid positive amount";
    if (!form.date) e.date = "Date is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    addTransaction({ ...form, amount: Number(form.amount) });
    handleClose();
  };

  const handleClose = () => {
    setShowModal(false);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const isAdmin = role === "admin";

  return (
    <div>
      {/* ── Page header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl text-gray-900">Transactions</h1>
          <p className="text-gray-400 font-light mt-1">
            All your transactions in one place
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#E8604A] hover:bg-[#d4503b] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-sm"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        )}
      </div>

      {/* ── Filter box ── */}
      <div className="bg-white dark:bg-zinc-800 rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center bg-gray-50 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 px-4 py-2.5 rounded-xl gap-2 flex-1">
            <Search size={16} className="text-gray-400 dark:text-zinc-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 bg-transparent w-full outline-none"
            />
          </div>

          {/* Type toggle */}
          <div className="flex rounded-xl bg-gray-50 dark:bg-zinc-700 p-1 border border-gray-200 dark:border-zinc-600">
            {["All", "Income", "Expense"].map((selectedType) => (
              <button
                key={selectedType}
                onClick={() => setType(selectedType)}
                className={`text-sm font-semibold px-4 py-2 rounded-[10px] cursor-pointer transition-all
            ${
              type === selectedType
                ? "bg-white dark:bg-zinc-600 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-400 dark:text-zinc-400 hover:text-gray-600 dark:hover:text-zinc-200"
            }`}
              >
                {selectedType}
              </button>
            ))}
          </div>

          {/* Filters toggle */}
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer
        ${
          showFilters
            ? "bg-orange-50 dark:bg-[#E8604A]/10 border-orange-200 dark:border-[#E8604A]/30 text-[#E8604A]"
            : "bg-gray-50 dark:bg-zinc-700 border-gray-200 dark:border-zinc-600 text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200"
        }`}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-zinc-700">
            <div>
              <p className="text-xs text-gray-400 dark:text-zinc-500 mb-1.5">
                Category
              </p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-xl px-4 py-2.5 text-sm text-gray-600 dark:text-zinc-300 outline-none cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-zinc-500 mb-1.5">
                From Date
              </p>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full bg-gray-50 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-xl px-4 py-2.5 text-sm text-gray-600 dark:text-zinc-300 outline-none"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-zinc-500 mb-1.5">
                To Date
              </p>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full bg-gray-50 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-xl px-4 py-2.5 text-sm text-gray-600 dark:text-zinc-300 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Table ── */}
      <TransactionTable transactions={filtered} />

      {/* ── Add Transaction Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Add Transaction
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Fill in the details below
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Description */}
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grocery shopping"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none transition-colors
                    ${
                      errors.description
                        ? "border-red-300 focus:border-red-400"
                        : "border-gray-200 focus:border-orange-300"
                    }`}
                />
                {errors.description && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  min="0"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none transition-colors
                    ${
                      errors.amount
                        ? "border-red-300 focus:border-red-400"
                        : "border-gray-200 focus:border-orange-300"
                    }`}
                />
                {errors.amount && (
                  <p className="text-xs text-red-400 mt-1">{errors.amount}</p>
                )}
              </div>

              {/* Type toggle */}
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                  Type
                </label>
                <div className="flex bg-gray-50 border border-gray-200 rounded-xl p-1">
                  {["income", "expense"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setForm({ ...form, type: t })}
                      className={`flex-1 py-2 rounded-[10px] text-sm font-semibold capitalize transition-all cursor-pointer
                        ${
                          form.type === t
                            ? t === "income"
                              ? "bg-white text-emerald-600 shadow-sm"
                              : "bg-white text-[#E8604A] shadow-sm"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category + Date side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 outline-none cursor-pointer focus:border-orange-300 transition-colors"
                  >
                    {CATEGORIES.filter((c) => c !== "All").map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={`w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-sm text-gray-600 outline-none transition-colors
                      ${
                        errors.date
                          ? "border-red-300"
                          : "border-gray-200 focus:border-orange-300"
                      }`}
                  />
                  {errors.date && (
                    <p className="text-xs text-red-400 mt-1">{errors.date}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 rounded-xl bg-[#E8604A] hover:bg-[#d4503b] text-white text-sm font-semibold transition-all cursor-pointer shadow-sm"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
