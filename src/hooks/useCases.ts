import {
  casesApi,
  type CaseData,
  type CaseResponse,
  type PublishCaseToFacebookDto,
  type PublishCaseToTelegramDto,
} from "@/lib/cases-api";
import { useUser } from "@/stores/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Query keys
export const caseKeys = {
  all: ["cases"] as const,
  hospital: (hospitalId: string) =>
    [...caseKeys.all, "hospital", hospitalId] as const,
  case: (caseId: string) => [...caseKeys.all, "case", caseId] as const,
};

// Hook to get cases for a specific hospital
export function useHospitalCases(hospitalId?: string) {
  return useQuery({
    queryKey: caseKeys.hospital(hospitalId || ""),
    queryFn: () => casesApi.getHospitalCases(hospitalId!),
    enabled: !!hospitalId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });
}

// Hook to get a specific case by ID
export const useCase = (id: string) => {
  return useQuery({
    queryKey: ["case", id],
    queryFn: () => casesApi.getCaseById(id),
    enabled: !!id,
  });
};

// Hook to create a new case
export function useCreateCase() {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation({
    mutationFn: (caseData: CaseData) => casesApi.createCase(caseData),
    onSuccess: (data) => {
      // Invalidate and refetch hospital cases
      if (user?.id) {
        queryClient.invalidateQueries({
          queryKey: caseKeys.hospital(user.id),
        });
      }

      toast.success("تم إنشاء الحالة بنجاح", {
        description: data.message,
      });
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "حدث خطأ أثناء إنشاء الحالة";
      toast.error("فشل في إنشاء الحالة", {
        description: errorMessage,
      });
    },
  });
}

// Hook to update a case
export const useUpdateCase = () => {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation({
    mutationFn: ({
      caseId,
      data,
    }: {
      caseId: string;
      data: Partial<CaseData>;
    }) => casesApi.updateCase(caseId, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch hospital cases
      if (user?.id) {
        queryClient.invalidateQueries({
          queryKey: caseKeys.hospital(user.id),
        });
      }

      // Invalidate specific case
      queryClient.invalidateQueries({
        queryKey: caseKeys.case(variables.caseId),
      });

      toast.success("تم تحديث الحالة بنجاح");
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "حدث خطأ أثناء تحديث الحالة";
      toast.error("فشل في تحديث الحالة", {
        description: errorMessage,
      });
    },
  });
};

// Hook to delete a case
export function useDeleteCase() {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation({
    mutationFn: (caseId: string) => casesApi.deleteCase(caseId),
    onSuccess: () => {
      // Invalidate and refetch hospital cases
      if (user?.id) {
        queryClient.invalidateQueries({
          queryKey: caseKeys.hospital(user.id),
        });
      }

      toast.success("تم حذف الحالة بنجاح");
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "حدث خطأ أثناء حذف الحالة";
      toast.error("فشل في حذف الحالة", {
        description: errorMessage,
      });
    },
  });
}

// Hook to publish case to Facebook
export function usePublishCaseToFacebook() {
  return useMutation({
    mutationFn: ({
      caseId,
      publishOptions,
    }: {
      caseId: string;
      publishOptions: PublishCaseToFacebookDto;
    }) => casesApi.publishCaseToFacebook(caseId, publishOptions),
    onSuccess: (data) => {
      toast.success("تم نشر الحالة على فيسبوك بنجاح", {
        description: `معرف المنشور: ${data.postId}`,
      });
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "حدث خطأ أثناء نشر الحالة على فيسبوك";
      toast.error("فشل في نشر الحالة على فيسبوك", {
        description: errorMessage,
      });
    },
  });
}

// Hook to publish case to Telegram
export function usePublishCaseToTelegram() {
  return useMutation({
    mutationFn: ({
      caseId,
      publishOptions,
    }: {
      caseId: string;
      publishOptions: PublishCaseToTelegramDto;
    }) => casesApi.publishCaseToTelegram(caseId, publishOptions),
    onSuccess: (data) => {
      toast.success("تم نشر الحالة على تليجرام بنجاح", {
        description: data.message,
      });
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "حدث خطأ أثناء نشر الحالة على تليجرام";
      toast.error("فشل في نشر الحالة على تليجرام", {
        description: errorMessage,
      });
    },
  });
}

