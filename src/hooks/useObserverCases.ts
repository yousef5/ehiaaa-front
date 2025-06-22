import { observerCasesApi, type ObserverCasesFilters } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to fetch observer area cases with pagination and filtering
 */
export const useObserverAreaCases = (filters: ObserverCasesFilters) => {
  return useQuery({
    queryKey: ["observer-area-cases", filters],
    queryFn: () => observerCasesApi.getObserverAreaCases(filters),
    staleTime: 30000, // Data is fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });
};

/**
 * Calculate dashboard statistics from cases data
 */
export const calculateObserverCasesStats = (
  cases: import("@/lib/cases-api").CaseResponse[]
) => {
  const pending = cases.filter((c) => c.status === "pending").length;
  const approved = cases.filter((c) => c.status === "approved").length;
  const completed = cases.filter((c) => c.status === "completed").length;
  const rejected = cases.filter((c) => c.status === "rejected").length;

  return {
    total: cases.length,
    pending,
    approved,
    completed,
    rejected,
  };
};
