import { apiSlice } from "../../apiSlice";

export const subCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubCategories: builder.query({
      query: ({ store_id="", category_id="" }) =>
        `sub-categories?store_id=${store_id}&category_id=${category_id}`,
      providesTags: ["subCategories"],
    }),

    getSubCategoriesByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "", store_id="" }) =>
        `sub-categories/pagination/pages?page=${page}&limit=${limit}&order=${order}&search=${search}&store_id=${store_id}`,
      providesTags: ["subCategories"],
    }),

    getSubCategoriesById: builder.query({
      query: (id) => `sub-categories/${id}`,
      providesTags: ["subCategories"],
    }),

    createSubCategories: builder.mutation({
      query: (data) => ({
        url: "sub-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subCategories"],
    }),

    updateSubCategories: builder.mutation({
      query: ({ id, data }) => ({
        url: `sub-categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["subCategories"],
    }),

    updateSubCategoriestatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `sub-categories/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["subCategories"],
    }),

    deleteSubCategories: builder.mutation({
      query: (id) => ({
        url: `sub-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subCategories"],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useGetSubCategoriesByPaginationQuery,
  useGetSubCategoriesByIdQuery,
  useCreateSubCategoriesMutation,
  useUpdateSubCategoriesMutation,
  useUpdateSubCategoriestatusMutation,
  useDeleteSubCategoriesMutation,
} = subCategoriesApi;
