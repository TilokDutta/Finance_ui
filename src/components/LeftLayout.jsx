import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Moon,
  Sun,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../lib/utils";
import { useRoleStore, useThemeStore } from "../store";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  {
    to: "/dashboard/transactions",
    icon: ArrowLeftRight,
    label: "Transactions",
  },
  { to: "/dashboard/insights", icon: Lightbulb, label: "Insights" },
];

export default function LeftLayout() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const role = useRoleStore((s) => s.role);
  const setRole = useRoleStore((s) => s.setRole);

  return (
    <div className="sticky w-70 h-screen bg-white dark:bg-zinc-800 shadow-2xl dark:shadow-zinc-950/50 flex flex-col">
      
      {/* Logo */}
      <div className="flex items-center border-b w-full h-18 border-gray-100 dark:border-zinc-700 pl-4">
        <div className="bg-black dark:bg-white text-white dark:text-black w-8 h-8 rounded-full text-center pt-1 font-bold flex-shrink-0">
          F
        </div>
        <NavLink to="/">

        <p className="text-2xl font-bold ml-2 text-gray-900 dark:text-white">Financify</p>
        </NavLink>
      </div>

      {/* Nav */}
      <div className="w-full border-b border-gray-100 dark:border-zinc-700 mt-20 px-4 pb-6">
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-orange-50 dark:bg-[#E8604A]/10 text-[#E8604A]"
                    : "text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white"
                )
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Role switcher */}
      <div className="px-7 pt-6">
        <p className="text-xs font-medium text-gray-400 dark:text-zinc-500 mb-2 uppercase tracking-wide">Role</p>
        <div className="flex bg-gray-100 dark:bg-zinc-700 rounded-xl p-0.5">
          {["viewer", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={cn(
                "flex-1 text-sm font-semibold py-1.5 rounded-[10px] capitalize transition-all",
                role === r
                  ? "bg-white dark:bg-zinc-900 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-400 dark:text-zinc-400 hover:text-gray-600 dark:hover:text-zinc-100"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme toggle */}
      <div className="px-4 pb-6 border-t border-gray-100 dark:border-zinc-700 pt-4">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

    </div>
  );
}