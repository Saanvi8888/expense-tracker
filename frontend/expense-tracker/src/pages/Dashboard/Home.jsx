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
import Last30daysExpenses from "../../components/Dashboard/Last30daysExpenses";

import { addThousandsSeparator } from "../../utils/helper";
import BudgetProgress from "../../components/Dashboard/BudgetProgress";

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

  const has30DaysData = dashboardData?.last30daysExpenses?.transactions?.length > 0;

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="px-4 md:px-6 py-6 bg-slate-50 min-h-screen space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-emerald-500"
            index="0"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-blue-500"
            index="1"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-rose-500"
            index="2"
          />
        </div>

        <InsightsCard />
        <BudgetProgress />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
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

        {has30DaysData && (
          <Last30daysExpenses
            data={dashboardData.last30daysExpenses.transactions}
          />
        )}

      </div>
    </DashboardLayout>
  );
};

export default Home;