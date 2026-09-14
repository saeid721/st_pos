import { apiSlice } from "../../apiSlice";

export const purchasePaymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPurchasePayments: builder.query({
      query: ({ store_id = ''}) => `purchase-payments?store_id=${store_id}`,
      providesTags: ["purchase-payments"],
    }),
    getPurchasePaymentSummaryBySupplier: builder.query({
      query: ({supplier_id="", branch_id=""}) => `purchase-payments/summary/supplier/${supplier_id}?branch_id=${branch_id}`,
      providesTags: ["purchase-payments"],
    }),
    getAvailableBalanceByAccount: builder.query({
      query: ({ account_id }) => `purchase-payments/${account_id}/available-balance`,
      providesTags: ["purchase-payments"],
    }),

    getPurchasePaymentsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `purchase-payments/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["purchase-payments"],
    }),

    getPurchasePaymentsById: builder.query({
      query: (id) => `purchase-payments/${id}`,
      providesTags: ["purchase-payments"],
    }),
    getAccountTransactionByTransactionId: builder.query({
      query: (id) => `account-transactions/${id}`,
      providesTags: ["purchase-payments"],
    }),

    createPurchasePayments: builder.mutation({
      query: (data) => ({
        url: "purchase-payments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["purchase-payments"],
    }),

    updatePurchasePayments: builder.mutation({
      query: ({ id, data }) => ({
        url: `purchase-payments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["purchase-payments"],
    }),

    updatePurchasePaymentstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `purchase-payments/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["purchase-payments"],
    }),

    deletePurchasePayments: builder.mutation({
      query: (id) => ({
        url: `purchase-payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["purchase-payments"],
    }),
  }),
});

export const {
  useGetPurchasePaymentsQuery,
  useGetPurchasePaymentSummaryBySupplierQuery,
  useGetAvailableBalanceByAccountQuery,
  useGetPurchasePaymentsByPaginationQuery,
  useGetPurchasePaymentsByIdQuery,
  useGetAccountTransactionByTransactionIdQuery,
  useCreatePurchasePaymentsMutation,
  useUpdatePurchasePaymentsMutation,
  useUpdatePurchasePaymentstatusMutation,
  useDeletePurchasePaymentsMutation,
} = purchasePaymentApi;
