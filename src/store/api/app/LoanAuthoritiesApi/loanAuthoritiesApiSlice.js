import { apiSlice } from "../../apiSlice";

export const loanAuthoritiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoanAuthorities: builder.query({
      query: () => "loan-authorities",
      providesTags: ["loan-authorities"],
    }),

    getLoanAuthoritiesByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `loan-authorities/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["loan-authorities"],
    }),

    getLoanAuthoritiesById: builder.query({
      query: (id) => `loan-authorities/${id}`,
      providesTags: ["loan-authorities"],
    }),

    createLoanAuthorities: builder.mutation({
      query: (data) => ({
        url: "loan-authorities",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["loan-authorities"],
    }),

    updateLoanAuthorities: builder.mutation({
      query: ({ id, data }) => ({
        url: `loan-authorities/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["loan-authorities"],
    }),

    updateLoanAuthoritiestatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `loan-authorities/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["loan-authorities"],
    }),

    deleteLoanAuthorities: builder.mutation({
      query: (id) => ({
        url: `loan-authorities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["loan-authorities"],
    }),
  }),
});

export const {
  useGetLoanAuthoritiesQuery,
  useGetLoanAuthoritiesByPaginationQuery,
  useGetLoanAuthoritiesByIdQuery,
  useCreateLoanAuthoritiesMutation,
  useUpdateLoanAuthoritiesMutation,
  useUpdateLoanAuthoritiestatusMutation,
  useDeleteLoanAuthoritiesMutation,
} = loanAuthoritiesApiSlice;
