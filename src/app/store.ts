import { configureStore } from "@reduxjs/toolkit";
import fileSystemReducer from "../features/fileSystem/fileSystemSlice";

export const store = configureStore({
  reducer: {
    fileSystem: fileSystemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
