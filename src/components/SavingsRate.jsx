import { endOfMonth, format, parseISO, startOfMonth, subMonths } from "date-fns";
import { useMemo } from "react";
import { TRANSACTIONS } from "../data/data";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine } from 'recharts'

export default function SavingsRate() {
  const savingsData = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => subMonths(now, 5-i));
    return months.map((mon) => {
      const start = startOfMonth(mon);
      const end = endOfMonth(mon);

      const trans = TRANSACTIONS.filter((t) => {
        const d = parseISO(t.date);
        return d >= start && d <= end;
      });
      const income = trans
        .filter((t) => t.type === "income")
        .reduce((s, t) => s + t.amount, 0);
      const expense = trans
        .filter((t) => t.type === "expense")
        .reduce((s, t) => s + t.amount, 0);
      const rate = (((income - expense) / income) * 100).toFixed(1);

      return { month: format(mon, "MMM"), rate: parseFloat(rate) };
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-xl text-gray-900 mb-1">Savings Rate</h3>
      <p className="text-sm text-gray-400 mb-6">% of income saved each month</p>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={savingsData}
          margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
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
            tick={{ fontSize: 12, fill: "#9ca3af" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickFormatter={(v) => `${v}%`}
            width={40}
          />
          <Tooltip formatter={(v) => [`${v}%`, "Savings Rate"]} />
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
            activeDot={{
              r: 6,
              fill: "#B06BFF",
              strokeWidth: 2,
              stroke: "#fff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
