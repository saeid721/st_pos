import { apiSlice } from "../../apiSlice";

export const purchasesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPurchases: builder.query({
      query: () => "purchases",
      providesTags: ["purchases"],
    }),

    getPurchasesBySupplier: builder.query({
      query: ({ supplier_id = "" }) => `purchases/supplier?supplier_id=${supplier_id}`,
      providesTags: ["purchases"],
    }),

    getPurchasesProducts: builder.query({
      query: ({ purchase_id="" }) =>
        `purchase-products?&purchase_id=${purchase_id}`,
      providesTags: ["purchases"],
    }),

    getPurchasesByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "", supplier_id="", tax_id="", branch_id="", store_id="" }) =>
        `purchases/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}&supplier_id=${supplier_id}&tax_id=${tax_id}&branch_id=${branch_id}&store_id=${store_id}`,
      providesTags: ["purchases"],
    }),

    getPurchasesById: builder.query({
      query: (id) => `purchases/${id}`,
      providesTags: ["purchases"],
    }),

    createPurchases: builder.mutation({
      query: (data) => ({
        url: "purchases",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["purchases"],
    }),

    updatePurchases: builder.mutation({
      query: ({ id, data }) => ({
        url: `purchases/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["purchases"],
    }),

    updatePurchasestatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `purchases/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["purchases"],
    }),

    deletePurchases: builder.mutation({
      query: (id) => ({
        url: `purchases/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["purchases"],
    }),
  }),
});

export const {
  useGetPurchasesQuery,
  useGetPurchasesProductsQuery,
  useGetPurchasesByPaginationQuery,
  useGetPurchasesByIdQuery,
  useGetPurchasesBySupplierQuery,
  useCreatePurchasesMutation,
  useUpdatePurchasesMutation,
  useUpdatePurchasestatusMutation,
  useDeletePurchasesMutation,
} = purchasesApi;
