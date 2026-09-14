import { apiSlice } from "../../apiSlice";

export const accountsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: ({ store_id = ''}) => `accounts?store_id=${store_id}`,
      providesTags: ["accounts"],
    }),
    getAvailableBalanceByAccount: builder.query({
      query: ({ account_id }) => `accounts/${account_id}/available-balance`,
      providesTags: ["accounts"],
    }),

    getAccountsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `accounts/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["accounts"],
    }),

    getAccountsById: builder.query({
      query: (id) => `accounts/${id}`,
      providesTags: ["accounts"],
    }),
    getAccountTransactionByTransactionId: builder.query({
      query: (id) => `account-transactions/${id}`,
      providesTags: ["accounts"],
    }),

    createAccounts: builder.mutation({
      query: (data) => ({
        url: "accounts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["accounts"],
    }),

    updateAccounts: builder.mutation({
      query: ({ id, data }) => ({
        url: `accounts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["accounts"],
    }),

    updateAccountstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `accounts/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["accounts"],
    }),

    deleteAccounts: builder.mutation({
      query: (id) => ({
        url: `accounts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["accounts"],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetAvailableBalanceByAccountQuery,
  useGetAccountsByPaginationQuery,
  useGetAccountsByIdQuery,
  useGetAccountTransactionByTransactionIdQuery,
  useCreateAccountsMutation,
  useUpdateAccountsMutation,
  useUpdateAccountstatusMutation,
  useDeleteAccountsMutation,
} = accountsApi;
