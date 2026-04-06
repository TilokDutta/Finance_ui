import { Wallet,TrendingUp,TrendingDown,PiggyBank } from 'lucide-react';
import { TRANSACTIONS } from '../data/data';

export default function SummaryCard(){
    const totalIncome = TRANSACTIONS
        .filter((t) => t.type === 'income')
        .reduce((sum,t) => sum +t.amount,0)
    const totalExpense = TRANSACTIONS
        .filter((t) => t.type === 'expense')
        .reduce((sum,t) => sum +t.amount,0)
    const totalBal = totalIncome-totalExpense;
    const SavingsRate = ((totalIncome-totalExpense)/totalIncome*100).toFixed(0);




    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className="bg-white p-4 rounded-xl shadow-xl/10 pb-8">
            <div className='w-8 h-8 flex justify-center items-center bg-black text-white p-2 rounded-xl'>
                <Wallet/>
            </div>
            <p className='text-xs py-3 text-gray-400'>
                Total Balance
            </p>
            <p className='text-2xl font-bold'>
                ₹{totalBal.toLocaleString('en-IN')}
            </p>
        </div>
        <div className="card p-4 rounded-xl shadow-xl/10 pb-8">
            <div className='w-8 h-8 flex justify-center items-center bg-green-200 text-green-600 p-2 rounded-xl'>
                <TrendingUp/>
            </div>
            <p className='text-xs py-3 text-gray-100'>
                Total Income
            </p>
            <p className='text-2xl font-bold'>
                ₹{totalIncome.toLocaleString('en-IN')}
            </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-xl/10 pb-8">
            <div className='w-8 h-8 flex justify-center items-center bg-red-200 text-red-600 p-2 rounded-xl'>
                <TrendingDown/>
            </div>
            <p className='text-xs py-3 text-gray-400'>
                Total Expences
            </p>
            <p className='text-2xl font-bold'>
                ₹{totalExpense.toLocaleString('en-IN')}
            </p>
        </div>
        <div className="card p-4 rounded-xl shadow-xl/10 pb-8">
            <div className='w-8 h-8 flex justify-center items-center bg-blue-200 text-blue-600 p-2 rounded-xl'>
                <PiggyBank/>
            </div>
            <p className='text-xs py-3 text-gray-100'>
                Savings Rate
            </p>
            <p className='text-2xl font-bold'>
                {SavingsRate}%
            </p>
        </div>
    </div>
}