import { apiSlice } from "../../apiSlice";

export const storeTransactionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoreTransactions: builder.query({
      query: () => "store-transaction",
      providesTags: ["StoreTransactions"],
    }),

    getStoreTransactionsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `store-transaction/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["StoreTransactions"],
    }),


    getStoreTransactionsById: builder.query({
      query: (id) => `store-transaction/${id}`,
      providesTags: ["StoreTransactions"],
    }),


  }),
});

export const {
  useGetStoreTransactionsQuery,
  useGetStoreTransactionsByPaginationQuery,
  useGetStoreTransactionsByIdQuery,
} = storeTransactionsApi;
