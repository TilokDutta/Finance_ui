import { endOfMonth, format, parseISO, startOfMonth, subMonths } from "date-fns";
import { useMemo } from "react";
import { useTransactionStore } from '../store'

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-zinc-700 border border-gray-100 dark:border-zinc-600 rounded-xl shadow-lg px-4 py-3">
      <p className="text-xs text-gray-400 dark:text-zinc-300 mb-1">{label}</p>
      <p className="text-sm font-bold text-purple-500">{payload[0].value}%</p>
    </div>
  );
};

export default function SavingsRate() {
  const transactions = useTransactionStore((s) => s.transactions);

  const savingsData = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => subMonths(now, 5 - i));
    return months.map((mon) => {
      const start = startOfMonth(mon);
      const end = endOfMonth(mon);
      const trans = transactions.filter((t) => {
        const d = parseISO(t.date);
        return d >= start && d <= end;
      });
      const income = trans.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
      const expense = trans.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
      const rate = income > 0 ? parseFloat(((income - expense) / income * 100).toFixed(1)) : 0;
      return { month: format(mon, "MMM"), rate };
    });
  }, [transactions]);

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">Savings Rate</h3>
      <p className="text-sm text-gray-400 dark:text-zinc-500 mb-6">% of income saved each month</p>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={savingsData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
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
            tick={{ fontSize: 12, fill: "#9ca3af" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickFormatter={(v) => `${v}%`}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={20}
            stroke="#22c55e"
            strokeDasharray="4 4"
            label={{ value: "20% goal", fill: "#22c55e", fontSize: 11 }}
          />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#B06BFF"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#B06BFF", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#B06BFF", strokeWidth: 2, stroke: "#fff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
