import api from "./axios";

export type DailyCount = {
  date: string;
  count: number;
};

export type StatusCounts = {
  applied: number;
  reviewed: number;
  interviewing: number;
  technicalAssessment: number;
  offered: number;
};

export type DailyStatistic = {
  date: string;
  activeJobsCount: number;
  newJobsCount: number;
};

export type JobsStatisticsResponse = {
  dailyStatistics: DailyStatistic[];
  days: number;
};

export const statisticsApi = {
  getDailyApplicationCounts: async (): Promise<DailyCount[]> => {
    const response = await api.get("/userjobs/last-seven-days/daily-counts");
    return response.data;
  },

  getStatusCounts: async (): Promise<StatusCounts> => {
    const response = await api.get("/userjobs/cumulative-status-counts");
    return response.data;
  },

  getJobsStatistics: async (days: number): Promise<JobsStatisticsResponse> => {
    const response = await api.get(`/jobs/statistics?days=${days}`);
    return response.data;
  },
};