// Utility function to calculate dashboard stats from cases
export function calculateDashboardStats(cases: CaseResponse[]) {
  if (!cases || cases.length === 0) {
    return {
      totalCases: 0,
      pendingCases: 0,
      completedCases: 0,
      emergencyCases: 0,
      totalDonations: 0,
      activeDonations: 0,
      totalBags: 0,
    };
  }

  const totalCases = cases.length;
  const pendingCases = cases.filter((c) => c.status === "pending").length;
  const completedCases = cases.filter((c) => c.status === "completed").length;

  // Calculate emergency cases (cases created in last 24 hours or with high urgency)
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const emergencyCases = cases.filter(
    (c) => new Date(c.createdAt) > twentyFourHoursAgo || c.bagsNeeded >= 5 // Consider 5+ bags as emergency
  ).length;

  // Calculate donation stats
  const allDonations = cases.flatMap((c) => c.donations || []);
  const totalDonations = allDonations.length;
  const activeDonations = allDonations.filter((d) => d.isActive).length;

  // Calculate total bags donated (450ml = 1 bag)
  const totalBags = Math.floor(
    allDonations.reduce((total, donation) => {
      const quantity = Number(donation.quantity) || 0;
      return total + (isNaN(quantity) ? 0 : quantity);
    }, 0) / 450
  );

  return {
    totalCases,
    pendingCases,
    completedCases,
    emergencyCases,
    totalDonations,
    activeDonations,
    totalBags,
  };
}

// Utility function to get blood type statistics from cases
export function getBloodTypeStats(cases: CaseResponse[]) {
  if (!cases || cases.length === 0) {
    return {};
  }

  const bloodTypes = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
    "Unknown",
  ];
  const stats: Record<string, { needed: number; fulfilled: number }> = {};

  bloodTypes.forEach((type) => {
    const typeCases = cases.filter((c) => c.bloodType === type);
    const needed = typeCases.reduce((sum, c) => sum + c.bagsNeeded, 0);
    const fulfilled = typeCases
      .filter((c) => c.status === "completed")
      .reduce((sum, c) => sum + c.bagsNeeded, 0);

    stats[type] = { needed, fulfilled };
  });

  return stats;
}

// Hook to update case status
export const useUpdateCaseStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      caseId,
      status,
      description,
    }: {
      caseId: string;
      status: string;
      description: string;
    }) => {
      return casesApi.updateCaseStatusByObserver(caseId, status, description);
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch case data
      queryClient.invalidateQueries({ queryKey: ["case", variables.caseId] });
      queryClient.invalidateQueries({ queryKey: ["observer-cases"] });
    },
  });
};

export interface MyCityCasesFilters {
  page?: number;
  limit?: number;
  bloodType?: string;
  donationType?: string;
}

export interface MyCityCasesResponse {
  cases: CaseResponse[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  userCity: {
    id: string;
    nameEn: string | null;
    nameAr: string | null;
  };
  filters: {
    bloodType: string | null;
    donationType: string | null;
  };
}

/**
 * Hook to fetch active cases in user's city
 */
export function useActiveCasesInMyCity(filters: MyCityCasesFilters = {}) {
  const { page = 1, limit = 12, bloodType, donationType } = filters;

  return useQuery<MyCityCasesResponse>({
    queryKey: ["active-cases-my-city", page, limit, bloodType, donationType],
    queryFn: () =>
      casesApi.getActiveCasesInMyCity(page, limit, bloodType, donationType),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Calculate statistics from cases data
 */
export function calculateMyCityCasesStats(cases: CaseResponse[]) {
  const stats = {
    total: cases.length,
    byBloodType: {} as Record<string, number>,
    byDonationType: {} as Record<string, number>,
    urgent: 0,
    recent: 0, // cases created in last 24 hours
  };

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  cases.forEach((case_) => {
    // Count by blood type
    stats.byBloodType[case_.bloodType] =
      (stats.byBloodType[case_.bloodType] || 0) + 1;

    // Count by donation type
    stats.byDonationType[case_.donationType] =
      (stats.byDonationType[case_.donationType] || 0) + 1;

    // Count urgent cases (assuming urgency based on needed bags and donations)
    if (case_.bagsNeeded > 0 && case_.donations.length < case_.bagsNeeded / 2) {
      stats.urgent++;
    }

    // Count recent cases
    if (new Date(case_.createdAt) > oneDayAgo) {
      stats.recent++;
    }
  });

  return stats;
}
