import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts'

const CustomLineChart = ({ data }) => {

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a2332] border border-emerald-500/20 rounded-xl px-4 py-3">
          <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest font-mono mb-1">
            {payload[0].payload.month}
          </p>
          <p className="text-sm font-bold text-white font-mono">
            ₹{payload[0].payload.amount?.toLocaleString()}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#00b894" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#00b894" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={v => `₹${v >= 1000 ? Math.round(v / 1000) + 'K' : v}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#00b894"
            fill="url(#incomeGradient)"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#00b894", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#00b894", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart
