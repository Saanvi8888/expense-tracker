import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30daysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
  }, [data]);

  return chartData?.length > 0 ? (
    <div>
      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">30 Days Expense</h3>
      <CustomBarChart data={chartData} />
    </div>
  ) : (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center justify-center h-[220px]">
      <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">
        No data available
      </p>
    </div>
  );
};

export default Last30daysExpenses;