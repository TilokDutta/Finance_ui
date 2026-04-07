import { useState } from "react";
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  Moon, Sun, Menu, X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../lib/utils";
import { useRoleStore, useThemeStore } from "../store";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { to: "/dashboard/transactions", icon: ArrowLeftRight, label: "Transactions" },
  { to: "/dashboard/insights", icon: Lightbulb, label: "Insights" },
];

export default function LeftLayout() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const role = useRoleStore((s) => s.role);
  const setRole = useRoleStore((s) => s.setRole);
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-700 px-4 h-16">
        <div className="flex items-center gap-2">
          <div className="bg-black dark:bg-white text-white dark:text-black w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            F
          </div>
          <NavLink to="/">
            <p className="text-xl font-bold text-gray-900 dark:text-white">Financify</p>
          </NavLink>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <div className="border-b border-gray-100 dark:border-zinc-700 mt-8 px-4 pb-6">
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-orange-50 dark:bg-[#E8604A]/10 text-[#E8604A]"
                    : "text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-700 hover:text-gray-900 dark:hover:text-white"
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
      <div className="px-4 pt-6">
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
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-600 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Mobile hamburger bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 shadow-sm">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="bg-black dark:bg-white text-white dark:text-black w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm">
            F
          </div>
          <span className="font-bold text-gray-900 dark:text-white">Financify</span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>

      {/* ── Mobile backdrop ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div className={cn(
        "md:hidden fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-zinc-900 shadow-2xl transition-transform duration-300",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </div>

      {/* ── Desktop sidebar ── */}
      <div className="hidden md:flex w-64 shrink-0 h-screen sticky top-0 bg-white dark:bg-zinc-900 shadow-xl dark:shadow-zinc-950/50 flex-col">
        <SidebarContent />
      </div>
    </>
  );
}