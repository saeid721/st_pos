import { apiSlice } from "../../apiSlice";

export const assetTypesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssetTypes: builder.query({
      query: () => "asset-types",
      providesTags: ["asset-types"],
    }),

    getAssetTypesByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `asset-types/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["asset-types"],
    }),

    getAssetTypesById: builder.query({
      query: (id) => `asset-types/${id}`,
      providesTags: ["asset-types"],
    }),

    createAssetTypes: builder.mutation({
      query: (data) => ({
        url: "asset-types",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["asset-types"],
    }),

    updateAssetTypes: builder.mutation({
      query: ({ id, data }) => ({
        url: `asset-types/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["asset-types"],
    }),

    updateAssetTypestatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `asset-types/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["asset-types"],
    }),

    deleteAssetTypes: builder.mutation({
      query: (id) => ({
        url: `asset-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["asset-types"],
    }),
  }),
});

export const {
  useGetAssetTypesQuery,
  useGetAssetTypesByPaginationQuery,
  useGetAssetTypesByIdQuery,
  useCreateAssetTypesMutation,
  useUpdateAssetTypesMutation,
  useUpdateAssetTypestatusMutation,
  useDeleteAssetTypesMutation,
} = assetTypesApi;
