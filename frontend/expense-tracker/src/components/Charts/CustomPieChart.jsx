import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";
const COLORS = [
  "#f2b5b8", 
  "#9fb6a3", 
  "#b6d4f2", 
  "#f3d4b3", 
  "#d7c2e3", 
  "#bfe3da", 
  "#edc7d8", 
  "#dbe8d4", 
  "#fce6ec", 
  "#e6effa", 
  "#f7eadf", 
  "#e1d9f2", 
];



const CustomPieChart = ({
  data = [],
  label,
  totalAmount,
  colors = [],
  showTextAnchor,
}) => {
  
  return (
    

    <div className="w-full h-[270px] mt-5">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"   
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={80}
          >
            {data.length > 0 &&
              data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />


              ))}
          </Pie>

          <Tooltip content={CustomTooltip} />
          <Legend content={CustomLegend}  />
          
          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="50%"
                dy={-25}
                textAnchor="middle"
                fill="black"
                fontSize="14px"
              >
                {label}
              </text>
              <text
                x="50%"
                y="50%"
                dy={8}
                textAnchor="middle"
                fill="#333"
                fontWeight="700"
              >
                {totalAmount}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
