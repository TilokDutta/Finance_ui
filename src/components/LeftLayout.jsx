import { LayoutDashboard, ArrowLeftRight, Lightbulb } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '../lib/utils';
import { useState } from 'react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/dashboard/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/dashboard/insights', icon: Lightbulb, label: 'Insights' },
]

export default function LeftLayout() {
  const [role,setRole] = useState('viewer');
  return (
    <div className="sticky w-70 h-screen bg-white shadow-2xl">
      <div className="flex items-center border-b w-full h-18 border-gray-100 pl-4">
        <div className="bg-black text-white w-8 h-8 rounded-full text-center pt-1 font-bold">
          {" "}
          F
        </div>
        <p className="text-2xl font-bold ml-2">Financify</p>
      </div>
      <div className="w-full h-90 border-b border-gray-100 mt-20 pl-4 pr-4">
        <nav className="flex flex-col gap-3">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-md font-medium transition-colors
                ${
                  isActive
                    ? "bg-orange-50 text-[#E8604A]"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className='p-7'>
        <p className='text-gray-400'>Role</p>
        <div className='flex bg-gray-100 rounded-xl p-0.5'>
          {['viewer','admin'].map((r) =>(
            <button key={r} onClick={() => setRole(r)} className={cn('flex-1 text-md font-semibold py-1.5 rounded-[10px]',role===r ?
              'bg-white text-gray-900 shadow-sm':'text-gray hover:texy-gray-500'
            )}>
                {r}
            </button>
          ))}
        </div>
      </div>
      <div>
        {/* had to implement the logout option or nay other option also have to implement the collapse option */}
      </div>
    </div>
  );
}
