import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Income Sources
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
          No income yet
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {transactions?.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("DD / MM / YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default IncomeList