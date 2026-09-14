import { apiSlice } from "../../apiSlice";

export const expenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpense: builder.query({
      query: () => "expenses",
      providesTags: ["expenses"],
    }),

    getExpenseByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "", branch_id = "" }) =>
        `expenses/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}&branch_id=${branch_id}`,
      providesTags: ["expenses"],
    }),

    getExpenseById: builder.query({
      query: (id) => `expenses/${id}`,
      providesTags: ["expenses"],
    }),

    createExpense: builder.mutation({
      query: (data) => ({
        url: "expenses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expenses"],
    }),

    updateExpense: builder.mutation({
      query: ({ id, data }) => ({
        url: `expenses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["expenses"],
    }),

    updateExpenseStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `expenses/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["expenses"],
    }),

    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expenses"],
    }),
  }),
});

export const {
  useGetExpenseByPaginationQuery,
  useGetExpenseQuery,
  useGetExpenseByIdQuery,
  useCreateExpenseMutation,
  useUpdateExpenseStatusMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApiSlice;
