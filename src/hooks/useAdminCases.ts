import {
  AdminCasesFilters,
  AdminCasesPaginatedResponse,
  getAllCasesAdmin,
} from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useAdminCases = (filters: AdminCasesFilters) => {
  return useQuery<AdminCasesPaginatedResponse>({
    queryKey: ["admin-cases", filters],
    queryFn: () => getAllCasesAdmin(filters),
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });
};

// Helper function to calculate statistics from cases data
export const calculateAdminCasesStats = (cases: Array<{ status: string }>) => {
  if (!cases || cases.length === 0) {
    return {
      total: 0,
      pending: 0,
      active: 0,
      approved: 0,
      rejected: 0,
      completed: 0,
    };
  }

  return {
    total: cases.length,
    pending: cases.filter((c) => c.status === "pending").length,
    active: cases.filter((c) => c.status === "active").length,
    approved: cases.filter((c) => c.status === "approved").length,
    rejected: cases.filter((c) => c.status === "rejected").length,
    completed: cases.filter((c) => c.status === "completed").length,
  };
};
