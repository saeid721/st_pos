import { apiSlice } from "../../apiSlice";

export const expenseCategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpenseCategory: builder.query({
      query: () => "expense-category",
      providesTags: ["expense-category"],
    }),

    getExpenseCategoryByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `expense-category/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["expense-category"],
    }),

    getExpenseCategoryById: builder.query({
      query: (id) => `expense-category/${id}`,
      providesTags: ["expense-category"],
    }),

    createExpenseCategory: builder.mutation({
      query: (data) => ({
        url: "expense-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expense-category"],
    }),

    updateExpenseCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `expense-category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["expense-category"],
    }),

    updateExpenseCategoryStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `expense-category/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["expense-category"],
    }),

    deleteExpenseCategory: builder.mutation({
      query: (id) => ({
        url: `expense-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expense-category"],
    }),
  }),
});

export const {
  useGetExpenseCategoryByPaginationQuery,
  useGetExpenseCategoryQuery,
  useGetExpenseCategoryByIdQuery,
  useCreateExpenseCategoryMutation,
  useUpdateExpenseCategoryStatusMutation,
  useUpdateExpenseCategoryMutation,
  useDeleteExpenseCategoryMutation,
} = expenseCategoriesApiSlice;
