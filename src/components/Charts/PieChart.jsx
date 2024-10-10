import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { phoneDataset } from "../../data/data";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6347",
  "#6A5ACD",
];

const PieChartComponent = () => {
  // Filter out phones with offers
  const phonesWithOffers = phoneDataset.filter((phone) => phone.offer);

  // Prepare data for the chart
  const chartData = phonesWithOffers.map((phone) => ({
    name: phone.name,
    price: phone.offer.offerPrice,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="price"
          nameKey="name"
          outerRadius="80%"
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
