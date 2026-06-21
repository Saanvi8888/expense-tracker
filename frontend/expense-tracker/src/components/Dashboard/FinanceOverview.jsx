import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#00b894", "#3b82f6", "#f43f5e"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expenses", amount: totalExpense },
  ];

  return (
    <CustomPieChart
      data={balanceData}
      label="Total Balance"
      totalAmount={`₹${totalBalance}`}
      colors={COLORS}
      showTextAnchor
    />
  );
};

export default FinanceOverview;