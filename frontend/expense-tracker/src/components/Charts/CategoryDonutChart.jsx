import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";


const COLORS = [
  "#f2a1a9",
  "#8faea0",
  "#9ecdf2",
  "#f1c6a8",
  "#b9a6d3",
  "#9fd3c7",
  "#fde2e4",
];

const CategoryDonutChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(API_PATHS.EXPENSE.GET_CATEGORY_WISE);
      const formatted = Object.keys(res.data).map((key) => ({
        name: key,
        value: res.data[key],
      }));
      setData(formatted);
    };
    fetchData();
  }, []);

  return (
    <div className=" h-[400px] card ">
      <h2 className="text-lg  mb-7">Category-wise Spending</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={CustomTooltip}/>
          <Legend content={CustomLegend}/>

          
            <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="black"
              fontSize="17px"
            >
              Category wise
              <tspan x="50%" dy="20">
                chart
              </tspan>
            </text>
          </>

          
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryDonutChart;
