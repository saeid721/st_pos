import { apiSlice } from "../../apiSlice";

export const nonInvoicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNonInvoicePayments: builder.query({
      query: ({ store_id = ''}) => `non-invoice-payments?store_id=${store_id}`,
      providesTags: ["non-invoice-payments"],
    }),
    getNonInvoicePaymentSummaryByClient: builder.query({
      query: ({client_id = "", branch_id = ""}) => `non-invoice-payments/summary/client/${client_id}?branch_id=${branch_id}`,
      providesTags: ["non-invoice-payments"],
    }),

    getNonInvoicePaymentsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `non-invoice-payments/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["non-invoice-payments"],
    }),

    getNonInvoicePaymentsById: builder.query({
      query: (id) => `non-invoice-payments/${id}`,
      providesTags: ["non-invoice-payments"],
    }),
    getAccountTransactionByTransactionId: builder.query({
      query: (id) => `account-transactions/${id}`,
      providesTags: ["non-invoice-payments"],
    }),

    createNonInvoicePayments: builder.mutation({
      query: (data) => ({
        url: "non-invoice-payments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["non-invoice-payments"],
    }),

    updateNonInvoicePayments: builder.mutation({
      query: ({ id, data }) => ({
        url: `non-invoice-payments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["non-invoice-payments"],
    }),

    updateNonInvoicePaymentstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `non-invoice-payments/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["non-invoice-payments"],
    }),

    deleteNonInvoicePayments: builder.mutation({
      query: (id) => ({
        url: `non-invoice-payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["non-invoice-payments"],
    }),
  }),
});

export const {
  useGetNonInvoicePaymentsQuery,
  useGetNonInvoicePaymentSummaryByClientQuery,
  useGetNonInvoicePaymentsByPaginationQuery,
  useGetNonInvoicePaymentsByIdQuery,
  useGetAccountTransactionByTransactionIdQuery,
  useCreateNonInvoicePaymentsMutation,
  useUpdateNonInvoicePaymentsMutation,
  useUpdateNonInvoicePaymentstatusMutation,
  useDeleteNonInvoicePaymentsMutation,
} = nonInvoicesApi;
