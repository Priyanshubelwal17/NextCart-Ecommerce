"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Sample data - we'll connect this to real order data later
const sampleData = [
  { name: "Jan", total: Math.floor(Math.random() * 1000) + 200 },
  { name: "Feb", total: Math.floor(Math.random() * 1000) + 200 },
  { name: "Mar", total: Math.floor(Math.random() * 1000) + 200 },
  { name: "Apr", total: Math.floor(Math.random() * 1000) + 200 },
  { name: "May", total: Math.floor(Math.random() * 1000) + 200 },
  { name: "Jun", total: Math.floor(Math.random() * 1000) + 200 },
];

function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={sampleData}>
        <XAxis
          dataKey="name"
          stroke="#88888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#88888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          cursor={{ fill: "rgba(100,100,100,0.2)" }}
          contentStyle={{ backgroundColor: `#333`, border: "none" }}
        />
        <Bar dataKey="total" fill="#06b6d4" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SalesChart;
