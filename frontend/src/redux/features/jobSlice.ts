import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IJob } from '../api/types';

interface IJobState {
  jobsToShow: IJob[];
}

const initialState: IJobState = {
  jobsToShow: [],
};

export const jobSlice = createSlice({
  initialState,
  name: 'jobSlice',
  reducers: {
    setJobsToShow: (state, action: PayloadAction<IJob[]>) => {
      state.jobsToShow = action.payload;
    },
  },
});

export default jobSlice.reducer;

export const { setJobsToShow } = jobSlice.actions;
