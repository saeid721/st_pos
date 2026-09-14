import { apiSlice } from "../../apiSlice";

export const invoicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoicePayments: builder.query({
      query: ({ store_id = ''}) => `invoice-payments?store_id=${store_id}`,
      providesTags: ["invoice-payments"],
    }),
    getInvoicePaymentSummaryByClient: builder.query({
      query: ({client_id="", branch_id=""}) => `invoice-payments/summary/client/${client_id}?branch_id=${branch_id}`,
      providesTags: ["invoice-payments"],
    }),

    getInvoicePaymentsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `invoice-payments/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["invoice-payments"],
    }),

    getInvoicePaymentsById: builder.query({
      query: (id) => `invoice-payments/${id}`,
      providesTags: ["invoice-payments"],
    }),
    getAccountTransactionByTransactionId: builder.query({
      query: (id) => `account-transactions/${id}`,
      providesTags: ["invoicePayments"],
    }),

    createInvoicePayments: builder.mutation({
      query: (data) => ({
        url: "invoice-payments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["invoice-payments"],
    }),

    updateInvoicePayments: builder.mutation({
      query: ({ id, data }) => ({
        url: `invoice-payments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["invoice-payments"],
    }),

    updateInvoicePaymentstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `invoice-payments/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["invoice-payments"],
    }),

    deleteInvoicePayments: builder.mutation({
      query: (id) => ({
        url: `invoice-payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invoice-payments"],
    }),
  }),
});

export const {
  useGetInvoicePaymentsQuery,
  useGetInvoicePaymentSummaryByClientQuery,
  useGetInvoicePaymentsByPaginationQuery,
  useGetInvoicePaymentsByIdQuery,
  useGetAccountTransactionByTransactionIdQuery,
  useCreateInvoicePaymentsMutation,
  useUpdateInvoicePaymentsMutation,
  useUpdateInvoicePaymentstatusMutation,
  useDeleteInvoicePaymentsMutation,
} = invoicesApi;
