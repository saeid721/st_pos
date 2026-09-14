import { apiSlice } from "../../apiSlice";

export const brandsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: ({ store_id="" }) =>
        `brands?store_id=${store_id}`,
      providesTags: ["brands"],
    }),

    getBrandsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "", store_id }) =>
        `brands/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}&store_id=${store_id}`,
      providesTags: ["brands"],
    }),

    getBrandsById: builder.query({
      query: (id) => `brands/${id}`,
      providesTags: ["brands"],
    }),

    createBrands: builder.mutation({
      query: (data) => ({
        url: "brands",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["brands"],
    }),

    updateBrands: builder.mutation({
      query: ({ id, data }) => ({
        url: `brands/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["brands"],
    }),

    updateBrandstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `brands/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["brands"],
    }),

    deleteBrands: builder.mutation({
      query: (id) => ({
        url: `brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brands"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandsByPaginationQuery,
  useGetBrandsByIdQuery,
  useCreateBrandsMutation,
  useUpdateBrandsMutation,
  useUpdateBrandstatusMutation,
  useDeleteBrandsMutation,
} = brandsApi;
