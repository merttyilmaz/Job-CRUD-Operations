import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { stat } from "fs";
import { v4 as uuidv4 } from "uuid";

type Job = {
  id: string;
  name?: string;
  priority: string;
};

type JobStateSlice = {
  jobs: Job[];
  job: Job;
};

const initialState: JobStateSlice = {
  jobs: [],
  job: {
    id: "",
    name: "",
    priority: "",
  },
};

export const jobSlice = createSlice({
  name: "jobSlice",
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs = [
        ...state.jobs,
        {
          id: uuidv4(),
          name: action.payload.name,
          priority: action.payload.priority,
        },
      ];
    },
    retrieveJob: (state, action: PayloadAction<string>) => {
      state.job = state.jobs.find((job) => job.id === action.payload)!;
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      const { id, priority } = action.payload;
      const existingJob = state.jobs.find((job) => job.id === id);
      if (existingJob) {
        existingJob.priority = priority;
      }
    },
    removeJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { addJob, retrieveJob, updateJob, removeJob } = jobSlice.actions;

export default jobSlice.reducer;
