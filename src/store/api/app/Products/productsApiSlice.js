import { apiSlice } from "../../apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ store_id = "" }) => `products?&store_id=${store_id}`,
      providesTags: ["products"],
    }),

    getProductsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `products/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["products"],
    }),

    getProductsById: builder.query({
      query: (id) => `products/${id}`,
      providesTags: ["products"],
    }),

    createProducts: builder.mutation({
      query: (data) => ({
        url: "products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

    updateProducts: builder.mutation({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

    updateProductstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `products/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["products"],
    }),

    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByPaginationQuery,
  useGetProductsByIdQuery,
  useCreateProductsMutation,
  useUpdateProductsMutation,
  useUpdateProductstatusMutation,
  useDeleteProductsMutation,
} = productsApi;
