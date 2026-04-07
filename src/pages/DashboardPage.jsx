import { Outlet } from "react-router-dom";
import LeftLayout from "../components/LeftLayout";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F5F0] dark:bg-zinc-950">
      <LeftLayout />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 pt-16 md:pt-6">
        <Outlet />
      </div>
    </div>
  );
}