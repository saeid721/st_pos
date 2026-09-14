import { apiSlice } from "../../apiSlice";

export const currenciesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrencies: builder.query({
      query: () => "currency",
      providesTags: ["currency"],
    }),

    getStoreCurrencies: builder.query({
      query: () => "currency/get-store-currency",
      providesTags: ["currency"],
    }),

    getCurrenciesByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `currency/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["currency"],
    }),

    getCurrenciesById: builder.query({
      query: (id) => `currency/${id}`,
      providesTags: ["currency"],
    }),

    createCurrencies: builder.mutation({
      query: (data) => ({
        url: "currency",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["currency"],
    }),
    setStoreCurrencies: builder.mutation({
      query: ({data}) => ({
        url: "currency/set-store-currency",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["currency"],
    }),

    updateCurrencies: builder.mutation({
      query: ({ id, data }) => ({
        url: `currency/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["currency"],
    }),

    updateCurrenciestatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `currency/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["currency"],
    }),

    deleteCurrencies: builder.mutation({
      query: (id) => ({
        url: `currency/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["currency"],
    }),
  }),
});

export const {
  useGetCurrenciesQuery,
  useGetStoreCurrenciesQuery,
  useGetCurrenciesByPaginationQuery,
  useGetCurrenciesByIdQuery,
  useCreateCurrenciesMutation,
  useSetStoreCurrenciesMutation,
  useUpdateCurrenciesMutation,
  useUpdateCurrenciestatusMutation,
  useDeleteCurrenciesMutation,
} = currenciesApi;
