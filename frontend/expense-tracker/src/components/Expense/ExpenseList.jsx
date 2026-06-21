import React from 'react'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import moment from 'moment'
import { LuDownload } from 'react-icons/lu'

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          All Expenses
        </h5>
        <button
          onClick={onDownload}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-emerald-500 font-mono transition-colors cursor-pointer"
        >
          <LuDownload size={14} />
          DOWNLOAD
        </button>
      </div>

      {transactions?.length === 0 ? (
        <p className="text-xs text-slate-400 font-mono uppercase tracking-wider text-center py-8">
          No expenses yet
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {transactions?.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("DD MM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense._id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ExpenseList