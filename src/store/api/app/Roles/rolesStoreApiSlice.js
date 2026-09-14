import { apiSlice } from '../../apiSlice';

export const rolesstoreApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRolesStore: builder.query({
			query: () => 'store-roles',
			providesTags: ['rolesStore'],
		}),

		getRolesStoreById: builder.query({
			query: (id) => `store-roles/${id}`,
			providesTags: ['rolesStore'],
		}),

		createRolesStore: builder.mutation({
			query: (data) => ({
				url: 'store-roles',
				method: 'POST',
				body: data,
				formData: true,
			}),
			invalidatesTags: ['rolesStore'],
		}),

		updateRolesStore: builder.mutation({
			query: ({ id, data }) => ({
				url: `store-roles/${id}`,
				method: 'PUT',
				body: data,
				formData: true,
			}),
			invalidatesTags: ['rolesStore'],
		}),

		assignRolePermissionsStore: builder.mutation({
			query: ({ id, data }) => ({
				url: `store-roles/${id}/permissions`,
				method: 'POST',
				body: data,
				// formData: true,
			}),
			invalidatesTags: ['rolesStore', 'stores'],
		}),

		getRolePermissionByRoleId: builder.query({
			query: (id) => `store-roles/${id}/permissions`,
			providesTags: ['rolesStore'],
		}),
		updateRolesStorestatus: builder.mutation({
			query: ({ id, status }) => ({
			  url: `store-roles/${id}/status?status=${status}`,
			  method: "PUT",
			  body: { status },
			}),
			invalidatesTags: ["rolesStore"],
		  }),

		deleteRolesStore: builder.mutation({
			query: (id) => ({
				url: `store-roles/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['rolesStore'],
		}),
	}),
});

export const {
	useGetRolesStoreQuery,
	useGetRolesStoreByIdQuery,
	useCreateRolesStoreMutation,
	useUpdateRolesStoreMutation,
	useAssignRolePermissionsStoreMutation,
	useGetRolePermissionByRoleIdQuery,
	useLazyGetRolePermissionByRoleIdQuery,
	useUpdateRolesStorestatusMutation,
	useDeleteRolesStoreMutation,
} = rolesstoreApi;
