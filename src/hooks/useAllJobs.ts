import { useJobList } from "./useJobList";

export function useAllJobs() {
  return useJobList({
    apiEndpoint: "/Jobs/search",
    defaultStatus: "New"
  });
} 