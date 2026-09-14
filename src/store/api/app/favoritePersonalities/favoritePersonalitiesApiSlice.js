import { apiSlice } from "../../apiSlice";

export const favoritepersonalitiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavoritePersonalities: builder.query({
      query: () => "favorite-personalities",
      providesTags: ["favoritepersonalities"],
    }),

    getFavoritePersonalitiesByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `favorite-personalities/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["favoritepersonalities"],
    }),

    getFavoritePersonalitiesById: builder.query({
      query: (id) => `favorite-personalities/${id}`,
      providesTags: ["favoritepersonalities"],
    }),

    createFavoritePersonalities: builder.mutation({
      query: (data) => ({
        url: "favorite-personalities",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["favoritepersonalities"],
    }),

    updateFavoritePersonalities: builder.mutation({
      query: ({ id, data }) => ({
        url: `favorite-personalities/${id}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["favoritepersonalities"],
    }),

    updateFavoritePersonalitiestatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `favorite-personalities/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
        formData: true,
      }),
      invalidatesTags: ["favoritepersonalities"],
    }),

    deleteFavoritePersonalities: builder.mutation({
      query: (id) => ({
        url: `favorite-personalities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["favoritepersonalities"],
    }),
  }),
});

export const {
  useGetFavoritePersonalitiesQuery,
  useGetFavoritePersonalitiesByPaginationQuery,
  useGetFavoritePersonalitiesByIdQuery,
  useCreateFavoritePersonalitiesMutation,
  useUpdateFavoritePersonalitiesMutation,
  useUpdateFavoritePersonalitiestatusMutation,
  useDeleteFavoritePersonalitiesMutation,
} = favoritepersonalitiesApi;
