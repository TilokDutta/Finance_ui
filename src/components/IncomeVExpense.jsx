import { useMemo } from "react";
import { TRANSACTIONS } from "../data/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  subMonths,
} from "date-fns";

export default function IncomeVExpense() {
  const barData = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => subMonths(now, 5 - i));

    return months.map((month) => {
      const start = startOfMonth(month);
      const end = endOfMonth(month);

      const txns = TRANSACTIONS.filter((t) => {
        const d = parseISO(t.date);
        return d >= start && d <= end;
      });

      const income = txns
        .filter((t) => t.type === "income")
        .reduce((s, t) => s + t.amount, 0);
      const expense = txns
        .filter((t) => t.type === "expense")
        .reduce((s, t) => s + t.amount, 0);

      return { month: format(month, "MMM"), income, expense };
    });
  }, []);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <h3 className="font-bold text-xl text-gray-900 mb-1">
        Income vs Expense
      </h3>
      <p className="text-sm text-gray-400 mb-6">6-month comparison</p>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={barData}
          margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
          barGap={4}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 15, fill: "#9ca3af" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 13, fill: "#9ca3af" }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            width={48}
          />
          <Tooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} />
          <Legend />
          <Bar
            dataKey="income"
            name="Income"
            fill="#22c55e"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="expense"
            name="Expense"
            fill="#E8604A"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
