import { apiSlice } from "../../apiSlice";

export const expenseSubCategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpenseSubCategory: builder.query({
      query: () => "expense-sub-category",
      providesTags: ["expense-sub-category"],
    }),

    getExpenseSubCategoryByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `expense-sub-category/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["expense-sub-category"],
    }),

    getExpenseSubCategoryById: builder.query({
      query: (id) => `expense-sub-category/${id}`,
      providesTags: ["expense-sub-category"],
    }),

    createExpenseSubCategory: builder.mutation({
      query: (data) => ({
        url: "expense-sub-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expense-sub-category"],
    }),

    updateExpenseSubCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `expense-sub-category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["expense-sub-category"],
    }),

    updateExpenseSubCategoryStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `expense-sub-category/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["expense-sub-category"],
    }),

    deleteExpenseSubCategory: builder.mutation({
      query: (id) => ({
        url: `expense-sub-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expense-sub-category"],
    }),
  }),
});

export const {
  useGetExpenseSubCategoryByPaginationQuery,
  useGetExpenseSubCategoryQuery,
  useGetExpenseSubCategoryByIdQuery,
  useCreateExpenseSubCategoryMutation,
  useUpdateExpenseSubCategoryStatusMutation,
  useUpdateExpenseSubCategoryMutation,
  useDeleteExpenseSubCategoryMutation,
} = expenseSubCategoriesApiSlice;
