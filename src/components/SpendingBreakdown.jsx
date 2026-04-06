import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const dummySpending = [
  { category: "Rent", amount: 18000, color: "#6BB5FF" },
  { category: "Food & Dining", amount: 8500, color: "#E8604A" },
  { category: "Shopping", amount: 12000, color: "#B06BFF" },
  { category: "Travel", amount: 5200, color: "#FFD96B" },
  { category: "Utilities", amount: 3800, color: "#22c55e" },
  { category: "Healthcare", amount: 2900, color: "#f43f5e" },
  { category: "Entertainment", amount: 3100, color: "#fb923c" },
];

const total = dummySpending.reduce((sum, item) => sum + item.amount, 0)

const CustomTooltip = ({active,payload}) =>{
    if(!active || !payload?.length) return null;
    const d = payload[0].payload;
    const percent = ((d.amount/total)*100).toFixed(0);
    return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3"> 
            <p className="text-xs font-semibold text-gray-700">
                {d.category}
            </p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">
                ₹{d.amount.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-gray-400">
                {percent}%
            </p>
        </div>
    )
}
export default function SpendingBreakdown() {
  return (
    <div className="bg-white rounded-2xl shadow-sm mt-8 p-6">
      <div>
        <h3 className="font-bold text-gray-900 text-xl">Spending Breakdown</h3>
        <p className="text-md text-gray-400 mt-0.5">By Category</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={dummySpending}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
          >
            {dummySpending.map((item) => (
              <Cell key={item.category} fill={item.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip/>}/>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-2 mt-4">
        {dummySpending.map((item) => (
          <div
            key={item.category}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: item.color }}
              />
              <span className="text-sm text-gray-600">{item.category}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">
                {((item.amount / total) * 100).toFixed(0)}%
              </span>
              {/* <span className="text-sm font-semibold text-gray-900">
                ₹{item.amount.toLocaleString("en-IN")}
              </span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
