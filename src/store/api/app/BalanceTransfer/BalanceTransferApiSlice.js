import { apiSlice } from "../../apiSlice";

export const balanceTransfersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBalanceTransfers: builder.query({
      query: ({ store_id = ''}) => `account-transactions/transfers`,
      providesTags: ["BalanceTransfers"],
    }),

    getBalanceTransfersByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `account-transactions/transfers/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["BalanceTransfers"],
    }),

    getBalanceTransfersById: builder.query({
      query: (id) => `account-transactions/transfers/${id}`,
      providesTags: ["BalanceTransfers"],
    }),
    getAccountTransactionByTransactionId: builder.query({
      query: (id) => `account-transactions/transfers/${id}`,
      providesTags: ["BalanceTransfers"],
    }),

    createBalanceTransfers: builder.mutation({
      query: (data) => ({
        url: "account-transactions/transfers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BalanceTransfers", "accounts"],
    }),

    updateBalanceTransfers: builder.mutation({
      query: ({ id, data }) => ({
        url: `account-transactions/transfers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["BalanceTransfers", "accounts"],
    }),

    updateBalanceTransferstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `account-transactions/transfers/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["BalanceTransfers"],
    }),

    deleteBalanceTransfers: builder.mutation({
      query: (id) => ({
        url: `account-transactions/transfers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BalanceTransfers"],
    }),
  }),
});

export const {
  useGetBalanceTransfersQuery,
  useGetBalanceTransfersByPaginationQuery,
  useGetBalanceTransfersByIdQuery,
  useGetAccountTransactionByTransactionIdQuery,
  useCreateBalanceTransfersMutation,
  useUpdateBalanceTransfersMutation,
  useUpdateBalanceTransferstatusMutation,
  useDeleteBalanceTransfersMutation,
} = balanceTransfersApi;
