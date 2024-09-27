import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JobStatusCount {
  status: string;
  count: number;
}

interface JobStatusState {
  statusCounts: JobStatusCount[];
  totalJobsCount: number;
  newJobsCount: number;
}

const initialState: JobStatusState = {
  statusCounts: [],
  totalJobsCount: 0,
  newJobsCount: 0,
};

const jobStatusSlice = createSlice({
  name: 'jobStatus',
  initialState,
  reducers: {
    setJobStatusCounts: (state, action: PayloadAction<JobStatusState>) => {
      state.statusCounts = action.payload.statusCounts;
      state.totalJobsCount = action.payload.totalJobsCount;
      state.newJobsCount = action.payload.newJobsCount;
    },
    // 移除 updateJobCount action
  },
});

export const { setJobStatusCounts } = jobStatusSlice.actions;
export default jobStatusSlice.reducer;