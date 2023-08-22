import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { instagramAPI } from "../queries/service";

export const store = configureStore({
  reducer: {
    [instagramAPI.reducerPath]: instagramAPI.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(instagramAPI.middleware),
});

setupListeners(store.dispatch);
