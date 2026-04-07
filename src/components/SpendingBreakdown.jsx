import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useTransactionStore } from "../store";

const CATEGORY_HEX = {
  Salary: "#22c55e", // green-500
  Rent: "#3b82f6", // blue-500
  "Food & Dining": "#f97316", // orange-500
  Freelance: "#a855f7", // purple-500
  Entertainment: "#ec4899", // pink-500
  Utilities: "#ca8a04", // yellow-600 (since you're using text-yellow-600)
  Shopping: "#f59e0b", // amber-500
  Healthcare: "#ef4444", // red-500
  Travel: "#06b6d4", // cyan-500
};

export default function SpendingBreakdown() {
  const transactions = useTransactionStore((s) => s.transactions);
  const expenses = transactions.filter((t) => t.type === "expense");

  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const spendingData = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      category,
      amount,
      color: CATEGORY_HEX[category] || "#9ca3af",
    }),
  );

  const total = spendingData.reduce((sum, item) => sum + item.amount, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    const percent = ((d.amount / total) * 100).toFixed(0);
    return (
      <div className="bg-white dark:bg-zinc-700 border border-gray-100 dark:border-zinc-600 rounded-xl shadow-lg px-4 py-3">
        <p className="text-xs font-semibold text-gray-700 dark:text-zinc-200">
          {d.category}
        </p>
        <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
          ₹{d.amount.toLocaleString("en-IN")}
        </p>
        <p className="text-xs text-gray-400 dark:text-zinc-400">{percent}%</p>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm mt-8 p-6">
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white text-xl">
          Spending Breakdown
        </h3>
        <p className="text-sm text-gray-400 dark:text-zinc-400 mt-0.5">
          By Category
        </p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={spendingData}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
          >
            {spendingData.map((item) => (
              <Cell key={item.category} fill={item.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-col gap-2 mt-4">
        {spendingData.map((item) => (
          <div
            key={item.category}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: item.color }}
              />
              <span className="text-sm text-gray-600 dark:text-zinc-300">
                {item.category}
              </span>
            </div>
            <span className="text-xs text-gray-400 dark:text-zinc-500">
              {((item.amount / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
