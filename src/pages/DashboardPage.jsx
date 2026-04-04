
import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Lightbulb } from 'lucide-react'
import LeftLayout from '../components/LeftLayout'
import SummaryCard from '../components/SummaryCard'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/dashboard/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/dashboard/insights', icon: Lightbulb, label: 'Insights' },
]

export default function DashboardPage(){
    return <div className="flex">
        <LeftLayout/>
        <div className='flex flex-col w-full p-5'>
            <div className='font-bold text-3xl'>
                Good morning, Sir/Mam
            </div>
            <p className='font-light text-gray-400 mb-6'>Here is your financial overview</p>
            <SummaryCard/>
        </div>
    </div>
}