import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import dayjs from 'dayjs'
import TransactionInfoCard from '../cards/TransactionInfoCard'

const RecentTransactions = ({ transactions = [] ,onSeeMore}) => {
  return (
    <div className='card min-h-[420px]'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>All Transactions</h5>
        <button className='card-btn' onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions.length === 0 ? (
          <>
            <p className='text-sm text-gray-500'>No data available yet.</p>
          </>
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
