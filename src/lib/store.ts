import { configureStore } from "@reduxjs/toolkit";
import { marketPlaceApi } from "./services/getAllProducts";
import { nafathApi } from "./services/nafathApi";
import { lookupApi } from "./services/lookupApi"; // ADD THIS

export const store = configureStore({
  reducer: {
    [marketPlaceApi.reducerPath]: marketPlaceApi.reducer,
    [nafathApi.reducerPath]: nafathApi.reducer,
    [lookupApi.reducerPath]: lookupApi.reducer, // ADD THIS
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      marketPlaceApi.middleware,
      nafathApi.middleware,
      lookupApi.middleware // ADD THIS
    ),
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
