import { apiSlice } from "../../apiSlice";

export const homesectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHomeSection: builder.query({
      query: () => "home-sections",
      providesTags: ["homesection"],
    }),

    getHomeSectionByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `home-sections/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["homesection"],
    }),

    getHomeSectionById: builder.query({
      query: (id) => `home-sections/${id}`,
      providesTags: ["homesection"],
    }),

    createHomeSection: builder.mutation({
      query: (data) => ({
        url: "home-sections",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["homesection"],
    }),

    updateHomeSection: builder.mutation({
      query: ({ id, data }) => ({
        url: `home-sections/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["homesection"],
    }),

    updateHomeSectiontatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `home-sections/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["homesection"],
    }),

    deleteHomeSection: builder.mutation({
      query: (id) => ({
        url: `home-sections/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["homesection"],
    }),
  }),
});

export const {
  useGetHomeSectionQuery,
  useGetHomeSectionByPaginationQuery,
  useGetHomeSectionByIdQuery,
  useCreateHomeSectionMutation,
  useUpdateHomeSectionMutation,
  useUpdateHomeSectiontatusMutation,
  useDeleteHomeSectionMutation,
} = homesectionApi;
