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
    signin: builder.mutation({
      query: (payload) => ({
        url: "signin",
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json" },
      }),
    }),
    createpost: builder.mutation({
      query: (payload) => ({
        url: "createpost",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }),
    }),
    myposts: builder.query({
      query: () => ({
        url: "myposts",
        method: "GET",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),
    allposts: builder.query({
      query: () => ({
        url: "allposts",
        method: "GET",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),
    followingposts: builder.query({
      query: () => ({
        url: "followingposts",
        method: "GET",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useMypostsQuery,
  useAllpostsQuery,
  useFollowingpostsQuery,
} = instagramAPI;
