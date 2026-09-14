import { apiSlice } from "../../apiSlice";

export const subscriptionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: () => "subscriptions",
      providesTags: ["subscriptions"],
    }),



    getStatusWisedSubscriptionsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "", payment_status = "", status = "", plan_id = "",  from_date = "" , to_date = "", }) =>
        `subscriptions/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}&payment_status=${payment_status}&status=${status}&plan_id=${plan_id}&from_date=${from_date}&to_date=${to_date}`,
      providesTags: ["subscriptions"],
    }),

    getMonthlySubscriptionCounts: builder.query({
      query: ({ year }) =>
        `subscriptions/monthly-subscription-count?year=${year}`,
      providesTags: ["subscriptions"],
    }),


    getSubscriptionsById: builder.query({
      query: (id) => `subscriptions/${id}`,
      providesTags: ["subscriptions"],
    }),

    createSubscriptions: builder.mutation({
      query: (data) => ({
        url: "subscriptions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subscriptions"],
    }),

    updateSubscriptions: builder.mutation({
      query: ({ id, data }) => ({
        url: `subscriptions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["subscriptions"],
    }),

    updateSubscriptionstatus: builder.mutation({
      query: ({ id, status="", payment_status="" }) => ({
        url: `subscriptions/${id}/status`,
        method: "PUT",
        body: { status, payment_status },
      }),
      invalidatesTags: ["subscriptions"],
    }),

    deleteSubscriptions: builder.mutation({
      query: (id) => ({
        url: `subscriptions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subscriptions"],
    }),
  }),
});

export const {
  useGetSubscriptionsQuery,
  useGetStatusWisedSubscriptionsByPaginationQuery,
  useGetMonthlySubscriptionCountsQuery,
  useGetSubscriptionsByIdQuery,
  useCreateSubscriptionsMutation,
  useUpdateSubscriptionsMutation,
  useUpdateSubscriptionstatusMutation,
  useDeleteSubscriptionsMutation,
} = subscriptionsApi;
