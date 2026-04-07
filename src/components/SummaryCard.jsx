import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { useTransactionStore } from "../store";

const cards = (totalBal, totalIncome, totalExpense, savingsRate) => [
  {
    icon: Wallet,
    iconBg: "bg-black dark:bg-white",
    iconColor: "text-white dark:text-black",
    label: "Total Balance",
    value: `₹${totalBal.toLocaleString("en-IN")}`,
    valueColor: "text-gray-900 dark:text-white",
  },
  {
    icon: TrendingUp,
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600",
    label: "Total Income",
    value: `₹${totalIncome.toLocaleString("en-IN")}`,
    valueColor: "text-green-600",
  },
  {
    icon: TrendingDown,
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-500",
    label: "Total Expenses",
    value: `₹${totalExpense.toLocaleString("en-IN")}`,
    valueColor: "text-[#E8604A]",
  },
  {
    icon: PiggyBank,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-500",
    label: "Savings Rate",
    value: `${savingsRate}%`,
    valueColor: Number(savingsRate) >= 20 ? "text-green-600" : "text-[#E8604A]",
  },
];

export default function SummaryCard() {
  const transactions = useTransactionStore((s) => s.transactions);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalBal = totalIncome - totalExpense;
  const savingsRate =
    totalIncome > 0
      ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(0)
      : "0";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {cards(totalBal, totalIncome, totalExpense, savingsRate).map(
        ({ icon: Icon, iconBg, iconColor, label, value, valueColor }) => (
          <div
            key={label}
            className="bg-white dark:bg-zinc-800 p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-zinc-950/40 pb-8"
          >
            <div
              className={`w-9 h-9 flex justify-center items-center ${iconBg} ${iconColor} p-2 rounded-xl mb-1`}
            >
              <Icon size={18} />
            </div>
            <p className="text-xs py-3 text-gray-400 dark:text-zinc-300 font-medium">
              {label}
            </p>
            <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
          </div>
        ),
      )}
    </div>
  );
}
