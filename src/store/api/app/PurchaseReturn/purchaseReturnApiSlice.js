import { apiSlice } from "../../apiSlice";

export const purchaseReturnApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPurchaseReturns: builder.query({
      query: ({ store_id = ''}) => `purchases-return`,
      providesTags: ["PurchaseReturns"],
    }),

    getPurchaseReturnsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `purchases-return/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["PurchaseReturns"],
    }),

    getPurchaseReturnsById: builder.query({
      query: (id) => `purchases-return/${id}`,
      providesTags: ["PurchaseReturns"],
    }),

    createPurchaseReturns: builder.mutation({
      query: (data) => ({
        url: "purchases-return",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PurchaseReturns", "accounts"],
    }),

    updatePurchaseReturns: builder.mutation({
      query: ({ id, data }) => ({
        url: `purchases-return/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PurchaseReturns", "accounts"],
    }),

    updatePurchaseReturnstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `purchases-return/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["PurchaseReturns"],
    }),

    deletePurchaseReturns: builder.mutation({
      query: (id) => ({
        url: `purchases-return/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PurchaseReturns"],
    }),
  }),
});

export const {
  useGetPurchaseReturnsQuery,
  useGetPurchaseReturnsByPaginationQuery,
  useGetPurchaseReturnsByIdQuery,
  useCreatePurchaseReturnsMutation,
  useUpdatePurchaseReturnsMutation,
  useUpdatePurchaseReturnstatusMutation,
  useDeletePurchaseReturnsMutation,
} = purchaseReturnApi;
