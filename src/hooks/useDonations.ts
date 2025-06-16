import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-client";

// =======================================================================================
// 🩸 BLOOD DONATION HOOKS - React Query Integration
// =======================================================================================
//
// Custom hooks for managing blood donation data:
// ✨ Fetching donation campaigns and centers
// 🔄 Managing donation submissions and updates
// 📊 Real-time blood inventory tracking
// 🎯 Optimistic updates for better UX
//
// =======================================================================================

// Types for blood donation data
export interface BloodDonation {
  id: string;
  donorId: string;
  donorName: string;
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  donationDate: string;
  location: string;
  status: "pending" | "approved" | "completed" | "rejected";
  volume: number; // in ml
  notes?: string;
}

export interface DonationCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  workingHours: {
    [key: string]: { open: string; close: string };
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  urgentBloodTypes: string[];
}

export interface BloodInventory {
  bloodType: string;
  availableUnits: number;
  expiringUnits: number;
  urgencyLevel: "low" | "medium" | "high" | "critical";
  lastUpdated: string;
}

// =======================================================================================
// 🔍 QUERY HOOKS - Data Fetching
// =======================================================================================

// Fetch all donations with optional filtering
export const useDonations = (filters?: {
  bloodType?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}) => {
  return useQuery({
    queryKey: queryKeys.donations.list(JSON.stringify(filters || {})),
    queryFn: async (): Promise<BloodDonation[]> => {
      // Replace with your actual API endpoint
      const params = new URLSearchParams();
      if (filters?.bloodType) params.append("bloodType", filters.bloodType);
      if (filters?.status) params.append("status", filters.status);
      if (filters?.dateFrom) params.append("dateFrom", filters.dateFrom);
      if (filters?.dateTo) params.append("dateTo", filters.dateTo);

      const response = await fetch(`/api/donations?${params.toString()}`);
      if (!response.ok) {
        throw new Error("فشل في تحميل بيانات التبرعات");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Fetch single donation details
export const useDonation = (donationId: string) => {
  return useQuery({
    queryKey: queryKeys.donations.detail(donationId),
    queryFn: async (): Promise<BloodDonation> => {
      const response = await fetch(`/api/donations/${donationId}`);
      if (!response.ok) {
        throw new Error("فشل في تحميل تفاصيل التبرع");
      }
      return response.json();
    },
    enabled: !!donationId,
  });
};

// Fetch donation centers
export const useDonationCenters = (location?: { lat: number; lng: number }) => {
  return useQuery({
    queryKey: queryKeys.centers.list(JSON.stringify(location || {})),
    queryFn: async (): Promise<DonationCenter[]> => {
      const params = new URLSearchParams();
      if (location) {
        params.append("lat", location.lat.toString());
        params.append("lng", location.lng.toString());
      }

      const response = await fetch(`/api/centers?${params.toString()}`);
      if (!response.ok) {
        throw new Error("فشل في تحميل مراكز التبرع");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Fetch blood inventory
export const useBloodInventory = () => {
  return useQuery({
    queryKey: queryKeys.inventory.bloodTypes(),
    queryFn: async (): Promise<BloodInventory[]> => {
      const response = await fetch("/api/inventory/blood-types");
      if (!response.ok) {
        throw new Error("فشل في تحميل مخزون الدم");
      }
      return response.json();
    },
    staleTime: 1000 * 30, // 30 seconds (real-time data)
    refetchInterval: 1000 * 60, // Refetch every minute
  });
};

// =======================================================================================
// ✏️ MUTATION HOOKS - Data Modifications
// =======================================================================================

// Submit new blood donation
export const useCreateDonation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      donationData: Omit<BloodDonation, "id">
    ): Promise<BloodDonation> => {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });
      if (!response.ok) {
        throw new Error("فشل في تسجيل التبرع");
      }
      return response.json();
    },
    onSuccess: (newDonation) => {
      // Invalidate and refetch donations list
      queryClient.invalidateQueries({ queryKey: queryKeys.donations.lists() });

      // Add the new donation to cache
      queryClient.setQueryData(
        queryKeys.donations.detail(newDonation.id),
        newDonation
      );
    },
    onError: (error) => {
      console.error("Donation creation failed:", error);
      // You can add toast notification here
      // toast.error('فشل في تسجيل التبرع')
    },
  });
};

// Update donation status
export const useUpdateDonationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      donationId,
      status,
    }: {
      donationId: string;
      status: BloodDonation["status"];
    }): Promise<BloodDonation> => {
      const response = await fetch(`/api/donations/${donationId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error("فشل في تحديث حالة التبرع");
      }
      return response.json();
    },
    onSuccess: (updatedDonation) => {
      // Update the donation in cache
      queryClient.setQueryData(
        queryKeys.donations.detail(updatedDonation.id),
        updatedDonation
      );

      // Invalidate donations list to refetch with updated data
      queryClient.invalidateQueries({ queryKey: queryKeys.donations.lists() });
    },
  });
};

// Cancel donation
export const useCancelDonation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (donationId: string): Promise<void> => {
      const response = await fetch(`/api/donations/${donationId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("فشل في إلغاء التبرع");
      }
    },
    onSuccess: (_, donationId) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: queryKeys.donations.detail(donationId),
      });

      // Invalidate and refetch donations list
      queryClient.invalidateQueries({ queryKey: queryKeys.donations.lists() });
    },
  });
};
