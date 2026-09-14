import { apiSlice } from "../../apiSlice";

export const inventoryAdjustmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryAdjustment: builder.query({
      query: ({ store_id="" }) =>
        `inventory-adjustment?store_id=${store_id}`,
      providesTags: ["inventory-adjustment"],
    }),

    getInventoryAdjustmentByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "", store_id="" }) =>
        `inventory-adjustment/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}&store_id=${store_id}`,
      providesTags: ["inventory-adjustment"],
    }),

    getInventoryAdjustmentById: builder.query({
      query: (id) => `inventory-adjustment/${id}`,
      providesTags: ["inventory-adjustment"],
    }),

    createInventoryAdjustment: builder.mutation({
      query: (data) => ({
        url: "inventory-adjustment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["inventory-adjustment", "products"],
    }),

    updateInventoryAdjustment: builder.mutation({
      query: ({ id, data }) => ({
        url: `inventory-adjustment/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["inventory-adjustment"],
    }),

    updateInventoryAdjustmenttatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `inventory-adjustment/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["inventory-adjustment"],
    }),

    deleteInventoryAdjustment: builder.mutation({
      query: (id) => ({
        url: `inventory-adjustment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["inventory-adjustment"],
    }),
  }),
});

export const {
  useGetInventoryAdjustmentQuery,
  useGetInventoryAdjustmentByPaginationQuery,
  useGetInventoryAdjustmentByIdQuery,
  useCreateInventoryAdjustmentMutation,
  useUpdateInventoryAdjustmentMutation,
  useUpdateInventoryAdjustmenttatusMutation,
  useDeleteInventoryAdjustmentMutation,
} = inventoryAdjustmentApi;
