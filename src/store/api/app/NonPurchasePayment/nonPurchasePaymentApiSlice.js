import { apiSlice } from "../../apiSlice";

export const nonPurchasePaymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNonPurchasePayments: builder.query({
      query: ({ store_id = ''}) => `non-purchase-payments?store_id=${store_id}`,
      providesTags: ["non-purchase-payments"],
    }),
    getNonPurchasePaymentSummaryBySupplier: builder.query({
      query: ({supplier_id = "", branch_id = ""}) => `non-purchase-payments/summary/supplier/${supplier_id}?branch_id=${branch_id}`,
      providesTags: ["non-purchase-payments"],
    }),

    getNonPurchasePaymentsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `non-purchase-payments/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["non-purchase-payments"],
    }),

    getNonPurchasePaymentsById: builder.query({
      query: (id) => `non-purchase-payments/${id}`,
      providesTags: ["non-purchase-payments"],
    }),
    getAccountTransactionByTransactionId: builder.query({
      query: (id) => `account-transactions/${id}`,
      providesTags: ["non-purchase-payments"],
    }),

    createNonPurchasePayments: builder.mutation({
      query: (data) => ({
        url: "non-purchase-payments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["non-purchase-payments"],
    }),

    updateNonPurchasePayments: builder.mutation({
      query: ({ id, data }) => ({
        url: `non-purchase-payments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["non-purchase-payments"],
    }),

    updateNonPurchasePaymentstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `non-purchase-payments/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["non-purchase-payments"],
    }),

    deleteNonPurchasePayments: builder.mutation({
      query: (id) => ({
        url: `non-purchase-payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["non-purchase-payments"],
    }),
  }),
});

export const {
  useGetNonPurchasePaymentsQuery,
  useGetNonPurchasePaymentSummaryBySupplierQuery,
  useGetNonPurchasePaymentsByPaginationQuery,
  useGetNonPurchasePaymentsByIdQuery,
  useGetAccountTransactionByTransactionIdQuery,
  useCreateNonPurchasePaymentsMutation,
  useUpdateNonPurchasePaymentsMutation,
  useUpdateNonPurchasePaymentstatusMutation,
  useDeleteNonPurchasePaymentsMutation,
} = nonPurchasePaymentApi;
