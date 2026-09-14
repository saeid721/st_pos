import { apiSlice } from "../../apiSlice";

export const homesectiondetailsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHomeSectionDetails: builder.query({
      query: ({ section_id = "" }) =>
        `home-section-details?section_id=${section_id}`,
      providesTags: ["homesectiondetails"],
    }),

    getHomeSectionDetailsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `home-section-details/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["homesectiondetails"],
    }),

    getHomeSectionDetailsById: builder.query({
      query: (id) => `home-section-details/${id}`,
      providesTags: ["homesectiondetails"],
    }),

    createHomeSectionDetails: builder.mutation({
      query: (data) => ({
        url: "home-section-details",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["homesectiondetails"],
    }),

    updateHomeSectionDetails: builder.mutation({
      query: ({ id, data }) => ({
        url: `home-section-details/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["homesectiondetails"],
    }),

    updateHomeSectionDetailsStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `home-section-details/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["homesectiondetails"],
    }),

    deleteHomeSectionDetails: builder.mutation({
      query: (id) => ({
        url: `home-section-details/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["homesectiondetails"],
    }),
  }),
});

export const {
  useGetHomeSectionDetailsQuery,
  useGetHomeSectionDetailsByPaginationQuery,
  useGetHomeSectionDetailsByIdQuery,
  useCreateHomeSectionDetailsMutation,
  useUpdateHomeSectionDetailsMutation,
  useUpdateHomeSectionDetailsStatusMutation,
  useDeleteHomeSectionDetailsMutation,
} = homesectiondetailsApi;
