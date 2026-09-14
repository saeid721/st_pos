import { apiSlice } from "../../apiSlice";

export const transactionHistoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionHistory: builder.query({
      query: () => "store-transaction",
      providesTags: ["transactionHistory"],
    }),
    getTransactionHistoryByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `store-transaction/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["transactionHistory"],
    }),
    getStoreTransactionHistoryByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `store-transaction/own-store/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["transactionHistory"],
    }),

    getTransactionHistoryById: builder.query({
      query: (id) => `store-transaction/${id}`,
      providesTags: ["transactionHistory"],
    }),


    updateTransactionHistory: builder.mutation({
      query: ({ id, data }) => ({
        url: `store-transaction/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["transactionHistory"],
    }),

    updateTransactionHistorytatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `store-transaction/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["transactionHistory"],
    }),

    deleteTransactionHistory: builder.mutation({
      query: (id) => ({
        url: `store-transaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transactionHistory"],
    }),
  }),
});

export const {
  useGetTransactionHistoryQuery,
  useGetTransactionHistoryByPaginationQuery,
  useGetStoreTransactionHistoryByPaginationQuery,
  useGetTransactionHistoryByIdQuery,
  useUpdateTransactionHistoryMutation,
  useUpdateTransactionHistorytatusMutation,
  useDeleteTransactionHistoryMutation,
} = transactionHistoryApi;
