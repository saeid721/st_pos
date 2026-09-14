import { apiSlice } from "../../apiSlice";


export const footerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getFooterByFooterType: builder.query({
            query: ({footer_type}) => `footer/footer-type/${footer_type}`,
            providesTags: ['footer'],
        }),

        

        // getGenresByPagination: builder.query({
        //     query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
        //       `genres/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
        //     providesTags: ['genres'],
        //   }),

        getFooterById: builder.query({
            query: (id) => `footer/${id}`,
            providesTags: ['footer'],
        }),

        createFooter: builder.mutation({
            query: (data) => ({
                url: 'footer',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['footer'],
        }),

        updateFooter: builder.mutation({
            query: ({ id, data }) => ({
                url: `footer/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['footer'],
        }),

        updateFootertatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `footer/${id}/status?status=${status}`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['footer'],
        }),

        deleteFooter: builder.mutation({
            query: (id) => ({
                url: `footer/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['footer'],
        }),
    }),
});

export const {
    useGetFooterByFooterTypeQuery,
    useCreateFooterMutation,
    useDeleteFooterMutation,
    useGetFooterByIdQuery,
    useUpdateFooterMutation,
    useUpdateFootertatusMutation
 
} = footerApiSlice;
