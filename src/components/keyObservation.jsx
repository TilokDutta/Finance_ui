import { AlertCircle, Award, TrendingDown, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { TRANSACTIONS } from "../data/data";

export default function KeyObservation() {
  const observations = useMemo(() => {
    const expenses = TRANSACTIONS.filter((t) => t.type === "expense");
    const income = TRANSACTIONS.filter((t) => t.type === "income");

    const totalIncome = income.reduce((s, t) => s + t.amount, 0);
    const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);

    // top spending category
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    const topCategory = Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1],
    )[0];

    // savings rate
    const savingsRate = (
      ((totalIncome - totalExpense) / totalIncome) *
      100
    ).toFixed(0);

    // biggest transaction
    const biggest = [...TRANSACTIONS].sort((a, b) => b.amount - a.amount)[0];

    // income expense ratio
    const ratio = ((totalExpense / totalIncome) * 100).toFixed(0);

    return { topCategory, savingsRate, biggest, ratio };
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-xl text-gray-900 mb-4">Key Observations</h3>

      <div className="flex flex-col gap-3">
        {/* Top Spending */}
        <div className="flex items-start gap-3 bg-yellow-50 rounded-2xl p-4">
          <div className="w-8 h-8 flex items-center justify-center text-yellow-500">
            <Award size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              Top Spending: {observations.topCategory[0]}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              ₹{observations.topCategory[1].toLocaleString("en-IN")} total
              across all months
            </p>
          </div>
        </div>

        {/* Savings Rate */}
        <div className="flex items-start gap-3 bg-green-50 rounded-2xl p-4">
          <div className="w-8 h-8 flex items-center justify-center text-green-500">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              Savings Rate: {observations.savingsRate}%
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {observations.savingsRate > 20
                ? "Great! You're saving more than 20% of your income."
                : "Try to save at least 20% of your income."}
            </p>
          </div>
        </div>

        {/* Biggest Transaction */}
        <div className="flex items-start gap-3 bg-blue-50 rounded-2xl p-4">
          <div className="w-8 h-8 flex items-center justify-center text-blue-500">
            <AlertCircle size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              Biggest Transaction
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {observations.biggest.description} — ₹
              {observations.biggest.amount.toLocaleString("en-IN")} on{" "}
              {observations.biggest.date}
            </p>
          </div>
        </div>

        {/* Income/Expense Ratio */}
        <div className="flex items-start gap-3 bg-purple-50 rounded-2xl p-4">
          <div className="w-8 h-8 flex items-center justify-center text-purple-500">
            <TrendingDown size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              Income / Expense Ratio
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              For every ₹100 earned, you spend ₹{observations.ratio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
