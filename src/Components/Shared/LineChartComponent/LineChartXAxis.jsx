import React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: "January", desktop: 10 },
  { month: "February", desktop: 50 },
  { month: "March", desktop: 40 },
  { month: "April", desktop: 80 },
  { month: "May", desktop: 90 },
  { month: "June", desktop: 120 },
];

export function LineChartXAxis() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Line
            dataKey="desktop"
            type="linear"
            stroke="#8884d8"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
