import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import dayjs from 'dayjs'
import TransactionInfoCard from '../cards/TransactionInfoCard'

const RecentTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          All Transactions
        </h5>
        <button
          onClick={onSeeMore}
          className="flex items-center gap-1 text-xs font-bold text-emerald-500 font-mono cursor-pointer hover:text-emerald-600 transition-colors"
        >
          SEE ALL <LuArrowRight className="text-sm" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {transactions.length === 0 ? (
          <p className="text-xs text-slate-400 font-mono py-4 text-center">
            NO TRANSACTIONS YET
          </p>
        ) : (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              date={dayjs(item.date).format("DD / MM / YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn={false}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default RecentTransactions