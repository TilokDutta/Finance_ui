import { Outlet } from "react-router-dom";

import LeftLayout from "../components/LeftLayout";


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
