import { apiSlice } from "../../apiSlice";

export const employeesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "employees",
      providesTags: ["employees"],
    }),

    getEmployeesByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `employees/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["employees"],
    }),

    getEmployeesById: builder.query({
      query: (id) => `employees/${id}`,
      providesTags: ["employees"],
    }),

    createEmployees: builder.mutation({
      query: (data) => ({
        url: "employees",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["employees"],
    }),

    updateEmployees: builder.mutation({
      query: ({ id, data }) => ({
        url: `employees/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["employees"],
    }),

    updateEmployeestatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `employees/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["employees"],
    }),

    deleteEmployees: builder.mutation({
      query: (id) => ({
        url: `employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employees"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeesByPaginationQuery,
  useGetEmployeesByIdQuery,
  useCreateEmployeesMutation,
  useUpdateEmployeesMutation,
  useUpdateEmployeestatusMutation,
  useDeleteEmployeesMutation,
} = employeesApi;
