import { configureStore } from "@reduxjs/toolkit";
import { marketPlaceApi } from "./services/getAllProducts";

export const store = configureStore({
  reducer: {
    [marketPlaceApi.reducerPath]: marketPlaceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(marketPlaceApi.middleware),
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
