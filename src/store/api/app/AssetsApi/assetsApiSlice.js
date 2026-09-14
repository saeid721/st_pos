import { apiSlice } from "../../apiSlice";

export const assetsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: () => "assets",
      providesTags: ["assets"],
    }),

    getAssetsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `assets/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["assets"],
    }),

    getAssetsById: builder.query({
      query: (id) => `assets/${id}`,
      providesTags: ["assets"],
    }),

    createAssets: builder.mutation({
      query: (data) => ({
        url: "assets",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["assets"],
    }),

    updateAssets: builder.mutation({
      query: ({ id, data }) => ({
        url: `assets/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["assets"],
    }),

    updateAssetstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `assets/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["assets"],
    }),

    deleteAssets: builder.mutation({
      query: (id) => ({
        url: `assets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["assets"],
    }),
  }),
});

export const {
  useGetAssetsQuery,
  useGetAssetsByPaginationQuery,
  useGetAssetsByIdQuery,
  useCreateAssetsMutation,
  useUpdateAssetsMutation,
  useUpdateAssetstatusMutation,
  useDeleteAssetsMutation,
} = assetsApi;
