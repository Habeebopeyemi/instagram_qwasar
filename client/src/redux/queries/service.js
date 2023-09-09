import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const instagramAPI = createApi({
  reducerPath: "instagramAPI",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/",
  }),
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
      invalidates: [{ endpointName: "allposts" }],
    }),
    deletepost: builder.mutation({
      query: (postId) => ({
        url: `deletepost/${postId}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }),
      invalidates: [{ endpointName: "allposts" }],
    }),
    likepost: builder.mutation({
      query: (payload) => ({
        url: "/like",
        method: "PUT",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }),
      invalidates: [{ endpointName: "allposts" }],
    }),
    unlikepost: builder.mutation({
      query: (payload) => ({
        url: "/unlike",
        method: "PUT",
        body: payload,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }),
      invalidates: [{ endpointName: "allposts" }],
    }),
    comment: builder.mutation({
      query: (payload) => ({
        url: "/comment",
        method: "PUT",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }),
      invalidates: [{ endpointName: "allposts" }],
    }),
    follow: builder.mutation({
      query: (userId) => ({
        url: "follow",
        method: "PUT",
        body: userId,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }),
      invalidates: [{ endpointName: "getuser" }],
    }),
    unfollow: builder.mutation({
      query: (userId) => ({
        url: "unfollow",
        method: "PUT",
        body: userId,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }),
      invalidates: [{ endpointName: "getUser" }],
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
    getuser: builder.query({
      query: (userId) => ({
        url: `user/${userId}`,
        method: "GET",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useCreatepostMutation,
  useMypostsQuery,
  useAllpostsQuery,
  useFollowingpostsQuery,
  useLikepostMutation,
  useUnlikepostMutation,
  useCommentMutation,
  useDeletepostMutation,
  useGetuserQuery,
  useFollowMutation,
  useUnfollowMutation,
} = instagramAPI;
