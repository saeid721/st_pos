import { apiSlice } from "../../apiSlice";

export const loansApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoans: builder.query({
      query: () => "loans",
      providesTags: ["loans"],
    }),

    getLoansByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `loans/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["loans"],
    }),

    getLoansById: builder.query({
      query: (id) => `loans/${id}`,
      providesTags: ["loans"],
    }),

    createLoans: builder.mutation({
      query: (data) => ({
        url: "loans",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["loans"],
    }),

    updateLoans: builder.mutation({
      query: ({ id, data }) => ({
        url: `loans/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["loans"],
    }),

    updateLoanstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `loans/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["loans"],
    }),

    deleteLoans: builder.mutation({
      query: (id) => ({
        url: `loans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["loans"],
    }),
  }),
});

export const {
  useGetLoansQuery,
  useGetLoansByPaginationQuery,
  useGetLoansByIdQuery,
  useCreateLoansMutation,
  useUpdateLoansMutation,
  useUpdateLoanstatusMutation,
  useDeleteLoansMutation,
} = loansApiSlice;
