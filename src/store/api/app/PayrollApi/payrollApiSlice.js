import { apiSlice } from "../../apiSlice";

export const payrollsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPayrolls: builder.query({
      query: () => "payrolls",
      providesTags: ["payrolls"],
    }),

    getPayrollsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `payrolls/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["payrolls"],
    }),

    getPayrollsById: builder.query({
      query: (id) => `payrolls/${id}`,
      providesTags: ["payrolls"],
    }),

    createPayrolls: builder.mutation({
      query: (data) => ({
        url: "payrolls",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payrolls"],
    }),

    updatePayrolls: builder.mutation({
      query: ({ id, data }) => ({
        url: `payrolls/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["payrolls"],
    }),

    updatePayrollstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `payrolls/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["payrolls"],
    }),

    deletePayrolls: builder.mutation({
      query: (id) => ({
        url: `payrolls/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["payrolls"],
    }),
  }),
});

export const {
  useGetPayrollsQuery,
  useGetPayrollsByPaginationQuery,
  useGetPayrollsByIdQuery,
  useCreatePayrollsMutation,
  useUpdatePayrollsMutation,
  useUpdatePayrollstatusMutation,
  useDeletePayrollsMutation,
} = payrollsApi;
