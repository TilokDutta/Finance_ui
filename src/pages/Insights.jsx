import KeyObservation from "../components/keyObservation";
import IncomeVExpense from "../components/IncomeVExpense";
import TopSpending from "../components/TopSpending";
import MonthvMonth from "../components/MonthvMonth";
import SavingsRate from "../components/SavingsRate";

export default function Insights() {
  return (
    <div className="p-3">
      <div className="mb-6">
        <h1 className="font-bold text-3xl text-gray-900">Insights</h1>
        <p className="text-gray-400 font-light mt-1">
          A deeper look at your finances
        </p>
      </div>
      {/* Row 1 - Month over Month */}
      <MonthvMonth />
      {/* Row 2 - Income vs Expense */}
      <IncomeVExpense />
      <div className="grid grid-cols-2 gap-6 mb-6">
        <KeyObservation />
        <TopSpending />
      </div>
      <SavingsRate/>
    </div>
  );
}
