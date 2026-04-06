import { CATEGORY_COLORS } from "../data/data";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TransactionTable({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
        <p className="text-gray-400 text-sm">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-5 px-6 py-4 border-b border-gray-100 place-items-center">
        <p className="text-lg font-semibold text-gray-400">Date</p>
        <p className="text-lg font-semibold text-gray-400">Description</p>
        <p className="text-lg font-semibold text-gray-400">Category</p>
        <p className="text-lg font-semibold text-gray-400">Type</p>
        <p className="text-lg font-semibold text-gray-400 text-right">Amount</p>
      </div>

      {/* Rows */}
      {transactions.map((t) => {
        const cat = CATEGORY_COLORS[t.category] || {
          bg: "bg-gray-50",
          text: "text-gray-500",
        };
        return (
          <div
            key={t.id}
            className="grid grid-cols-5 px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors items-center"
          >
            <div className="place-items-center">
              <p className="text-md text-gray-400 mt-0.5">
                {formatDate(t.date)}
              </p>
            </div>
            {/* Description */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                {t.emoji}
              </div>
              <div>
                <p className="text-md font-semibold text-gray-900">
                  {t.description}
                </p>
              </div>
            </div>

            {/* Category badge */}
            <div className="text-center">
              <span
                className={`text-sm font-semibold px-3 py-1.5 rounded-full ${cat.bg} ${cat.text}`}
              >
                {t.category}
              </span>
            </div>

            {/* Type pill */}
            <div className="text-center">
              <span className="text-sm font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 capitalize">
                {t.type}
              </span>
            </div>

            {/* Amount */}
            <div className="place-items-center">
              <p
                className={`text-md font-bold text-right ${t.type === "income" ? "text-green-500" : "text-red-500"}`}
              >
                {t.type === "income" ? "+" : "-"}₹
                {t.amount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
