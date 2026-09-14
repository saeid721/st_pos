import { apiSlice } from "../../apiSlice";

export const salaryIncrementsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalaryIncrements: builder.query({
      query: ({ store_id="" }) =>
        `salary-increments?&store_id=${store_id}`,
      providesTags: ["salary-increments"],
    }),

    getSalaryIncrementsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "", store_id="" }) =>
        `salary-increments/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}&store_id=${store_id}`,
      providesTags: ["salary-increments"],
    }),

    getSalaryIncrementsById: builder.query({
      query: (id) => `salary-increments/${id}`,
      providesTags: ["salary-increments"],
    }),

    createSalaryIncrements: builder.mutation({
      query: (data) => ({
        url: "salary-increments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["salary-increments"],
    }),

    updateSalaryIncrements: builder.mutation({
      query: ({ id, data }) => ({
        url: `salary-increments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["salary-increments"],
    }),

    updateSalaryIncrementstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `salary-increments/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["salary-increments"],
    }),

    deleteSalaryIncrements: builder.mutation({
      query: (id) => ({
        url: `salary-increments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["salary-increments"],
    }),
  }),
});

export const {
  useGetSalaryIncrementsQuery,
  useGetSalaryIncrementsByPaginationQuery,
  useGetSalaryIncrementsByIdQuery,
  useCreateSalaryIncrementsMutation,
  useUpdateSalaryIncrementsMutation,
  useUpdateSalaryIncrementstatusMutation,
  useDeleteSalaryIncrementsMutation,
} = salaryIncrementsApi;
