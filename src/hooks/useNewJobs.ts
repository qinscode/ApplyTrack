import { useJobList } from "./useJobList";

export function useNewJobs() {
  return useJobList({
    apiEndpoint: "/Jobs/new",
    defaultStatus: "New",
  });
}
