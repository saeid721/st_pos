export const SystemSettingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSystemSettings: builder.query({
      query: () => `system-settings/first`,
      providesTags: ["system-settings"],
    }),

    updateSystemSettings: builder.mutation({
      query: (formData) => ({
        url: `system-settings/update`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["system-settings"],
    }),
  }),
});

export const {
  useGetSystemSettingsQuery,
  useUpdateSystemSettingsMutation,
} = SystemSettingsApi;
