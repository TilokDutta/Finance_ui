import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { TRANSACTIONS, CATEGORIES, CATEGORY_COLORS } from "../data/data";
import TransactionTable from "../components/TransactionTable";

export default function TransactionPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filtered = TRANSACTIONS.filter((t) => {
    const matchSearch = t.description
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory = category === "All" || t.category === category;
    const matchType = type === "All" || t.type === type.toLowerCase();
    const matchFrom = !dateFrom || t.date >= dateFrom;
    const matchTo = !dateTo || t.date <= dateTo;
    return matchSearch && matchCategory && matchType && matchFrom && matchTo;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-bold text-3xl text-gray-900">Transactions</h1>
        <p className="text-gray-400 font-light mt-1">
          All your transactions in one place
        </p>
      </div>
      {/* this is the filter box section */}
      <div className=" bg-white rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Seacrh input box */}

          <div className="flex items-center bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl gap-2 flex-1">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-md text-gray-900 placeholder-gray-400 bg-transparent w-full"
            />
          </div>

          {/* toggle button for type of transaction */}

          <div className="flex rounded-xl bg-gray-50 p-1 border border-gray-200">
            {["All", "Income", "Expense"].map((selectedType) => (
              <button
                key={selectedType}
                onClick={() => setType(selectedType)}
                className={`text-md font-semibold px-4 py-2 rounded-[10px] cursor-pointer ${type === selectedType ? "bg-white text-gray shadow-sm" : "text-gray-400 hover:text-gray-600"} transition-all`}
              >
                {selectedType}
              </button>
            ))}
          </div>

          {/* Filter buttton */}

          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer
              ${showFilters ? "bg-orange-50 border-orange-200 text-[#E8604A]" : "bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700"}`}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-400 mb-1.5">Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 outline-none cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1.5">From Date</p>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 outline-none"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1.5">To Date</p>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 outline-none"
              />
            </div>
          </div>
        )}
      </div>
      <TransactionTable transactions={filtered} />
    </div>
  );
}
