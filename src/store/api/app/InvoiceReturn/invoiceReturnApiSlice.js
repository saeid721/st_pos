import { apiSlice } from "../../apiSlice";

export const invoiceReturnApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoiceReturns: builder.query({
      query: ({ store_id = ''}) => `invoice-returns`,
      providesTags: ["InvoiceReturns"],
    }),

    getInvoiceReturnsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `invoice-returns/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["InvoiceReturns"],
    }),

    getInvoiceReturnsById: builder.query({
      query: (id) => `invoice-returns/${id}`,
      providesTags: ["InvoiceReturns"],
    }),

    createInvoiceReturns: builder.mutation({
      query: (data) => ({
        url: "invoice-returns",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["InvoiceReturns", "accounts"],
    }),

    updateInvoiceReturns: builder.mutation({
      query: ({ id, data }) => ({
        url: `invoice-returns/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["InvoiceReturns", "accounts"],
    }),

    updateInvoiceReturnstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `invoice-returns/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["InvoiceReturns"],
    }),

    deleteInvoiceReturns: builder.mutation({
      query: (id) => ({
        url: `invoice-returns/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["InvoiceReturns"],
    }),
  }),
});

export const {
  useGetInvoiceReturnsQuery,
  useGetInvoiceReturnsByPaginationQuery,
  useGetInvoiceReturnsByIdQuery,
  useCreateInvoiceReturnsMutation,
  useUpdateInvoiceReturnsMutation,
  useUpdateInvoiceReturnstatusMutation,
  useDeleteInvoiceReturnsMutation,
} = invoiceReturnApi;
