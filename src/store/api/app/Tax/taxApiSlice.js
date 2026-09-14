import { apiSlice } from "../../apiSlice";

export const taxsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTaxs: builder.query({
      query: ({ store_id="" }) =>
        `taxs?store_id=${store_id}`,
      providesTags: ["taxs"],
    }),

    getTaxsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "", store_id="" }) =>
        `taxs/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}&store_id=${store_id}`,
      providesTags: ["taxs"],
    }),

    getTaxsById: builder.query({
      query: (id) => `taxs/${id}`,
      providesTags: ["taxs"],
    }),

    createTaxs: builder.mutation({
      query: (data) => ({
        url: "taxs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["taxs"],
    }),

    updateTaxs: builder.mutation({
      query: ({ id, data }) => ({
        url: `taxs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["taxs"],
    }),

    updateTaxstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `taxs/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["taxs"],
    }),

    deleteTaxs: builder.mutation({
      query: (id) => ({
        url: `taxs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["taxs"],
    }),
  }),
});

export const {
  useGetTaxsQuery,
  useGetTaxsByPaginationQuery,
  useGetTaxsByIdQuery,
  useCreateTaxsMutation,
  useUpdateTaxsMutation,
  useUpdateTaxstatusMutation,
  useDeleteTaxsMutation,
} = taxsApi;
