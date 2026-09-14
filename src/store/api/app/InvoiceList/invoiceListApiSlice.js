import { apiSlice } from "../../apiSlice";

export const invoicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: () => "invoices",
      providesTags: ["invoices"],
    }),
    getInvoicesByClient: builder.query({
      query: ({ client_id = "" }) => `invoices/client?client_id=${client_id}`,
      providesTags: ["invoices"],
    }),
    getInvoiceProductList: builder.query({
      query: ({ invoice_id = "" }) => `invoice-products?&invoice_id=${invoice_id}`,
      providesTags: ["invoices"],
    }),
    getInvoicesByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `invoices/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["invoices"],
    }),

    getInvoicesById: builder.query({
      query: (id) => `invoices/${id}`,
      providesTags: ["invoices"],
    }),

    getInvoiceSummaryByInvoiceId: builder.query({
      query: ({invoice_id = "", branch_id = ""}) => `invoice-payments/summary/invoice/${parseInt(invoice_id)}?branch_id=${parseInt(branch_id)}`,
      providesTags: ["invoices"],
    }),

    createInvoices: builder.mutation({
      query: (data) => ({
        url: "invoices",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["invoices"],
    }),

    updateInvoices: builder.mutation({
      query: ({ id, data }) => ({
        url: `invoices/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["invoices"],
    }),

    updateInvoicestatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `invoices/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["invoices"],
    }),

    deleteInvoices: builder.mutation({
      query: (id) => ({
        url: `invoices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invoices"],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoicesByClientQuery,
  useGetInvoiceProductListQuery,
  useGetInvoicesByPaginationQuery,
  useGetInvoicesByIdQuery,
  useGetInvoiceSummaryByInvoiceIdQuery,
  useCreateInvoicesMutation,
  useUpdateInvoicesMutation,
  useUpdateInvoicestatusMutation,
  useDeleteInvoicesMutation,
} = invoicesApi;
