import Revenue from "../components/Revenue"
import SpendingBreakdown from "../components/SpendingBreakdown";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";
import { TRANSACTIONS } from "../data/data";

export default function Overview() {
  return (
    <div className="p-5">
      <div className="font-bold text-3xl">Welcome back, User</div>
      <p className="font-light text-gray-400 mb-6">
        Your financial overview is available here.
      </p>
      <SummaryCard />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="col-span-2">
          <Revenue />
        </div>
        <div className="col-span-1">
          <SpendingBreakdown />
        </div>
      </div>
      <TransactionTable transactions={TRANSACTIONS.slice(-5)}/>
    </div>
  );
}
