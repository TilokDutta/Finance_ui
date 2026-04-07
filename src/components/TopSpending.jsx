import { useMemo } from 'react'
import { CATEGORY_COLORS } from '../data/data'
import { useTransactionStore } from '../store'


const CATEGORY_HEX = {
  'Salary':        '#22c55e', // green-500
  'Rent':          '#3b82f6', // blue-500
  'Food & Dining': '#f97316', // orange-500
  'Freelance':     '#a855f7', // purple-500
  'Entertainment': '#ec4899', // pink-500
  'Utilities':     '#ca8a04', // yellow-600 (since you're using text-yellow-600)
  'Shopping':      '#f59e0b', // amber-500
  'Healthcare':    '#ef4444', // red-500
  'Travel':        '#06b6d4', // cyan-500
};

export default function TopSpending() {
  const transactions = useTransactionStore((s) => s.transactions)

  const topCategories = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense')
    const totalExpense = expenses.reduce((s, t) => s + t.amount, 0)
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})
    return Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([category, amount]) => ({
        category,
        amount,
        percent: ((amount / totalExpense) * 100).toFixed(0),
      }))
  }, [transactions])

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6">
        Top Spending Categories
      </h3>

      <div className="flex flex-col gap-5">
        {topCategories.map((item, index) => (
          <div key={item.category}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400 dark:text-zinc-500 w-4">{index + 1}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.category}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400 dark:text-zinc-500">{item.percent}%</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  ₹{item.amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-100 dark:bg-zinc-700 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full transition-all duration-700"
                style={{
                  width: `${item.percent}%`,
                  backgroundColor: CATEGORY_HEX[item.category] || '#9ca3af',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}