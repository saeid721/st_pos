import { apiSlice } from "../../apiSlice";

export const applicationSettingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationSettings: builder.query({
      query: () => "application-settings",
      providesTags: ["ApplicationSettings"],
    }),

    updateApplicationSettings: builder.mutation({
      query: (data) => ({
        url: "application-settings",
        method: "PUT", // Or "POST" depending on your use case
        body: data,
      }),
      invalidatesTags: ["ApplicationSettings"],
    }),
  }),
});

export const {
  useGetApplicationSettingsQuery,
  useUpdateApplicationSettingsMutation, // Renamed to reflect the action better
} = applicationSettingsApi;
