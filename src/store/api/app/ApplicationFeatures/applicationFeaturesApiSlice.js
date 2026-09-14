import { apiSlice } from "../../apiSlice";

export const applicationfeaturesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationFeatures: builder.query({
      query: () => "application-features",
      providesTags: ["applicationfeatures"],
    }),

    getApplicationFeaturesByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `application-features/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["applicationfeatures"],
    }),

    getApplicationFeaturesById: builder.query({
      query: (id) => `application-features/${id}`,
      providesTags: ["applicationfeatures"],
    }),

    createApplicationFeatures: builder.mutation({
      query: (data) => ({
        url: "application-features",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["applicationfeatures"],
    }),

    updateApplicationFeatures: builder.mutation({
      query: ({ id, data }) => ({
        url: `application-features/${id}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["applicationfeatures"],
    }),

    updateApplicationFeaturestatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `application-features/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
        formData: true,
      }),
      invalidatesTags: ["applicationfeatures"],
    }),

    deleteApplicationFeatures: builder.mutation({
      query: (id) => ({
        url: `application-features/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["applicationfeatures"],
    }),
  }),
});

export const {
  useGetApplicationFeaturesQuery,
  useGetApplicationFeaturesByPaginationQuery,
  useGetApplicationFeaturesByIdQuery,
  useCreateApplicationFeaturesMutation,
  useUpdateApplicationFeaturesMutation,
  useUpdateApplicationFeaturestatusMutation,
  useDeleteApplicationFeaturesMutation,
} = applicationfeaturesApi;
