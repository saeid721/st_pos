import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Info, Calendar, ShoppingCart, RefreshCcw, TrendingUp, TrendingDown, Wallet, Send,
  Receipt, ArrowLeftRight, FileText, CreditCard, ArrowUpDown, PieChart as PieChartIcon,
  Activity, Users, BarChart3, Repeat, ChevronDown,
} from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';
import StatCard from './StatCard';
import { useGetPaymentSentReceivedAmountQuery, useGetSellPurchaseAmountQuery, useGetStoreLowStockAlertQuery, useGetStoreRecentExpensesQuery, useGetStoreRecentInvoicesQuery, useGetStoreRecentPurchasesQuery, useGetStoreRecentTransactionsQuery, useGetStoreSummaryQuery, useGetTopClientsQuery, useGetTopSellingProductsQuery } from '../../../../store/api/app/StoreDashboard/storeDashboardApiSlice';
import StoreRecentActivity from './StoreRecentActivity';
import StoreLowStockAlert from './StoreLowStockAlert';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-slate-100 text-sm">
        <p className="font-semibold text-slate-800">{data.product_name}</p>
        <p className="text-slate-500">{data.percentage_of_total_sales}%</p>
      </div>
    );
  }
  return null;
};

const CustomSalesPurchaseTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-slate-100 rounded-xl shadow-lg">
        <p className="font-semibold text-slate-900">{`${label} ${new Date().getFullYear()}`}</p>
        <div className="mt-2 space-y-1 text-sm">
          <p className="text-emerald-600">
            <span className="font-medium">Sales:</span> ৳{data.sales.toLocaleString()}
          </p>
          <p className="text-sky-600">
            <span className="font-medium">Purchases:</span> ৳{data.purchases.toLocaleString()}
          </p>
          <p className={`font-medium ${data.net_profit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            <span>Net Profit:</span> ৳{data.net_profit.toLocaleString()}
          </p>
          <div className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100">
            <p>Sales Count: {data.sales_count}</p>
            <p>Purchase Count: {data.purchase_count}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const HEADER_ACCENTS = {
  violet: "bg-violet-50 text-violet-600",
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  sky: "bg-sky-50 text-sky-600",
  rose: "bg-rose-50 text-rose-600",
  amber: "bg-amber-50 text-amber-600",
};

const SectionHeader = ({ icon: Icon, accent = "slate", title, info }) => (
  <div className="flex items-center gap-2 mb-3">
    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${HEADER_ACCENTS[accent] || "bg-slate-100 text-slate-600"}`}>
      <Icon size={14} strokeWidth={2.2} />
    </span>
    <h3 className="text-[13px] sm:text-[15px] font-bold text-slate-800 tracking-tight">{title}</h3>
    {info && <Info size={14} className="text-slate-300 ml-auto" />}
  </div>
);

// Card -> route map. Adjust `to` values if any differ from your actual storeRoutes.jsx paths.
const STAT_LINKS = [
  { key: 'totalPurchaseAmount', title: 'Purchase', icon: ShoppingCart, accent: 'sky', to: '/store/dashboard/purchases' },
  { key: 'totalPurchaseReturnAmount', title: 'Purchase Return', icon: RefreshCcw, accent: 'teal', to: '/store/dashboard/returns-list' },
  { key: 'totalSalesAmount', title: 'Sales', icon: TrendingUp, accent: 'violet', to: '/store/dashboard/invoices-list' },
  { key: 'salesReturnAmount', title: 'Sales Return', icon: TrendingDown, accent: 'rose', to: '/store/dashboard/invoice-returns' },
  { key: 'clientPaymentAmount', title: 'Client Payment', icon: Wallet, accent: 'emerald', to: '/store/dashboard/invoice' },
  { key: 'supplierPaymentAmount', title: 'Supplier Payment', icon: Send, accent: 'fuchsia', to: '/store/dashboard/purchase' },
  { key: 'totalExpenseAmount', title: 'Expense', icon: Receipt, accent: 'amber', to: '/store/dashboard/expenses' },
  { key: 'totalBalanceTransferAmount', title: 'Balance Transfers', icon: ArrowLeftRight, accent: 'slate', to: '/store/dashboard/balance-transfers' },
];

const ACTIVE_TAB_COLOR = {
  indigo: 'text-indigo-600',
  emerald: 'text-emerald-600',
  violet: 'text-violet-600',
  amber: 'text-amber-600',
};

const StoreDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [activeTab, setActiveTab] = useState('Invoices');
  const [monthlySellsPurchaseAmounts, setMonthlySellsPurchaseAmounts] = useState([]);
  const [paymentSentReceivedAmountsData, setPaymentSentReceivedAmountsData] = useState([]);

  const { data: summaryReport, isLoading: isSummaryReportLoading } = useGetStoreSummaryQuery({
    duration: selectedPeriod
  });

  const { data: invoiceData, isLoading: isInvoiceDataLoading } = useGetStoreRecentInvoicesQuery()
  const { data: purchaseData, isLoading: isPurchaseDataLoading } = useGetStoreRecentPurchasesQuery()
  const { data: expensesData, isLoading: isExpensesDataLoading } = useGetStoreRecentExpensesQuery()
  const { data: transactionsData, isLoading: isTransactionsDataLoading } = useGetStoreRecentTransactionsQuery()
  const { data: lowStockProducts, isLoading: isLowStockProductsDataLoading } = useGetStoreLowStockAlertQuery()
  const { data: topClients } = useGetTopClientsQuery()
  const { data: topSellingProducts } = useGetTopSellingProductsQuery()
  const { data: sellPurchaseAmounts } = useGetSellPurchaseAmountQuery()
  const { data: paymentSentReceivedAmounts } = useGetPaymentSentReceivedAmountQuery()

    const topSellingProductsData = topSellingProducts?.data?.top_selling_products || [];
  const topClientsData = topClients?.data || [];
  const maxClientAmount = Math.max(1, ...topClientsData.map((c) => c.totalAmount || 0));

  useEffect(() => {
    const transformedData = sellPurchaseAmounts?.data?.monthly_data.map(month => ({
      month: month.month,
      sales: month.sales_amount,
      purchases: month.purchase_amount,
      sales_count: month.sales_count,
      purchase_count: month.purchase_count,
      net_profit: month.net_profit
    }));

    setMonthlySellsPurchaseAmounts(transformedData);
  }, [sellPurchaseAmounts]);

  useEffect(() => {
    const transformedData = paymentSentReceivedAmounts?.data?.monthlyBreakdown.map(item => ({
      month: item.month.substring(0, 3),
      sent: item.paymentSent,
      received: item.paymentReceived
    }));
    setPaymentSentReceivedAmountsData(transformedData);
  }, [paymentSentReceivedAmounts]);

  const backendUrl = import.meta.env.VITE_LOCAL_API_URL;

  const PIE_COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#F43F5E", "#0EA5E9"];

  const tabs = [
    { key: 'Invoices', label: 'Invoices', icon: FileText, color: 'indigo' },
    { key: 'Purchases', label: 'Purchases', icon: ShoppingCart, color: 'emerald' },
    { key: 'Expenses', label: 'Expenses', icon: CreditCard, color: 'violet' },
    { key: 'Transactions', label: 'Transactions', icon: ArrowUpDown, color: 'amber' }
  ];

  const getTabClasses = (tab, isActive) =>
    `relative shrink-0 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all duration-200 ${
      isActive ? `bg-white shadow-sm ${ACTIVE_TAB_COLOR[tab.color]}` : 'text-slate-500 hover:text-slate-700'
    }`;

  const periodLabel = {
    today: "Today",
    week: "Last 7 Days",
    month: "This Month",
    year: "This Year",
  }[selectedPeriod] || "Today";

  return (
    <div className="from-slate-50 to-indigo-50/30 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 text-slate-700">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md">
            <Calendar size={14} />
          </span>
          <span className="font-bold text-sm sm:text-base tracking-tight text-slate-800">{periodLabel} Summary</span>
        </div>
        <div className="relative w-full sm:w-auto">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-full sm:w-auto appearance-none border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 bg-white text-xs sm:text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="today">Today</option>
            <option value="week">Last 7 days</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 mb-4">
        {STAT_LINKS.map((stat) => (
          <StatCard
            key={stat.key}
            title={stat.title}
            value={summaryReport?.data?.[stat.key]?.toFixed(2)}
            icon={stat.icon}
            accent={stat.accent}
            to={stat.to}
          />
        ))}
      </div>

      {/* Row 1: Top Selling Products + Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
        <div className="lg:col-span-1 bg-white p-3 sm:p-4 rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)]">
          <SectionHeader icon={PieChartIcon} accent="violet" title={`Top Selling Products (${new Date().getFullYear()})`} />
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full max-w-[180px] h-44 sm:w-44 sm:h-44 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topSellingProductsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={72}
                    paddingAngle={2}
                    cornerRadius={4}
                    dataKey="percentage_of_total_sales"
                  >
                    {topSellingProductsData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#fff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full sm:w-auto grid grid-cols-1 gap-1.5">
              {topSellingProductsData?.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                  />
                  <span className="text-xs sm:text-sm text-slate-600 truncate">{item.product_name}</span>
                  <span className="text-[11px] font-semibold text-slate-400 ml-auto">{item.percentage_of_total_sales}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-3 sm:p-4 rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)]">
          <SectionHeader icon={Activity} accent="indigo" title="Recent Activities" />

          <div className="inline-flex items-center gap-1 p-0.5 bg-slate-100 rounded-xl mb-3 max-w-full overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={getTabClasses(tab, activeTab === tab.key)}
                >
                  <Icon size={13} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <StoreRecentActivity activeTab={activeTab} invoiceData={invoiceData} purchaseData={purchaseData} expensesData={expensesData} transactionsData={transactionsData} />
        </div>
      </div>

            {/* Row 2: Payment Sent vs Received + Top 5 Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
        <div className="lg:col-span-2 bg-white p-3 sm:p-4 rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)]">
          <SectionHeader icon={Repeat} accent="rose" title={`Payment Sent vs Payment Received (${new Date().getFullYear()})`} info />
          <div className="h-48 sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={paymentSentReceivedAmountsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="sent" stroke="#F43F5E" strokeWidth={2} dot={{ r: 2.5 }} name="Sent" />
                <Line type="monotone" dataKey="received" stroke="#10B981" strokeWidth={2} dot={{ r: 2.5 }} name="Received" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white p-3 sm:p-4 rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)]">
          <SectionHeader icon={Users} accent="emerald" title={`Top 5 Clients (${new Date().getFullYear()})`} info />

          {topClientsData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-slate-400">
              <Users size={22} className="mb-2" />
              <p className="text-xs">No client data yet</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {topClientsData.map((client, index) => {
                const barWidth = Math.max(6, Math.round(((client.totalAmount || 0) / maxClientAmount) * 100));
                const RANK_STYLES = [
                  "bg-gradient-to-br from-amber-400 to-orange-500",
                  "bg-gradient-to-br from-slate-300 to-slate-400",
                  "bg-gradient-to-br from-amber-600 to-amber-700",
                ];
                const rankStyle = RANK_STYLES[index] || "bg-gradient-to-br from-indigo-400 to-violet-500";

                return (
                  <div
                    key={index}
                    className="group relative flex items-center gap-2.5 rounded-lg p-2 hover:bg-emerald-50/50 transition-colors duration-200"
                  >
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full ${rankStyle} text-white text-[10px] font-bold flex items-center justify-center shadow-sm`}>
                      {index + 1}
                    </span>

                    <div className="relative w-8 h-8 flex-shrink-0">
                      {client?.client?.photo ? (
                        <img
                          src={`${backendUrl}${client?.client?.photo}`}
                          alt="Client"
                          className="w-full h-full object-cover rounded-full border border-white shadow-sm"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center rounded-full bg-slate-200 text-[8px] text-slate-500">
                          {client?.client?.name?.charAt(0) || "?"}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-xs font-semibold text-slate-700 truncate">
                          {client?.client?.name}
                        </h2>
                        <span className="text-xs font-bold text-emerald-600 tabular-nums flex-shrink-0">
                          ৳ {client.totalAmount?.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">{client.totalSales} sales</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Row 3: Stock Alert + Sales vs Purchases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-3">
        <StoreLowStockAlert lowStockProducts={lowStockProducts} />

        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-12px_rgba(15,23,42,0.18)]">
          <SectionHeader icon={BarChart3} accent="sky" title={`Sales vs Purchases (${new Date().getFullYear()})`} info />
          <div className="h-48 sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySellsPurchaseAmounts} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(value) => `৳${value.toLocaleString()}`} tick={{ fontSize: 10 }} />
                <Tooltip content={<CustomSalesPurchaseTooltip />} />
                <Bar dataKey="purchases" fill="#0EA5E9" name="Purchases" radius={[4, 4, 0, 0]} maxBarSize={26} />
                <Bar dataKey="sales" fill="#10B981" name="Sales" radius={[4, 4, 0, 0]} maxBarSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;