import { apiSlice } from "../../apiSlice";

export const balanceAdjustmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBalanceAdjustments: builder.query({
      query: ({ store_id = ''}) => `account-transactions/adjustments`,
      providesTags: ["BalanceAdjustments"],
    }),

    getBalanceAdjustmentsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `account-transactions/adjustments/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["BalanceAdjustments"],
    }),

    getBalanceAdjustmentsById: builder.query({
      query: (id) => `account-transactions/adjustments/${id}`,
      providesTags: ["BalanceAdjustments"],
    }),
    getAccountTransactionByTransactionId: builder.query({
      query: (id) => `account-transactions/adjustments/${id}`,
      providesTags: ["BalanceAdjustments"],
    }),

    createBalanceAdjustments: builder.mutation({
      query: (data) => ({
        url: "account-transactions/adjustments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BalanceAdjustments", "accounts"],
    }),

    updateBalanceAdjustments: builder.mutation({
      query: ({ id, data }) => ({
        url: `account-transactions/adjustments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["BalanceAdjustments", "accounts"],
    }),

    updateBalanceAdjustmentstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `account-transactions/adjustments/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["BalanceAdjustments"],
    }),

    deleteBalanceAdjustments: builder.mutation({
      query: (id) => ({
        url: `account-transactions/adjustments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BalanceAdjustments"],
    }),
  }),
});

export const {
  useGetBalanceAdjustmentsQuery,
  useGetBalanceAdjustmentsByPaginationQuery,
  useGetBalanceAdjustmentsByIdQuery,
  useGetAccountTransactionByTransactionIdQuery,
  useCreateBalanceAdjustmentsMutation,
  useUpdateBalanceAdjustmentsMutation,
  useUpdateBalanceAdjustmentstatusMutation,
  useDeleteBalanceAdjustmentsMutation,
} = balanceAdjustmentsApi;
