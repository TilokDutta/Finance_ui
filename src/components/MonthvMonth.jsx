import { useMemo } from "react";
import { TRANSACTIONS } from "../data/data";
import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  subMonths,
} from "date-fns";
export default function MonthvMonth() {
  const monthvmonthData = useMemo(() => {
    const now = new Date();
    const months = [subMonths(now, 1), now]; // last month and current month

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

      return { month: format(month, "MMM yyyy"), income, expense };
    });
  }, []);

  const incomeChange =
    monthvmonthData[0].income === 0
      ? 0
      : (
          ((monthvmonthData[1].income - monthvmonthData[0].income) /
            monthvmonthData[0].income) *
          100
        ).toFixed(1);

  const expenseChange =
    monthvmonthData[0].expense === 0
      ? 0
      : (
          ((monthvmonthData[1].expense - monthvmonthData[0].expense) /
            monthvmonthData[0].expense) *
          100
        ).toFixed(1);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <h3 className="font-bold text-xl text-gray-900 mb-1">Month over Month</h3>
      <p className="text-sm text-gray-400 mb-6">
        Comparing {monthvmonthData[0].month} vs {monthvmonthData[1].month}
      </p>

      <div className="grid grid-cols-2 gap-6">
        {/* Income change */}
        <div className="bg-gray-100 rounded-2xl p-5">
          <p className="text-sm text-gray-600 mb-3">Income</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-extrabold text-gray-900">
                ₹{monthvmonthData[1].income.toLocaleString("en-IN")}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                vs ₹{monthvmonthData[0].income.toLocaleString("en-IN")} last
                month
              </p>
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-full
          ${incomeChange >= 0 ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}
            >
              {incomeChange >= 0 ? "↑" : "↓"} {Math.abs(incomeChange)}%
            </div>
          </div>
        </div>

        {/* Expense change */}
        <div className="bg-gray-100 rounded-2xl p-5">
          <p className="text-sm text-gray-600 mb-3">Expenses</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-extrabold text-gray-900">
                ₹{monthvmonthData[1].expense.toLocaleString("en-IN")}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                vs ₹{monthvmonthData[0].expense.toLocaleString("en-IN")} last
                month
              </p>
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-full
          ${expenseChange <= 0 ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}
            >
              {expenseChange >= 0 ? "↑" : "↓"} {Math.abs(expenseChange)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
