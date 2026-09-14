import { apiSlice } from "../../apiSlice";

export const quotationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuotations: builder.query({
      query: () => "quotations",
      providesTags: ["quotations"],
    }),

    getQuotationListProducts: builder.query({
      query: ({ quotation_id="" }) =>
        `quotation-products?&quotation_id=${quotation_id}`,
      providesTags: ["quotations"],
    }),

    getQuotationsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "", supplier_id="", tax_id="", branch_id="", store_id="" }) =>
        `quotations/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}&supplier_id=${supplier_id}&tax_id=${tax_id}&branch_id=${branch_id}&store_id=${store_id}`,
      providesTags: ["quotations"],
    }),

    getQuotationsById: builder.query({
      query: (id) => `quotations/${id}`,
      providesTags: ["quotations"],
    }),

    createQuotations: builder.mutation({
      query: (data) => ({
        url: "quotations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["quotations"],
    }),

    updateQuotations: builder.mutation({
      query: ({ id, data }) => ({
        url: `quotations/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["quotations"],
    }),

    updateQuotationstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `quotations/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["quotations"],
    }),

    deleteQuotations: builder.mutation({
      query: (id) => ({
        url: `quotations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["quotations"],
    }),
    deleteQuotationsProduct: builder.mutation({
      query: (id) => ({
        url: `quotation-products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["quotations"],
    }),
  }),
});

export const {
  useGetQuotationsQuery,
  useGetQuotationListProductsQuery,
  useGetQuotationsByPaginationQuery,
  useGetQuotationsByIdQuery,
  useCreateQuotationsMutation,
  useUpdateQuotationsMutation,
  useUpdateQuotationstatusMutation,
  useDeleteQuotationsMutation,
  useDeleteQuotationsProductMutation,
} = quotationsApi;
