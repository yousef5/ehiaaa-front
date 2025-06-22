import { getUserFullProfile } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

// Query keys for user data
export const userKeys = {
  all: ["user"] as const,
  profile: () => [...userKeys.all, "profile"] as const,
  fullProfile: () => [...userKeys.all, "fullProfile"] as const,
};

// Hook to get full user profile with donations and active cases
export function useUserFullProfile() {
  return useQuery({
    queryKey: userKeys.fullProfile(),
    queryFn: getUserFullProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    retry: 2,
  });
}
