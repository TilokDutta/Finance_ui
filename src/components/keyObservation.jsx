import { AlertCircle, Award, TrendingDown, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { useTransactionStore } from '../store';
import { format, parseISO } from "date-fns";

export default function KeyObservation() {
  const transactions = useTransactionStore((s) => s.transactions);

  const observations = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const income = transactions.filter((t) => t.type === "income");

    const totalIncome = income.reduce((s, t) => s + t.amount, 0);
    const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);

    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
    const savingsRate = totalIncome > 0
      ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(0)
      : 0;
    const biggest = [...transactions].sort((a, b) => b.amount - a.amount)[0];
    const ratio = totalIncome > 0 ? ((totalExpense / totalIncome) * 100).toFixed(0) : 0;

    return { topCategory, savingsRate, biggest, ratio };
  }, [transactions]);

  const cards = [
    {
      icon: Award,
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      iconColor: "text-yellow-500",
      title: `Top Spending: ${observations.topCategory?.[0] ?? "N/A"}`,
      desc: `₹${observations.topCategory?.[1]?.toLocaleString("en-IN") ?? 0} total across all months`,
    },
    {
      icon: TrendingUp,
      bg: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-500",
      title: `Savings Rate: ${observations.savingsRate}%`,
      desc: observations.savingsRate > 20
        ? "Great! You're saving more than 20% of your income."
        : "Try to save at least 20% of your income.",
    },
    {
      icon: AlertCircle,
      bg: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-500",
      title: "Biggest Transaction",
      desc: observations.biggest
        ? `${observations.biggest.description} — ₹${observations.biggest.amount.toLocaleString("en-IN")} on ${format(parseISO(observations.biggest.date), "MMM d, yyyy")}`
        : "No transactions yet",
    },
    {
      icon: TrendingDown,
      bg: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-500",
      title: "Income / Expense Ratio",
      desc: `For every ₹100 earned, you spend ₹${observations.ratio}`,
    },
  ];

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">
        Key Observations
      </h3>

      <div className="flex flex-col gap-3">
        {cards.map(({ icon: Icon, bg, iconColor, title, desc }) => (
          <div key={title} className={`flex items-start gap-3 ${bg} rounded-2xl p-4`}>
            <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 ${iconColor}`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{title}</p>
              <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}