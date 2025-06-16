import { QueryClient } from "@tanstack/react-query";

// =======================================================================================
// 🔄 REACT QUERY CLIENT CONFIGURATION
// =======================================================================================
//
// Optimized query client configuration for the blood donation platform:
// ✨ Smart caching strategies for blood donation data
// 🔄 Automatic background refetching for real-time updates
// ⚡ Performance optimized for medical data requirements
// 🛡️ Error handling for critical health information
// 📱 Offline support for mobile users
//
// =======================================================================================

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache time - how long unused data stays in cache (5 minutes)
      gcTime: 1000 * 60 * 5,

      // Stale time - how long data is considered fresh (1 minute)
      staleTime: 1000 * 60 * 1,

      // Retry failed requests (important for medical data)
      retry: (failureCount, error: unknown) => {
        // Don't retry on 404 or 403 errors
        const errorStatus = (error as { status?: number })?.status;
        if (errorStatus === 404 || errorStatus === 403) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },

      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch on window focus (important for real-time blood donation updates)
      refetchOnWindowFocus: true,

      // Refetch on network reconnect
      refetchOnReconnect: true,

      // Enable background refetching
      refetchInterval: false, // We'll set this per query as needed
    },

    mutations: {
      // Retry mutations once (for blood donation submissions)
      retry: 1,

      // Mutation retry delay
      retryDelay: 1000,
    },
  },
});

// =======================================================================================
// 🔧 UTILITY FUNCTIONS
// =======================================================================================

// Query keys factory for consistent key management
export const queryKeys = {
  // Blood donation related queries
  donations: {
    all: ["donations"] as const,
    lists: () => [...queryKeys.donations.all, "list"] as const,
    list: (filters: string) =>
      [...queryKeys.donations.lists(), { filters }] as const,
    details: () => [...queryKeys.donations.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.donations.details(), id] as const,
  },

  // User related queries
  users: {
    all: ["users"] as const,
    lists: () => [...queryKeys.users.all, "list"] as const,
    list: (filters: string) =>
      [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    profile: () => [...queryKeys.users.all, "profile"] as const,
  },

  // Blood centers and campaigns
  centers: {
    all: ["centers"] as const,
    lists: () => [...queryKeys.centers.all, "list"] as const,
    list: (filters: string) =>
      [...queryKeys.centers.lists(), { filters }] as const,
    details: () => [...queryKeys.centers.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.centers.details(), id] as const,
  },

  // Blood inventory and statistics
  inventory: {
    all: ["inventory"] as const,
    bloodTypes: () => [...queryKeys.inventory.all, "bloodTypes"] as const,
    statistics: () => [...queryKeys.inventory.all, "statistics"] as const,
  },
} as const;

// Default error handler
export const defaultErrorHandler = (error: unknown) => {
  console.error("Query Error:", error);

  // You can add toast notifications here
  // const errorMessage = (error as { message?: string })?.message || 'حدث خطأ في تحميل البيانات'
  // toast.error(errorMessage)
};
