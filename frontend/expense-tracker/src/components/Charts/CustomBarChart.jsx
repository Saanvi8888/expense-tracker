import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const getBarColor = (index) =>
  index % 2 === 0 ? '#334155' : '#94a3b8'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { category, amount } = payload[0].payload

    return (
      <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
        <p className='text-xs font-semibold text-slate-900 mb-1'>
          {category}
        </p>
        <p className='text-sm text-gray-600'>
          Amount:{' '}
          <span className='font-medium text-gray-900'>
            ₹{amount.toLocaleString()}
          </span>
        </p>
      </div>
    )
  }
  return null
}

const CustomBarChart = ({ data = [] }) => {
  return (
    <div className='bg-white mt-6'>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke='none' />

          <XAxis
            dataKey='category'
            tick={{ fontSize: 12, fill: '#555' }}
            stroke='none'
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#555' }}
            stroke='none'
            tickFormatter={(value) => `₹${value.toLocaleString()}`}
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey='amount' radius={[6, 6, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
