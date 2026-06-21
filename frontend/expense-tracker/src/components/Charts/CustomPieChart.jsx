import React from "react";
import {PieChart,Pie,Cell,Tooltip,ResponsiveContainer,Legend} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const COLORS = [
  "#00b894",
  "#3b82f6", 
  "#f43f5e",
  "#f97316",
  "#a855f7",
  "#06b6d4",
  "#eab308",
  "#ec4899",
];

const CustomPieChart = ({ data = [], label, totalAmount, colors = [], showTextAnchor }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          {label || "Category Breakdown"}
        </h3>
       
      </div>

      <div className="w-full h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={68}
              strokeWidth={0}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={(colors[index] || COLORS[index % COLORS.length])}
                />
              ))}
            </Pie>

            <Tooltip content={CustomTooltip} />
            <Legend content={CustomLegend} />

            {showTextAnchor && (
              <>
                <text
                  x="50%"
                  y="43%"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="11px"
                  fontFamily="monospace"
                  letterSpacing="0.08em"
                >
                  {label?.toUpperCase()}
                </text>
                <text
                  x="50%"
                  y="53%"
                  textAnchor="middle"
                  fill="#1a2332"
                  fontSize="18px"
                  fontWeight="800"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  {totalAmount}
                </text>
              </>
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomPieChart;