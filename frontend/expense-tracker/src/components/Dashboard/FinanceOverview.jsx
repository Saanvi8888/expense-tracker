
import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#f4afb4", "#94a89a", "#add7f6"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="card h-[420px] flex flex-col mt-6">
      <div className="flex items-center justify-between">
        <h5 className="text-lg mb-10">Your Balance Track</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`Rs.${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
