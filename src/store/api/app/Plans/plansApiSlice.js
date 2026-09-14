import { apiSlice } from "../../apiSlice";

export const plansApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => "plans",
      providesTags: ["plans"],
    }),

    getPlansByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `plans/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["plans"],
    }),

    getPlansById: builder.query({
      query: (id) => `plans/single/${id}`,
      providesTags: ["plans"],
    }),

    createPlans: builder.mutation({
      query: (data) => ({
        url: "plans",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["plans"],
    }),

    updatePlans: builder.mutation({
      query: ({ id, data }) => ({
        url: `plans/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["plans"],
    }),

    updatePlanstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `plans/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["plans"],
    }),

    deletePlans: builder.mutation({
      query: (id) => ({
        url: `plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["plans"],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetPlansByPaginationQuery,
  useGetPlansByIdQuery,
  useLazyGetPlansByIdQuery,
  useCreatePlansMutation,
  useUpdatePlansMutation,
  useUpdatePlanstatusMutation,
  useDeletePlansMutation,
} = plansApi;
