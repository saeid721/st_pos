import envConfig from "@/configs/envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: [
    "Slider",
    "genres",
    "qualities",
    "subtitles",
    "tags",
    "blogs",
    "favoritepersonalities",
    "roles",
    "users",
    "movies",
    "series",
    "seasons",
    "episodes",
    "application-settings",
    "applicationfeatures",
    "homesectiondetails",
    "homesection",
    "subscribers",
    "season",
    "plans",
    "socials",
    "footer",
    "report",
    "rolesStore",
    "categories",
    "subCategories",
    "plans",
    "features",
    "rolesStore",
    "suppliers",
    "brands",
    "units",
    "taxs",
    "accounts",
    "departments",
    "branches",
    "salary-increments",
    "clients",
    "stockProducts",
    "invoices",
    "purchases",
    "expense-category",
    "expense-sub-category",
    "expenses",
    "loan-authority",
    "currency",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState().auth;

      if (auth?.accessToken) {
        headers.set("Authorization", `Bearer ${auth?.accessToken}`);
      }
    },
  }),
  endpoints: (builder) => ({}),
});
