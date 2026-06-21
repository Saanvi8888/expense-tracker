import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper'
import CustomLineChart from '../Charts/CustomLineChart'

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions)
    setChartData(result)
  }, [transactions])

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Expense Overview
          </h5>
          <p className="text-xs text-slate-400 mt-1">
            Track spending trends over time
          </p>
        </div>

        <button
          onClick={onExpenseIncome}
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors"
        >
          <LuPlus className="text-sm" />
          Add Expense
        </button>
      </div>

      {chartData.length > 0 ? (
        <CustomLineChart data={chartData} />
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
            No expense data available yet
          </p>
        </div>
      )}
    </div>
  )
}

export default ExpenseOverview