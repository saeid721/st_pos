import { apiSlice } from '../../apiSlice';

export const rolesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRoles: builder.query({
			query: () => 'roles',
			providesTags: ['roles'],
		}),

		getRolesById: builder.query({
			query: (id) => `roles/${id}`,
			providesTags: ['roles'],
		}),

		createRoles: builder.mutation({
			query: (data) => ({
				url: 'roles',
				method: 'POST',
				body: data,
				formData: true,
			}),
			invalidatesTags: ['roles'],
		}),

		updateRoles: builder.mutation({
			query: ({ id, data }) => ({
				url: `roles/${id}`,
				method: 'PUT',
				body: data,
				formData: true,
			}),
			invalidatesTags: ['roles'],
		}),

		assignRolePermissions: builder.mutation({
			query: ({ id, data }) => ({
				url: `roles/${id}/permissions`,
				method: 'POST',
				body: data,
				// formData: true,
			}),
			invalidatesTags: ['roles', 'users'],
		}),

		getRolePermissionByRoleId: builder.query({
			query: (id) => `roles/${id}/permissions`,
			providesTags: ['roles'],
		}),

		deleteRoles: builder.mutation({
			query: (id) => ({
				url: `roles/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['roles'],
		}),
	}),
});

export const {
	useGetRolesQuery,
	useGetRolesByIdQuery,
	useCreateRolesMutation,
	useUpdateRolesMutation,
	useAssignRolePermissionsMutation,
	useGetRolePermissionByRoleIdQuery,
	useLazyGetRolePermissionByRoleIdQuery,
	useDeleteRolesMutation,
} = rolesApi;
