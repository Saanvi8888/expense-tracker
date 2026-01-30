import React from 'react'
import { LuTrendingUpDown } from "react-icons/lu";
function Authlayout({children}) {
  return (
    <div className='flex  '>
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-3 pb-4 overflow-hidden'>
        {/* <h2 className='text-lg font-medium text-black mb-1'>Expense Tracker</h2> */}
        {children}
      </div>
      <div className=" relative hidden md:flex max-h-screen w-[60vw] bg-slate-700 overflow-hidden">
        <div className="absolute w-[70%] h-40 bg-blue-500/20 rounded-3xl -rotate-12 top-10 left-[-10%] blur-xl"></div>
        <div className="absolute w-[60%] h-32 bg-slate-300/20 rounded-3xl rotate-6 top-20 left-[20%] blur-2xl"></div>
        <div className="absolute w-[80%] h-48 bg-slate-500/20 rounded-3xl -rotate-6 top-28 left-[10%] blur-xl"></div>
        <div className="absolute w-[50%] h-36 bg-slate-200/20 rounded-3xl rotate-12 top-5 left-[40%] blur-3xl"></div>
        <div className="absolute ml-20 flex flex-col justify-center w-full px-20 text-gray-200 top-40">
          <h1 className=" text-5xl font-semibold tracking-tight mb-6 italic ">
            Track. Save. Grow.
          </h1>

          <p className=" text-lg text-white/90 max-w-md mb-12 italic">
            Manage your expenses, understand your spending, and grow your savings.
          </p>


        </div>
        <img
          src='/images/Screenshot 2026-01-29 225214.png' width={600} height={650}
          className='absolute -bottom-0 -left-0 rounded-xl shadow-2xl shadow-amber-50'
        />
      </div>





    </div>
  )
}

export default Authlayout

const StatsInfoCard=({icon,label,value,color})=>{
    return <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 relative z-10'>
        <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>
        <div>
            <h6 className='text-xs text-gray-500 mb-1'>{label}</h6>
            <span className='text-[20px]'>${value}</span>
        </div>
    </div>
}