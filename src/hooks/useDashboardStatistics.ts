import { DashboardStatistics, getDashboardStatistics } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useDashboardStatistics = () => {
  return useQuery<DashboardStatistics>({
    queryKey: ["dashboard-statistics"],
    queryFn: getDashboardStatistics,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes (gcTime replaces cacheTime in newer versions)
  });
};
