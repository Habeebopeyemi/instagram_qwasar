import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const instagramAPI = createApi({
  reducerPath: "instagramAPI",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/",
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (payload) => ({
        url: "signup",
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json" },
      }),
    }),
  }),
});
