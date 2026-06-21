import React from 'react'

const CustomLegend = ({ payload }) => {
  return (
    <div className='flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4'>
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className='flex items-center gap-1.5'>
          <div
            className='w-2 h-2 rounded-sm shrink-0'
            style={{ backgroundColor: entry.color }}
          />
          <span className='text-[11px] text-slate-400 font-mono'>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default CustomLegend