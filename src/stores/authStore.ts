import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AxiosError, AxiosInstance } from "axios";

// =======================================================================================
// 🔐 AUTHENTICATION STORE - Zustand Global State
// =======================================================================================
//
// Manages user authentication state across the entire app:
// ✨ User login/logout state
// 👤 User profile information
// 🔑 JWT tokens and session management
// 📱 Persistent storage with localStorage
// 🛡️ Role-based permissions
//
// =======================================================================================

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bloodType?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  role: "donor" | "admin" | "medical_staff";
  avatar?: string;
  dateOfBirth?: string;
  address?: {
    city: string;
    district: string;
    street?: string;
  };
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
  medicalInfo?: {
    allergies?: string[];
    medications?: string[];
    conditions?: string[];
    lastDonation?: string;
  };
  preferences: {
    notifications: boolean;
    language: "ar" | "en";
    theme: "light" | "dark" | "system";
  };
  stats?: {
    totalDonations: number;
    lifesSaved: number;
    badges: string[];
  };
  createdAt: string;
  lastLogin?: string;
}

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;

  // Actions
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  clearTokens: () => void;
  setLoading: (loading: boolean) => void;

  // Computed
  isAdmin: () => boolean;
  isMedicalStaff: () => boolean;
  canDonate: () => boolean;
  getInitials: () => string;
}

// Dynamic import to avoid circular dependency
let axiosInstance: AxiosInstance | null = null;
if (typeof window !== "undefined") {
  // Only import on client side
  import("@/lib/axios").then((module) => {
    axiosInstance = module.axiosInstance;
  });
}

// API Response interfaces
interface LoginResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    bloodType?: string;
    userType: string;
    role?: string;
    avatar?: string;
    birthDate?: string;
    address?: string;
    createdAt: string;
    isActive: boolean;
  };
  userTypeInfo: {
    displayName: string;
    permissions: string[];
    dashboardRoute: string;
    description: string;
  };
  loginTimestamp: string;
  // Tokens are included when backend detects mobile client or when explicitly requested
  tokens?: {
    h_a: string; // Access token
    h_aa: string; // Refresh token
  };
}

