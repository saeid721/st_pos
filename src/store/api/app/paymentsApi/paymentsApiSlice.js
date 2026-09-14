import { apiSlice } from "../../apiSlice";

export const loanPaymentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoanPayments: builder.query({
      query: () => "loan-payments",
      providesTags: ["loan-payments"],
    }),

    getLoanPaymentsByPagination: builder.query({
      query: ({ page = 1, limit = 10, order = "desc", search = "" }) =>
        `loan-payments/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
      providesTags: ["loan-payments"],
    }),

    getLoanPaymentsById: builder.query({
      query: (id) => `loan-payments/${id}`,
      providesTags: ["loan-payments"],
    }),
    getAllPaymentsByLoanId: builder.query({
      query: ({loan_id}) => `loan-payments?loan_id=${loan_id}`,
      providesTags: ["loan-payments"],
    }),

    createLoanPayments: builder.mutation({
      query: (data) => ({
        url: "loan-payments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["loan-payments"],
    }),

    updateLoanPayments: builder.mutation({
      query: ({ id, data }) => ({
        url: `loan-payments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["loan-payments"],
    }),

    updateLoanPaymentstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `loan-payments/${id}/status?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["loan-payments"],
    }),

    deleteLoanPayments: builder.mutation({
      query: (id) => ({
        url: `loan-payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["loan-payments"],
    }),
  }),
});

export const {
  useGetLoanPaymentsQuery,
  useGetLoanPaymentsByPaginationQuery,
  useGetLoanPaymentsByIdQuery,
  useGetAllPaymentsByLoanIdQuery,
  useCreateLoanPaymentsMutation,
  useUpdateLoanPaymentsMutation,
  useUpdateLoanPaymentstatusMutation,
  useDeleteLoanPaymentsMutation,
} = loanPaymentsApiSlice;
