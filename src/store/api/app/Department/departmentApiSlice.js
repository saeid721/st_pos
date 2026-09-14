import { apiSlice } from "../../apiSlice";

export const departmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: ({ store_id="" }) =>
        `departments?&store_id=${store_id}`,
      providesTags: ["departments"],
    }),

    getDepartmentsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "", store_id="" }) =>
        `departments/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}&store_id=${store_id}`,
      providesTags: ["departments"],
    }),

    getDepartmentsById: builder.query({
      query: (id) => `departments/${id}`,
      providesTags: ["departments"],
    }),

    createDepartments: builder.mutation({
      query: (data) => ({
        url: "departments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["departments"],
    }),

    updateDepartments: builder.mutation({
      query: ({ id, data }) => ({
        url: `departments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["departments"],
    }),

    updateDepartmentstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `departments/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["departments"],
    }),

    deleteDepartments: builder.mutation({
      query: (id) => ({
        url: `departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["departments"],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentsByPaginationQuery,
  useGetDepartmentsByIdQuery,
  useCreateDepartmentsMutation,
  useUpdateDepartmentsMutation,
  useUpdateDepartmentstatusMutation,
  useDeleteDepartmentsMutation,
} = departmentsApi;
