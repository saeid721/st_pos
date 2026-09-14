import { apiSlice } from "../../apiSlice";

export const accountTransactionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccountTransactions: builder.query({
      query: ({ store_id = ''}) => `account-transactions?store_id=${store_id}`,
      providesTags: ["account-transactions"],
    }),

    getAccountTransactionsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `account-transactions/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["account-transactions"],
    }),

    getAccountTransactionsById: builder.query({
      query: (id) => `account-transactions/${id}`,
      providesTags: ["account-transactions"],
    }),

  }),
});

export const {
  useGetAccountTransactionsQuery,
  useGetAccountTransactionsByPaginationQuery,
  useGetAccountTransactionsByIdQuery,
} = accountTransactionsApi;
