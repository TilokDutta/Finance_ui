import { useMemo } from "react";
import { useTransactionStore } from '../store'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  subMonths,
} from "date-fns";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-zinc-700 border border-gray-100 dark:border-zinc-600 rounded-xl shadow-lg px-4 py-3">
      <p className="text-xs text-gray-400 dark:text-zinc-300 mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-sm font-bold" style={{ color: p.fill }}>
          {p.name}: ₹{p.value?.toLocaleString("en-IN")}
        </p>
      ))}
    </div>
  );
};

export default function IncomeVExpense() {
  const transactions = useTransactionStore((s) => s.transactions);
  const barData = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => subMonths(now, 5 - i));
    return months.map((month) => {
      const start = startOfMonth(month);
      const end = endOfMonth(month);
      const txns = transactions.filter((t) => {
        const d = parseISO(t.date);
        return d >= start && d <= end;
      });
      const income = txns.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
      const expense = txns.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
      return { month: format(month, "MMM"), income, expense };
    });
  }, [transactions]);

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm mb-6">
      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">Income vs Expense</h3>
      <p className="text-sm text-gray-400 dark:text-zinc-500 mb-6">6-month comparison</p>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={barData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }} barGap={4}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            className="text-gray-100 dark:text-zinc-700"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 13, fill: "#9ca3af" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 13 }}
            formatter={(value) => (
              <span className="text-gray-600 dark:text-zinc-300">{value}</span>
            )}
          />
          <Bar dataKey="income" name="Income" fill="#22c55e" radius={[6, 6, 0, 0]} maxBarSize={36} />
          <Bar dataKey="expense" name="Expense" fill="#E8604A" radius={[6, 6, 0, 0]} maxBarSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}