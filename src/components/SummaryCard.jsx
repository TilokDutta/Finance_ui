import { Wallet,TrendingUp,TrendingDown,PiggyBank } from 'lucide-react';

export default function(){
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className="bg-white p-4 rounded-xl shadow-xl/10 pb-8">
            <div className='w-8 h-8 flex justify-center items-center bg-black text-white p-2 rounded-xl'>
                <Wallet/>
            </div>
            <p className='text-xs py-3 text-gray-400'>
                Total Balance
            </p>
            <p className='text-2xl font-bold'>
                $4,66,234
            </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-xl/10 pb-8">
            <div className='w-8 h-8 flex justify-center items-center bg-green-200 text-green-600 p-2 rounded-xl'>
                <TrendingUp/>
            </div>
            <p className='text-xs py-3 text-gray-400'>
                Total Income
            </p>
            <p className='text-2xl font-bold'>
                $4,66,234
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
                $4,66,234
            </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-xl/10 pb-8">
            <div className='w-8 h-8 flex justify-center items-center bg-blue-200 text-blue-600 p-2 rounded-xl'>
                <PiggyBank/>
            </div>
            <p className='text-xs py-3 text-gray-400'>
                Savings Rate
            </p>
            <p className='text-2xl font-bold'>
                $4,66,234
            </p>
        </div>
    </div>
}