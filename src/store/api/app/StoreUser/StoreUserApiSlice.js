import { apiSlice } from '../../apiSlice';

export const storeusersApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getStoreUsers: builder.query({
			query: () => 'store-users',
			providesTags: ['storeUsers'],
		}),

		getAdminMe: builder.query({
			query: () => 'store-users/me',
			providesTags: ['storeUsers'],
		}),

		getStoreUsersByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
				`store-users/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
			providesTags: ['storeUsers'],
		}),

		getStoreUsersById: builder.query({
			query: (id) => `store-users/${id}`,
			providesTags: ['storeUsers'],
		}),

		getStoreUserPermissions: builder.query({
			query: () => 'store-users/permissions/me',
			providesTags: ['storeUsers'],
		}),

		createStoreUsers: builder.mutation({
			query: (data) => ({
				url: 'store-users',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['storeUsers'],
		}),


		changePassword: builder.mutation({
			query: (data) => ({
				url: 'store-users/change-password',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['storeUsers'],
		}),



		updateStoreUsers: builder.mutation({
			query: ({ id, data }) => ({
				url: `store-users/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['storeUsers'],
		}),

		updateStoreUserstatus: builder.mutation({
			query: ({ id, status }) => ({
				url: `store-users/${id}/status?status=${status}`,
				method: 'PUT',
				body: { status },
			}),
			invalidatesTags: ['storeUsers'],
		}),

		deleteStoreUsers: builder.mutation({
			query: (id) => ({
				url: `store-users/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['storeUsers'],
		}),
	}),
});

export const {
	useGetStoreUsersQuery,
	useGetAdminMeQuery,
	useGetStoreUsersByPaginationQuery,
	useGetStoreUsersByIdQuery,
	useGetStoreUserPermissionsQuery,
	useLazyGetStoreUserPermissionsQuery,
	useCreateStoreUsersMutation,
	useChangePasswordMutation,
	useUpdateStoreUsersMutation,
	useUpdateStoreUserstatusMutation,
	useDeleteStoreUsersMutation,
} = storeusersApi;
