import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const dummyTransactions = [
  {
    id: 1,
    description: "Monthly Salary",
    category: "Salary",
    type: "income",
    amount: 85000,
    date: "2026-04-01",
  },
  {
    id: 2,
    description: "Apartment Rent",
    category: "Rent",
    type: "expense",
    amount: 18000,
    date: "2026-04-02",
  },
  {
    id: 3,
    description: "Swiggy Order",
    category: "Food & Dining",
    type: "expense",
    amount: 480,
    date: "2026-04-03",
  },
  {
    id: 4,
    description: "Freelance Project",
    category: "Freelance",
    type: "income",
    amount: 22000,
    date: "2026-04-04",
  },
  {
    id: 5,
    description: "Netflix Subscription",
    category: "Entertainment",
    type: "expense",
    amount: 649,
    date: "2026-04-05",
  },
];

export default function RecentTransactions() {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-gray-900 text-xl">
            Recent Transactions
          </h3>
          <p className="text-sm text-gray-400 mt-0.5">Last 5 transactions</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="text-sm text-[#E8604A] font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/dashboard/transactions")}
          >
            View all
          </button>
          <ArrowRight size={16} className="text-[#E8604A]" />
        </div>
      </div>

      {/* transactions list coming next */}
      <div className="flex flex-col p-2">
        {dummyTransactions.map((item) => (
          <div className="flex items-center justify-between p-4  hover:bg-gray-200 rounded-2xl">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === "income" ? "bg-green-300 text-green-600" : "bg-red-300 text-red-600"}`}
              >
                {item.type === "income" ? <ArrowUp /> : <ArrowDown />}
              </div>
              <div className="pl-3">
                <p className="text-lg font-semibold text-gray-900">
                  {item.description}
                </p>
                <p className="text-sm text-gray-400">{item.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-lg font-bold ${item.type === "income" ? "text-green-500" : "text-[#E8604A]"}`}
              >
                {item.type === "income" ? "+" : "-"}₹
                {item.amount.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-gray-400">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
