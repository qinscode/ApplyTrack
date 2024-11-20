import { configureStore } from "@reduxjs/toolkit";
import jobStatusReducer from "./jobStatusSlice";

export const store = configureStore({
  reducer: {
    jobStatus: jobStatusReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["your-action-type"],
        ignoredPaths: ["some.path", "config.themesConfig.activeTheme"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
