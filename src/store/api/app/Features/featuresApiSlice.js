import { apiSlice } from "../../apiSlice";

export const featuresApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeatures: builder.query({
      query: () => "features",
      providesTags: ["features"],
    }),

    getFeaturesByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `features/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["features"],
    }),

    getFeaturesById: builder.query({
      query: (id) => `features/${id}`,
      providesTags: ["features"],
    }),

    createFeatures: builder.mutation({
      query: (data) => ({
        url: "features",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["features"],
    }),

    updateFeatures: builder.mutation({
      query: ({ id, data }) => ({
        url: `features/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["features"],
    }),

    updateFeaturestatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `features/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["features"],
    }),

    deleteFeatures: builder.mutation({
      query: (id) => ({
        url: `features/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["features"],
    }),
  }),
});

export const {
  useGetFeaturesQuery,
  useGetFeaturesByPaginationQuery,
  useGetFeaturesByIdQuery,
  useCreateFeaturesMutation,
  useUpdateFeaturesMutation,
  useUpdateFeaturestatusMutation,
  useDeleteFeaturesMutation,
} = featuresApi;
