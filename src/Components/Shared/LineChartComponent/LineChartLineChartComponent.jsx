import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available for the chart.</p>;
  }

  // Get all unique plan keys dynamically, excluding 'name'
  const planKeys = [
    ...new Set(
      data.flatMap((item) => Object.keys(item).filter((key) => key !== "name"))
    ),
  ];

  // Preprocess data to fill in missing values
  const processedData = data.map((item) => {
    const newItem = { ...item }; // Copy the original item
    planKeys.forEach((key) => {
      if (newItem[key] === undefined) {
        newItem[key] = 0; // Fill with 0 if the key does not exist
      }
    });
    return newItem;
  });

  console.log("Processed data:", processedData); // Log the processed data

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={processedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Map through the plan keys to create Line components dynamically */}
          {planKeys.map((planKey, index) => (
            <Line
              key={planKey}
              type="monotone"
              dataKey={planKey}
              stroke={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
              activeDot={{ r: 8 }}
              strokeWidth={3}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
