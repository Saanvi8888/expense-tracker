import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

import InfoCard from "../../components/cards/InfoCard";
import InsightsCard from "../../components/cards/InsightsCard";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30daysExpenses from "../../components/Dashboard/Last30daysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import CategoryDonutChart from "../../components/Charts/CategoryDonutChart";

import { addThousandsSeparator } from "../../utils/helper";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      setDashboardData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);


  const hasExtraData =
    dashboardData?.last30daysExpenses?.transactions?.length > 0 ||
    dashboardData?.last60daysIncome?.transactions?.length > 0;

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="p-6 bg-gray-200 min-h-screen">

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
            index="0"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-400"
            index="1"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-rose-400"
            index="2"
          />
        </div>

        
        <div className="mt-4">
          <InsightsCard />
        </div>

        
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <RecentTransactions
              transactions={dashboardData?.recentTransactions || []}
              onSeeMore={() => navigate("/expense")}
            />
          </div>

          <div className="lg:col-span-2">
            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpenses || 0}
            />
          </div>
        </div>

        
        {hasExtraData && (
          <>
            
            <div className="mt-4">
              <Last30daysExpenses
                data={dashboardData?.last30daysExpenses?.transactions || []}
              />
            </div>

           
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
              <div className="lg:col-span-5">
                <ExpenseTransactions
                  transactions={
                    dashboardData?.last30daysExpenses?.transactions || []
                  }
                  onSeeMore={() => navigate("/expense")}
                />
              </div>

              <div className="lg:col-span-5">
                <CategoryDonutChart />
              </div>
            </div>

            
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
              <div className="lg:col-span-5">
                <RecentIncomeWithChart
                  data={
                    dashboardData?.last60daysIncome?.transactions?.slice(0, 4) ||
                    []
                  }
                  totalIncome={dashboardData?.totalIncome || 0}
                />
              </div>

              <div className="lg:col-span-5">
                <RecentIncome
                  transactions={
                    dashboardData?.last60daysIncome?.transactions || []
                  }
                  onSeeMore={() => navigate("/income")}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;
