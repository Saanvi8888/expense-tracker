import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import {LuLightbulb,LuTriangleAlert,LuWallet,LuChevronDown} from "react-icons/lu";

const InsightsCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(null);

  const fetchInsights = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.AI.GET_INSIGHTS);
      if (response.data?.insights) {
        setData(response.data.insights);
      }
    } catch (error) {
      console.error("Failed to fetch AI insights", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const toggle = (key) => {
    setOpen(open === key ? null : key);
  };

  const Card = ({ title, icon, color, sectionKey, children }) => {
    const isOpen = open === sectionKey;

    return (
      <div
        className={`rounded-xl border transition-all duration-200 cursor-pointer ${isOpen ? "bg-white shadow-sm" : "bg-slate-50 hover:bg-slate-100"} border-slate-100`}
        onClick={() => toggle(sectionKey)}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className={`text-${color}-500`}>{icon}</div>
            <h3 className="font-semibold text-slate-800 text-sm">
              {title}
            </h3>
          </div>

          <LuChevronDown className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}/>
        </div>
        
        {isOpen && (
          <div className="px-4 pb-4 space-y-2">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <LuLightbulb size={16} />
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          AI Financial Insights
        </h2>
      </div>

      {loading && (
        <p className="text-sm text-slate-500">
          Generating AI insights...
        </p>
      )}

      {!loading && !data && (
        <p className="text-sm text-slate-500">
          No insights available.
        </p>
      )}

      {data && (
        <>
          <Card
            title="Insights"
            icon={<LuLightbulb />}
            color="slate"
            sectionKey="insights"
          >
            {data.insights?.map((item, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-lg p-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </Card>

          <Card
            title="Recommendations"
            icon={<LuWallet />}
            color="emerald"
            sectionKey="recommendations"
          >
            {data.recommendations?.map((item, i) => (
              <div key={i} className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </Card>

          {data.warning && (
            <Card
              title="Warning"
              icon={<LuTriangleAlert />}
              color="amber"
              sectionKey="warning"
            >
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm text-slate-700">
                {data.warning}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default InsightsCard;