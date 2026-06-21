import React from 'react'
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,Cell} from 'recharts'
const BAR_COLORS = ['#00b894', '#3b82f6', '#f43f5e', '#f97316', '#a855f7']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-[#1a2332] border border-[#00b89433] rounded-xl px-4 py-3">
      <p className="text-[#00b894] text-[10px] font-bold uppercase tracking-widest mb-2 font-mono">
        {label}
      </p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm text-white/60">
          {entry.name}:{' '}
          <span className="text-white font-bold font-mono">
            ₹{entry.value.toLocaleString()}
          </span>
        </p>
      ))}
    </div>
  )
}

const CustomBarChart = ({ data = [] }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        {/* <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          
        </h3> */}
        
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="35%">
          <CartesianGrid vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={v => `₹${v >= 1000 ? Math.round(v / 1000) + 'K' : v}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#00b89410', radius: 6 }} />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]} maxBarSize={44}>
            {data.map((entry, index) => (
              <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap gap-3 mt-3">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-sm"
              style={{ background: BAR_COLORS[index % BAR_COLORS.length] }}
            />
            <span className="text-[11px] text-slate-400">{entry.category}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomBarChart