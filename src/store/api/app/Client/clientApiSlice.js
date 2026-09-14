import { apiSlice } from "../../apiSlice";

export const clientsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: ({ store_id="" }) =>
        `clients?store_id=${store_id}`,
      providesTags: ["clients"],
    }),

    getClientsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "", store_id }) =>
        `clients/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}&store_id=${store_id}`,
      providesTags: ["clients"],
    }),

    getClientsById: builder.query({
      query: (id) => `clients/${id}`,
      providesTags: ["clients"],
    }),

    createClients: builder.mutation({
      query: (data) => ({
        url: "clients",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["clients"],
    }),

    updateClients: builder.mutation({
      query: ({ id, data }) => ({
        url: `clients/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["clients"],
    }),

    updateClientstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `clients/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["clients"],
    }),

    deleteClients: builder.mutation({
      query: (id) => ({
        url: `clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["clients"],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientsByPaginationQuery,
  useGetClientsByIdQuery,
  useCreateClientsMutation,
  useUpdateClientsMutation,
  useUpdateClientstatusMutation,
  useDeleteClientsMutation,
} = clientsApi;
