import { apiSlice } from "../../apiSlice";

export const storeDashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoreSummary: builder.query({
      query: ({ duration = "" }) => `reports/today-summary?duration=${duration}`,
      providesTags: ["reports/today-summary"],
    }),

    getStoreRecentInvoices: builder.query({
      query: () => `reports/recent-invoice`,
      providesTags: ["reports/today-summary"],
    }),

    getStoreRecentPurchases: builder.query({
      query: () => `reports/recent-purchase`,
      providesTags: ["reports/today-summary"],
    }),
    getStoreRecentExpenses: builder.query({
      query: () => `reports/recent-expense`,
      providesTags: ["reports/today-summary"],
    }),
    getStoreRecentTransactions: builder.query({
      query: () => `reports/recent-transaction`,
      providesTags: ["reports/today-summary"],
    }),
    getStoreLowStockAlert: builder.query({
      query: () => `reports/low-stock-product`,
      providesTags: ["reports/today-summary"],
    }),
    getTopClients: builder.query({
      query: () => `reports/top-clients`,
      providesTags: ["reports/today-summary"],
    }),
    getTopSellingProducts: builder.query({
      query: () => `reports/top-sell-products`,
      providesTags: ["reports/today-summary"],
    }),
    getSellPurchaseAmount: builder.query({
      query: () => `reports/sells-purchase-amount`,
      providesTags: ["reports/today-summary"],
    }),
    getPaymentSentReceivedAmount: builder.query({
      query: () => `reports/payment-sent-received`,
      providesTags: ["reports/today-summary"],
    }),




  }),
});

export const {
  useGetStoreSummaryQuery,
  useLazyGetStoreSummaryQuery,
  useGetStoreRecentInvoicesQuery,
  useGetStoreRecentPurchasesQuery,
  useGetStoreRecentExpensesQuery,
  useGetStoreRecentTransactionsQuery,
  useGetStoreLowStockAlertQuery,
  useGetTopClientsQuery,
  useGetTopSellingProductsQuery,
  useGetSellPurchaseAmountQuery,
  useGetPaymentSentReceivedAmountQuery,
  
  
} = storeDashboardApiSlice;
