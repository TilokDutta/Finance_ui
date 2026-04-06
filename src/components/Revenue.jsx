import {
  eachMonthOfInterval,
  endOfMonth,
  format,
  parseISO,
  startOfMonth,
  subMonths,
} from "date-fns";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const dummyTransactions = [
  { date: "2025-11-15", type: "income", amount: 85000 },
  { date: "2025-11-20", type: "expense", amount: 30000 },
  { date: "2025-12-01", type: "income", amount: 95000 },
  { date: "2025-12-15", type: "expense", amount: 40000 },
  { date: "2026-01-01", type: "income", amount: 85000 },
  { date: "2026-01-20", type: "expense", amount: 35000 },
  { date: "2026-02-01", type: "income", amount: 107000 },
  { date: "2026-02-18", type: "expense", amount: 42000 },
  { date: "2026-03-01", type: "income", amount: 85000 },
  { date: "2026-03-22", type: "expense", amount: 38000 },
  { date: "2026-04-01", type: "income", amount: 85000 },
  { date: "2026-04-03", type: "expense", amount: 45000 },
]

const config = [
  { key: "balance", label: "Balance", color: "#E8604A" },
  { key: "income", label: "Income", color: "#22c55e" },
  { key: "expense", label: "Expense", color: "#6BB5FF" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-bold" style={{ color: payload[0].color }}>
        ₹{payload[0].value?.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

export default function Revenue() {
  const [view, setView] = useState("balance");

  const currentConfig = config.find((c) => c.key === view);

  const data = useMemo(() => {
    const now = new Date();
    const months = eachMonthOfInterval({
      start: subMonths(now, 5),
      end: now,
    });

    return months.map((month) => {
      const start = startOfMonth(month);
      const end = endOfMonth(month);

      const monthTxns = dummyTransactions.filter((t) => {
        const d = parseISO(t.date);
        return d >= start && d <= end;
      });

      const income = monthTxns
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = monthTxns
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        month: format(month, "MMM"),
        income,
        expense,
        balance: income - expense,
      };
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-gray-900 text-xl">
            Revenue & Expenses
          </h3>
          <p className="text-md text-gray-400 mt-0.5">6-months overview</p>
        </div>

        <div className="flex bg-gray-100 rounded-xl p-1">
          {config.map(({ label, key }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`text-md font-semibold px-3 py-1.5 rounded-[10px] capitalize cursor-pointer ${view === key ? "bg-white text-gray-900 shadow-md" : "text-gray-400 hover:text-gray-600"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={currentConfig.color}
                stopOpacity={0.15}
              />
              <stop
                offset="95%"
                stopColor={currentConfig.color}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={view}
            stroke={currentConfig.color}
            strokeWidth={2.5}
            fill="url(#colorGrad)"
            dot={{ r: 4, fill: currentConfig.color, strokeWidth: 0 }}
            activeDot={{
              r: 6,
              fill: currentConfig.color,
              strokeWidth: 2,
              stroke: "#fff",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
