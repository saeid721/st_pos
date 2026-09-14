import { apiSlice } from "../../apiSlice";

export const subscribersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSubscribers: builder.query({
            query: () => "subscribers",
            providesTags: ["subscribers"],
        }),

        getSubscribersByPagination: builder.query({
            query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
              `subscribers/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
            providesTags: ["subscribers"],
          }),

        getSubscribersById: builder.query({
            query: (id) => `subscribers/${id}`,
            providesTags: ["subscribers"],
        }),


        updateSubscribers: builder.mutation({
            query: ({ id, data }) => ({
                url: `subscribers/${id}`,
                method: "PUT",
                body: data,
                formData: true,
            }),
            invalidatesTags: ["subscribers"],
        }),


        deleteSubscribers: builder.mutation({
            query: (id) => ({
                url: `subscribers/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["subscribers"],
        }),
    }),
});

export const {
    useGetSubscribersQuery,
    useGetSubscribersByPaginationQuery,
    useGetSubscribersByIdQuery,
    useUpdateSubscribersMutation,
    useDeleteSubscribersMutation,
} = subscribersApi;
