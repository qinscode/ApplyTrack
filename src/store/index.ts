import { configureStore } from '@reduxjs/toolkit';
import jobStatusReducer from './jobStatusSlice';

export const store = configureStore({
  reducer: {
    jobStatus: jobStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;