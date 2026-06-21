import React from "react";
import { LuTrendingUp, LuTrendingDown, LuTrash, LuSmile } from "react-icons/lu";

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete }) => {
  const isIncome = type === "income"

  return (
    <div className="group flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all">
      <div className={`w-9 h-9 flex items-center justify-center rounded-lg shrink-0 text-sm ${isIncome ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-400"}`}>
        {icon || <LuSmile />}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">{title}</p>
        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{date}</p>
      </div>

      <div className="flex items-center gap-2">
        {!hideDeleteBtn && (
          <button
            onClick={onDelete}
            className="text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          >
            <LuTrash size={15} />
          </button>
        )}

        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${isIncome ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
          {isIncome ? <LuTrendingUp size={12} /> : <LuTrendingDown size={12} />}
          <span>{isIncome ? "+" : "-"}₹{amount.toLocaleString()}</span>
        </div>
      </div>

    </div>
  )
}

export default TransactionInfoCard