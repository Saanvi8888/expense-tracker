import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30daysExpenses = ({data}) => {
    const [chartData,setChartData] = useState([]);

    useEffect(()=>{
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
        return ()=>{};
    },[data]);
  return (
    <div className='card col-span-1'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Last 30 Days Expenses</h5>
      </div>
      {chartData?.length > 0 ? (
        <CustomBarChart data={chartData} />
      ) : (
        <p className="text-sm text-gray-500">No data available yet.</p>
      )}
      
    </div>
  )
}

export default Last30daysExpenses
