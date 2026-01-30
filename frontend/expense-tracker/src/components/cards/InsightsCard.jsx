import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuLightbulb } from "react-icons/lu";

const InsightsCard = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_INSIGHTS);
      if (response.data?.insights) {
        setInsights(response.data.insights);
      }
    } catch (error) {
      console.error("Failed to fetch insights", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className=" p-6 rounded-2xl shadow-md bg-white border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <LuLightbulb className="text-xl" />
          Smart Insights
        </h2>
        
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading insights...</p>
      ) : (
        <div className="space-y-2">
          {insights?.length ? (
            insights.map((ins, index) => (
              <div key={index} className="text-sm text-gray-700">
                • {ins.message}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No insights available yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InsightsCard;
