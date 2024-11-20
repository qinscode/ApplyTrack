import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type JobStatusCount = {
  status: string;
  count: number;
};

type JobStatusState = {
  statusCounts: JobStatusCount[];
  totalJobsCount: number;
  newJobsCount: number;
};

const initialState: JobStatusState = {
  statusCounts: [],
  totalJobsCount: 0,
  newJobsCount: 0,
};

const jobStatusSlice = createSlice({
  name: "jobStatus",
  initialState,
  reducers: {
    setJobStatusCounts: (
      state,
      action: PayloadAction<{
        statusCounts: JobStatusCount[];
        totalJobsCount: number;
        newJobsCount: number;
      }>,
    ) => {
      state.statusCounts = action.payload.statusCounts;
      state.totalJobsCount = action.payload.totalJobsCount;
      state.newJobsCount = action.payload.newJobsCount;
    },
  },
});

export const { setJobStatusCounts } = jobStatusSlice.actions;
export default jobStatusSlice.reducer;
