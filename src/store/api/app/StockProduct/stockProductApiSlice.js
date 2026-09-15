import { apiSlice } from "../../apiSlice";

export const stockProductsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStockProducts: builder.query({
      query: () => "stock-product",
      providesTags: ["stockProducts"],
    }),

    getStockProductsByPagination: builder.query({
      query: ({
        page = 1,
        limit = 10,
        order = "desc",
        search = "",
        supplier_id = "",
        tax_id = "",
        branch_id = "",
        store_id = "",
        category_id = "",
        sub_category_id = "",
      }) =>
        `stock-product/pagination?page=${page}&limit=${limit}&order=${order}&search=${encodeURIComponent(
          search
        )}&store_id=${store_id}${category_id ? `&category_id=${category_id}` : ""}${
          sub_category_id ? `&sub_category_id=${sub_category_id}` : ""
        }`,
      providesTags: ["stockProducts"],
    }),

    getStockProductsById: builder.query({
      query: (id) => `stock-product/${id}`,
      providesTags: ["stockProducts"],
    }),

    createStockProducts: builder.mutation({
      query: (data) => ({
        url: "stock-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["stockProducts"],
    }),

    updateStockProducts: builder.mutation({
      query: (data) => ({
        url: `stock-product`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["stockProducts"],
    }),

    updateStockProductstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `stock-product/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["stockProducts"],
    }),

    deleteStockProducts: builder.mutation({
      query: (id) => ({
        url: `stock-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["stockProducts"],
    }),
  }),
});

export const {
  useGetStockProductsQuery,
  useGetStockProductsByPaginationQuery,
  useGetStockProductsByIdQuery,
  useCreateStockProductsMutation,
  useUpdateStockProductsMutation,
  useUpdateStockProductstatusMutation,
  useDeleteStockProductsMutation,
} = stockProductsApi;