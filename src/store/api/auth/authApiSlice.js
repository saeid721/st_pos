import { apiSlice } from '../apiSlice';

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: 'admins/login',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['admins'],
		}),
		loginUser: builder.mutation({
			query: (data) => ({
				url: 'store-users/login',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['users'],
		}),
	}),
});

export const { useLoginMutation, useLoginUserMutation } = authApi;
