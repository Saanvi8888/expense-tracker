import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import dayjs from "dayjs";

const statusColors = {
  ok:          { bar: "bg-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50" },
  warning:     { bar: "bg-amber-400",   text: "text-amber-600",   bg: "bg-amber-50"   },
  over:        { bar: "bg-rose-500",    text: "text-rose-600",    bg: "bg-rose-50"    },
  unbudgeted:  { bar: "bg-slate-300",   text: "text-slate-400",   bg: "bg-slate-50"   },
};

const BudgetProgress = () => {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentMonth = dayjs().format("YYYY-MM");

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        API_PATHS.BUDGET.GET_SUMMARY(currentMonth)
      );
      setSummary(res.data.summary || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (!loading && summary.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Monthly Budget
        </h3>
        <span className="text-xs text-slate-400 font-mono">
          {dayjs().format("MMM YYYY")}
        </span>
      </div>

      {loading ? (
        <p className="text-xs text-slate-400 font-mono">Loading...</p>
      ) : (
        <div className="space-y-4">
          {summary.map((item) => {
            const colors = statusColors[item.status] || statusColors.ok;
            const pct = Math.min(item.percentage ?? 100, 100);

            return (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-700">
                      {item.category}
                    </span>
                    {item.status === "over" && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                        OVER BUDGET
                      </span>
                    )}
                    {item.status === "warning" && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                        80%+
                      </span>
                    )}
                    {item.status === "unbudgeted" && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">
                        NO BUDGET SET
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold font-mono ${colors.text}`}>
                      ₹{item.spent.toLocaleString()}
                    </span>
                    {item.budgeted && (
                      <span className="text-xs text-slate-400 font-mono">
                        {" "}/ ₹{item.budgeted.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
                    style={{ width: `${item.status === "unbudgeted" ? 100 : pct}%` }}
                  />
                </div>

                {item.budgeted && item.status !== "over" && (
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">
                    ₹{item.remaining.toLocaleString()} remaining
                  </p>
                )}
                {item.status === "over" && (
                  <p className={`text-[10px] mt-1 font-mono font-bold ${colors.text}`}>
                    ₹{Math.abs(item.remaining).toLocaleString()} over limit
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BudgetProgress;