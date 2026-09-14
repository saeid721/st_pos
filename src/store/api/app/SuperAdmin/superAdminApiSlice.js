import { apiSlice } from '../../apiSlice';

export const adminsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSuperAdmins: builder.query({
			query: () => 'admins',
			providesTags: ['admins'],
		}),

		getSuperAdminMe: builder.query({
			query: () => 'admins/me',
			providesTags: ['admins'],
		}),

		getSuperAdminsByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
				`admins/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
			providesTags: ['admins'],
		}),

		getSuperAdminsById: builder.query({
			query: (id) => `admins/${id}`,
			providesTags: ['admins'],
		}),

		getPermissions: builder.query({
			query: () => 'admins/permissions/me',
			providesTags: ['admins'],
		}),

		createSuperAdmins: builder.mutation({
			query: (data) => ({
				url: 'admins',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['admins'],
		}),


		changePassword: builder.mutation({
			query: (data) => ({
				url: 'admins/change-password',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['admins'],
		}),



		updateSuperAdmins: builder.mutation({
			query: ({ id, data }) => ({
				url: `admins/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['admins'],
		}),

		updateSuperAdminstatus: builder.mutation({
			query: ({ id, status }) => ({
				url: `admins/${id}/status?status=${status}`,
				method: 'PUT',
				body: { status },
			}),
			invalidatesTags: ['admins'],
		}),

		deleteSuperAdmins: builder.mutation({
			query: (id) => ({
				url: `admins/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['admins'],
		}),
	}),
});

export const {
	useGetSuperAdminsQuery,
	useGetSuperAdminMeQuery,
	useGetSuperAdminsByPaginationQuery,
	useGetSuperAdminsByIdQuery,
	useGetPermissionsQuery,
	useLazyGetPermissionsQuery,
	useCreateSuperAdminsMutation,
	useChangePasswordMutation,
	useUpdateSuperAdminsMutation,
	useUpdateSuperAdminstatusMutation,
	useDeleteSuperAdminsMutation,
} = adminsApi;
