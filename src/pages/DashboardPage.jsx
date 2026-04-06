import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Lightbulb } from "lucide-react";
import LeftLayout from "../components/LeftLayout";
import SummaryCard from "../components/SummaryCard";
import Revenue from "../components/revenue";
import SpendingBreakdown from "../components/SpendingBreakdown";
import RecentTransactions from "../components/RecentTransactions";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <LeftLayout />
      <div className="flex-1 overflow-y-auto p-6">
        <Outlet/>
      </div>
    </div>
  );
}
