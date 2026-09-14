import { apiSlice } from "../../apiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ store_id="" }) =>
        `categories?&store_id=${store_id}`,
      providesTags: ["categories"],
    }),

    getCategoriesByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "", store_id="" }) =>
        `categories/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}&store_id=${store_id}`,
      providesTags: ["categories"],
    }),

    getCategoriesById: builder.query({
      query: (id) => `categories/${id}`,
      providesTags: ["categories"],
    }),

    createCategories: builder.mutation({
      query: (data) => ({
        url: "categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),

    updateCategories: builder.mutation({
      query: ({ id, data }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),

    updateCategoriestatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `categories/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["categories"],
    }),

    deleteCategories: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesByPaginationQuery,
  useGetCategoriesByIdQuery,
  useCreateCategoriesMutation,
  useUpdateCategoriesMutation,
  useUpdateCategoriestatusMutation,
  useDeleteCategoriesMutation,
} = categoriesApi;
