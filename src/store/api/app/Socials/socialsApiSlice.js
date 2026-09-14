import { apiSlice } from "../../apiSlice";

export const socialsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSocials: builder.query({
      query: () => "socials",
      providesTags: ["socials"],
    }),

    getSocialsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `socials/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["socials"],
    }),

    getSocialsById: builder.query({
      query: (id) => `socials/${id}`,
      providesTags: ["socials"],
    }),

    createSocials: builder.mutation({
      query: (data) => ({
        url: "socials",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["socials"],
    }),

    updateSocials: builder.mutation({
      query: ({ id, data }) => ({
        url: `socials/${id}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["socials"],
    }),

    updateSocialstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `socials/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
        formData: true,
      }),
      invalidatesTags: ["socials"],
    }),

    deleteSocials: builder.mutation({
      query: (id) => ({
        url: `socials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["socials"],
    }),
  }),
});

export const {
  useGetSocialsQuery,
  useGetSocialsByPaginationQuery,
  useGetSocialsByIdQuery,
  useCreateSocialsMutation,
  useUpdateSocialsMutation,
  useUpdateSocialstatusMutation,
  useDeleteSocialsMutation,
} = socialsApi;
