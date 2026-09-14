import { apiSlice } from "../../apiSlice";

export const branchesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBranches: builder.query({
      query: ({ store_id }) => `branches?store_id=${store_id}`,
      providesTags: ["branch"],
    }),

    getBranchesByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "", store_id = "" }) =>
        `branches/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["branches"],
    }),

    getBranchesById: builder.query({
      query: (id) => `branches/${id}`,
      providesTags: ["branches"],
    }),

    createBranches: builder.mutation({
      query: (data) => ({
        url: "branches",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["branches"],
    }),

    updateBranches: builder.mutation({
      query: ({ id, data }) => ({
        url: `branches/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["branches"],
    }),

    updateBranchestatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `branches/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["branches"],
    }),

    deleteBranches: builder.mutation({
      query: (id) => ({
        url: `branches/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["branches"],
    }),
  }),
});

export const {
  useGetBranchesQuery,
  useGetBranchesByPaginationQuery,
  useGetBranchesByIdQuery,
  useCreateBranchesMutation,
  useUpdateBranchesMutation,
  useUpdateBranchestatusMutation,
  useDeleteBranchesMutation,
} = branchesApi;
