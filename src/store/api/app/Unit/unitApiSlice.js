import { apiSlice } from "../../apiSlice";

export const unitsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUnits: builder.query({
      query: ({ store_id="" }) =>
        `units?store_id=${store_id}`,
      providesTags: ["units"],
    }),

    getUnitsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "", store_id="" }) =>
        `units/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}&store_id=${store_id}`,
      providesTags: ["units"],
    }),

    getUnitsById: builder.query({
      query: (id) => `units/${id}`,
      providesTags: ["units"],
    }),

    createUnits: builder.mutation({
      query: (data) => ({
        url: "units",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["units"],
    }),

    updateUnits: builder.mutation({
      query: ({ id, data }) => ({
        url: `units/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["units"],
    }),

    updateUnitstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `units/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["units"],
    }),

    deleteUnits: builder.mutation({
      query: (id) => ({
        url: `units/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["units"],
    }),
  }),
});

export const {
  useGetUnitsQuery,
  useGetUnitsByPaginationQuery,
  useGetUnitsByIdQuery,
  useCreateUnitsMutation,
  useUpdateUnitsMutation,
  useUpdateUnitstatusMutation,
  useDeleteUnitsMutation,
} = unitsApi;
