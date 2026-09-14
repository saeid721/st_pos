import { apiSlice } from "../../apiSlice";

export const suppliersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSuppliers: builder.query({
      query: ({ store_id="" }) =>
        `suppliers?store_id=${store_id}`,
      providesTags: ["suppliers"],
    }),

    getSuppliersByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "", store_id="" }) =>
        `suppliers/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}&store_id=${store_id}`,
      providesTags: ["suppliers"],
    }),

    getSuppliersById: builder.query({
      query: (id) => `suppliers/${id}`,
      providesTags: ["suppliers"],
    }),

    createSuppliers: builder.mutation({
      query: (data) => ({
        url: "suppliers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["suppliers"],
    }),

    updateSuppliers: builder.mutation({
      query: ({ id, data }) => ({
        url: `suppliers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["suppliers"],
    }),

    updateSupplierstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `suppliers/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["suppliers"],
    }),

    deleteSuppliers: builder.mutation({
      query: (id) => ({
        url: `suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["suppliers"],
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useGetSuppliersByPaginationQuery,
  useGetSuppliersByIdQuery,
  useCreateSuppliersMutation,
  useUpdateSuppliersMutation,
  useUpdateSupplierstatusMutation,
  useDeleteSuppliersMutation,
} = suppliersApi;
