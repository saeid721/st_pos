import React from 'react';
import { MoreHorizontal, Info, Calendar, AlertTriangle, FileText, ShoppingCart, CreditCard, ArrowUpDown } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';


const CustomSalesPurchaseTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900">{`${label} ${new Date().getFullYear()}`}</p>
        <div className="mt-2 space-y-1">
          <p className="text-green-600">
            <span className="font-medium">Sales:</span> ৳{data.sales.toLocaleString()}
          </p>
          <p className="text-blue-600">
            <span className="font-medium">Purchases:</span> ৳{data.purchases.toLocaleString()}
          </p>
          <p className={`font-medium ${data.net_profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <span>Net Profit:</span> ৳{data.net_profit.toLocaleString()}
          </p>
          <div className="text-sm text-gray-500 mt-2 pt-2 border-t">
            <p>Sales Count: {data.sales_count}</p>
            <p>Purchase Count: {data.purchase_count}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const StoreDashboardBarChart = ({}) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlySellsPurchaseAmounts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `৳${value.toLocaleString()}`} />
          <Tooltip content={<CustomSalesPurchaseTooltip />} />
          <Bar dataKey="purchases" fill="#3B82F6" name="Purchases" />
          <Bar dataKey="sales" fill="#10B981" name="Sales" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StoreDashboardBarChart;