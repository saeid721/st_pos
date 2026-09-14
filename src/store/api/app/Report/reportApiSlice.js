import { apiSlice } from "../../apiSlice";

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReport: builder.query({
      query: () => "report/count",
      providesTags: ["report"],
    }),
    getBalanceSheetReport: builder.query({
      query: () => "reports/balance-sheet",
      providesTags: ["report"],
    }),
    getExpenseReport: builder.query({
      query: ({ categoryID = '', subCategoryID = '', fromDate = '', toDate = '' }) => `reports/expense-report?categoryID=${categoryID}&subCategoryID=${subCategoryID}&fromDate=${fromDate}&toDate=${toDate}`,
      providesTags: ["report"],
    }),
    getSummaryReport: builder.query({
      query: ({ month = '', year = '' }) => `reports/summary?month=${month}&year=${year}`,
      providesTags: ["report"],
    }),
    getInventoryReport: builder.query({
      query: ({ product_category_id = '', product_sub_category_id = '', product_id = '', fromDate = '', toDate = '' }) => `reports/inventory-report?product_category_id=${product_category_id}&product_sub_category_id=${product_sub_category_id}&product_id=${product_id}&fromDate=${fromDate}&toDate=${toDate}`,
      providesTags: ["report"],
    }),

    getSUbscriptionsCountReport: builder.query({
      query: ({ current_month = "", current_year = "", to_date = "", from_date = "" }) => `report/subscriptions-count?current_month=${current_month}&current_year=${current_year}&to_date=${to_date}&from_date=${from_date}`,
      providesTags: ["report"],
    }),
    getProfitLossReport: builder.query({
      query: ({ reportType = '', fromDate = '', toDate = '' }) => `/reports/profit/loss?reportType=${reportType}&fromDate=${fromDate}&toDate=${toDate}`,
      providesTags: ["report"],
    }),


  }),
});

export const {
  useGetReportQuery,
  useGetBalanceSheetReportQuery,
  useGetExpenseReportQuery,
  useGetSummaryReportQuery,
  useGetInventoryReportQuery,
  useGetSUbscriptionsCountReportQuery,
  useGetProfitLossReportQuery,
} = reportApiSlice;