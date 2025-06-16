import axiosInstance from "@/lib/axios";
import { useIsAuthenticated } from "@/stores/authStore";
import type { Governorate } from "@/types/observer";
import { useQuery } from "@tanstack/react-query";

export function useObserverDialog(isOpen: boolean) {
  const isAuthenticated = useIsAuthenticated();

  // Fetch governorates with cities
  const {
    data: governorates,
    isLoading: isLoadingGovernorates,
    error,
    refetch,
  } = useQuery({
    queryKey: ["governorates-with-cities"],
    queryFn: async (): Promise<Governorate[]> => {
      const response = await axiosInstance.get("/governorates?withCities=true");

      // Validate response data
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid governorates data format");
      }

      // Sort governorates alphabetically by Arabic name
      return response.data.sort((a, b) =>
        a.nameAr.localeCompare(b.nameAr, "ar")
      );
    },
    enabled: isOpen && isAuthenticated,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return {
    governorates,
    isLoadingGovernorates,
    error,
    refetch,
  };
}
