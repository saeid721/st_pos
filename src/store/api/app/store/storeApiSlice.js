import { apiSlice } from "../../apiSlice";

export const storesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query({
      query: () => "stores",
      providesTags: ["stores"],
    }),

    getStoresByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `stores/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["stores"],
    }),

    getSubscriptionRequestByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `stores/subscription-request?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["stores"],
    }),

    getUserCreatedStoreByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `stores/user-created-store?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["stores"],
    }),

    getStoresById: builder.query({
      query: (id) => `stores/${id}`,
      providesTags: ["stores"],
    }),

    createStores: builder.mutation({
      query: (data) => ({
        url: "stores",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["stores"],
    }),

    updateStores: builder.mutation({
      query: ({ id, data }) => ({
        url: `stores/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["stores"],
    }),

    updateStorestatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `stores/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["stores"],
    }),

    deleteStores: builder.mutation({
      query: (id) => ({
        url: `stores/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["stores"],
    }),
  }),
});

export const {
  useGetStoresQuery,
  useGetStoresByPaginationQuery,
  useGetSubscriptionRequestByPaginationQuery,
  useGetUserCreatedStoreByPaginationQuery,
  useGetStoresByIdQuery,
  useCreateStoresMutation,
  useUpdateStoresMutation,
  useUpdateStorestatusMutation,
  useDeleteStoresMutation,
} = storesApi;