interface ApiErrorResponse {
  message?: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      accessToken: null,
      refreshToken: null,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true });

        try {
          // Import axiosInstance dynamically to avoid circular dependency
          if (!axiosInstance) {
            const { axiosInstance: axios } = await import("@/lib/axios");
            axiosInstance = axios;
          }

          // Call the actual API endpoint using axiosInstance for consistent auth handling
          // Backend will automatically set secure httpOnly cookies for web clients
          const response = await (
            axiosInstance as AxiosInstance
          ).post<LoginResponse>("/auth/login", credentials);
          const data = response.data;

          // Transform API response to our User interface
          const transformedUser: User = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            phone: data.user.phone || "",
            bloodType:
              (data.user.bloodType as
                | "A+"
                | "A-"
                | "B+"
                | "B-"
                | "AB+"
                | "AB-"
                | "O+"
                | "O-") || "unknown",
            role: data.user.userType as "donor" | "admin" | "medical_staff",
            avatar: data.user.avatar,
            dateOfBirth: data.user.birthDate,
            address: data.user.address
              ? {
                  city: data.user.address.split(",")[1]?.trim() || "",
                  district: data.user.address.split(",")[0]?.trim() || "",
                  street: data.user.address,
                }
              : undefined,
            emergencyContact: undefined, // Not provided in API
            medicalInfo: undefined, // Not provided in API
            preferences: {
              notifications: true,
              language: "ar",
              theme: "system",
            },
            stats: undefined, // Not provided in API
            createdAt: data.user.createdAt,
            lastLogin: data.loginTimestamp,
          };

          console.log("Login successful:", {
            userType: data.user.userType,
            message: data.message,
            authenticationMethod: data.tokens
              ? "token-based"
              : "secure-httpOnly-cookies",
          });

          // Store tokens if provided (mobile client or explicit token request)
          if (data.tokens) {
            const { storeTokens } = await import("@/lib/axios");
            storeTokens(data.tokens, data.user.id);
            console.log("🔐 Tokens stored for token-based authentication");
          }

          // Web client: Authentication handled via secure httpOnly cookies OR tokens
          // Backend sets _Secure-595 (access) and _Secure-959 (refresh) cookies for web
          // OR provides tokens in response for mobile/testing
          set({
            user: transformedUser,
            isAuthenticated: true,
            accessToken: data.tokens ? data.tokens.h_a : "secure-cookie", // Use actual token or cookie indicator
            refreshToken: data.tokens ? data.tokens.h_aa : "secure-cookie", // Use actual token or cookie indicator
            isLoading: false,
          });

          // Debug cookies after login
          if (process.env.NODE_ENV === "development") {
            const { debugCookies } = await import("@/lib/axios");
            setTimeout(() => debugCookies(), 100); // Small delay to ensure cookies are set
          }
        } catch (error: unknown) {
          set({ isLoading: false });

          // Handle axios errors properly
          const axiosError = error as AxiosError<ApiErrorResponse>;
          if (axiosError.response) {
            // Server responded with error status
            const message =
              axiosError.response.data?.message || "فشل في تسجيل الدخول";
            throw new Error(message);
          } else if (axiosError.request) {
            // Request made but no response received
            throw new Error("لا يمكن الوصول للخادم. تأكد من الاتصال بالإنترنت");
          } else {
            // Something else happened
            throw new Error("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى");
          }
        }
      },

      logout: async () => {
        console.log("🚪 Starting logout process...");

        // Always clear local auth state first (in case backend call fails)
        set({
          user: null,
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
        });

        // Try to call logout endpoint to clear server-side session and cookies
        if (axiosInstance) {
          try {
            await axiosInstance.post(
              "/auth/logout",
              {},
              {
                withCredentials: true, // Ensure credentials are sent for logout
              }
            );
            console.log("✅ Server-side logout successful - cookies cleared");
          } catch (error) {
            // Log the error but don't fail the logout process
            console.warn(
              "⚠️ Server-side logout failed (but local state cleared):",
              error
            );

            // If it's a 401 error, the user was already logged out on the server
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 401) {
              console.log("ℹ️ User was already logged out on server (401)");
            }
          }
        }

        // Clear any cached data in localStorage
        if (typeof window !== "undefined") {
          try {
            localStorage.removeItem("ehiaaa-auth-storage");
            localStorage.removeItem("h_a"); // Clear access token
            localStorage.removeItem("h_aa"); // Clear refresh token
            localStorage.removeItem("user_id"); // Clear user ID
            console.log("🧹 Local storage cleared");
          } catch (error) {
            console.warn("Failed to clear localStorage:", error);
          }
        }

        // Redirect to login page after logout
        if (typeof window !== "undefined") {
          console.log("🔄 Redirecting to login page...");
          setTimeout(() => {
            window.location.href = "/login";
          }, 100); // Small delay to ensure state updates
        }

        console.log("✅ Logout process completed");
      },

      setUser: (user) => {
        set({ user, isAuthenticated: true });
      },

      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },

      setTokens: (tokens) => {
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
      },

      clearTokens: () => {
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      // Computed functions
      isAdmin: () => {
        const user = get().user;
        return user?.role === "admin";
      },

      isMedicalStaff: () => {
        const user = get().user;
        return user?.role === "medical_staff" || user?.role === "admin";
      },

      canDonate: () => {
        const user = get().user;
        if (!user?.medicalInfo?.lastDonation) return true;

        const lastDonation = new Date(user.medicalInfo.lastDonation);
        const now = new Date();
        const daysDiff = Math.floor(
          (now.getTime() - lastDonation.getTime()) / (1000 * 60 * 60 * 24)
        );

        // Minimum 56 days between donations (8 weeks)
        return daysDiff >= 56;
      },

      getInitials: () => {
        const user = get().user;
        if (!user?.name) return "مج"; // مجهول - Unknown

        const words = user.name.split(" ");
        if (words.length === 1) {
          return words[0].charAt(0).toUpperCase();
        }
        return (
          words[0].charAt(0) + words[words.length - 1].charAt(0)
        ).toUpperCase();
      },
    }),
    {
      name: "ehiaaa-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);

// =======================================================================================
// 🔧 UTILITY HOOKS & SELECTORS
// =======================================================================================

// Convenient selectors for common use cases
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useIsAdmin = () => useAuthStore((state) => state.isAdmin());
export const useCanDonate = () => useAuthStore((state) => state.canDonate());
export const useUserInitials = () =>
  useAuthStore((state) => state.getInitials());

// Auth actions - memoized to prevent infinite loops
export const useAuthActions = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const setUser = useAuthStore((state) => state.setUser);
  const updateUser = useAuthStore((state) => state.updateUser);

  return { login, logout, setUser, updateUser };
};
