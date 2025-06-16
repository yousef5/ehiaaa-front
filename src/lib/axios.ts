import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Token constants
const ACCESS_TOKEN_KEY = "h_a";
const REFRESH_TOKEN_KEY = "h_aa";
const USER_ID_KEY = "user_id";

// Detect if we should use token-based auth (for testing/mobile) or cookie-based (for web)
const isTokenBasedAuth = () => {
  // Check if we have tokens in localStorage (indicates token-based auth)
  if (typeof window !== "undefined") {
    return localStorage.getItem(ACCESS_TOKEN_KEY) !== null;
  }
  return false;
};

// Token refresh state management
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// Function to add callbacks to the subscriber queue
const subscribeTokenRefresh = (callback: (token: string) => void): void => {
  refreshSubscribers.push(callback);
};

// Function to notify all subscribers with a new token
const onTokenRefreshed = (newToken: string): void => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

// Function to handle connection errors
export const handleConnectionError = (error: AxiosError): boolean => {
  // Network errors (no response)
  if (!error.response) {
    if (
      error.code === "ERR_NETWORK" ||
      error.message.includes("Network Error")
    ) {
      console.error("Network error detected:", error.message);
      return true;
    }

    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      console.error("Connection timeout detected:", error.message);
      return true;
    }
  }

  // Server errors (5XX)
  if (error.response?.status && error.response.status >= 500) {
    console.error(
      "Server error detected:",
      error.response.status,
      error.message
    );
    return true;
  }

  return false;
};

// Function to clear all auth data
const clearAuthData = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem("ehiaaa-auth-storage");
  }
};

// Function to redirect user to login
const redirectToLogin = (delay = 1000): void => {
  clearAuthData();

  setTimeout(() => {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }, delay);
};

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/v1`,
  withCredentials: true, // Always send cookies for web auth
  timeout: 30000, // 30 second timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to add auth headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Always ensure credentials are sent for cookie-based auth
    config.withCredentials = true;

    // If we have tokens stored (token-based auth), add Authorization header
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        console.log("🔑 Added Authorization header with token");
      }
    }

    // Debug logging in development
    if (process.env.NODE_ENV === "development") {
      console.log("🔍 Axios Request:", {
        url: config.url,
        method: config.method,
        withCredentials: config.withCredentials,
        hasAuthHeader: !!config.headers.Authorization,
        baseURL: config.baseURL,
        cookies: typeof window !== "undefined" ? document.cookie : "N/A (SSR)",
      });
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Function to refresh authentication token
const refreshAuthToken = async (): Promise<string> => {
  try {
    console.log("🔄 Attempting token refresh...");

    const usingTokenAuth = isTokenBasedAuth();

    if (usingTokenAuth) {
      // Token-based refresh
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post(`${BASE_URL}/v1/auth/refresh`, {
        token: refreshToken,
      });

      if (response.status === 200 && response.data) {
        const { h_a, h_aa } = response.data;

        // Store new tokens
        localStorage.setItem(ACCESS_TOKEN_KEY, h_a);
        localStorage.setItem(REFRESH_TOKEN_KEY, h_aa);

        console.log("✅ Token-based refresh successful");
        return h_a;
      }
    } else {
      // Cookie-based refresh
      const response = await axios.post(
        `${BASE_URL}/v1/auth/refresh`,
        {},
        {
          withCredentials: true,
          baseURL: BASE_URL, // Use full baseURL for refresh to avoid interceptor loops
        }
      );

      if (response.status === 200) {
        console.log("✅ Cookie-based refresh successful");
        return "refreshed"; // Return indicator that refresh was successful
      }
    }

    throw new Error("Failed to refresh token");
  } catch (error) {
    console.error("❌ Token refresh failed:", error);
    throw error;
  }
};

// Function to store tokens from login response
export const storeTokens = (
  tokens: { h_a: string; h_aa: string },
  userId: string
): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.h_a);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.h_aa);
    localStorage.setItem(USER_ID_KEY, userId);
    console.log("🔐 Tokens stored successfully");
  }
};

// Function to get stored tokens
export const getStoredTokens = (): {
  accessToken: string | null;
  refreshToken: string | null;
} => {
  if (typeof window !== "undefined") {
    return {
      accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
      refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
    };
  }
  return { accessToken: null, refreshToken: null };
};

// Response interceptor for handling errors and token refresh
axiosInstance.interceptors.response.use(
  // Success handler - pass through responses
  (response) => response,

  // Error handler
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Enhanced error logging
    if (process.env.NODE_ENV === "development") {
      console.log("❌ Axios Error Details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: originalRequest?.url,
        method: originalRequest?.method,
        withCredentials: originalRequest?.withCredentials,
        headers: originalRequest?.headers,
        responseHeaders: error.response?.headers,
        responseData: error.response?.data,
      });
    }

    // Handle connection errors
    if (handleConnectionError(error)) {
      return Promise.reject(error);
    }

    // If no response is available
    if (!error.response) {
      console.error("No response from server:", error);
      return Promise.reject(error);
    }

    const { status } = error.response;

    // Handle unauthorized errors (401) with token refresh
    if (status === 401) {
      // Prevent infinite retry loops
      if (originalRequest._retry) {
        console.log("🚫 Request already retried, redirecting to login");
        redirectToLogin();
        return Promise.reject(error);
      }

      // Check if user is logged in (has tokens or auth state)
      const hasTokens = isTokenBasedAuth();
      const hasAuthState =
        typeof window !== "undefined" &&
        localStorage.getItem("ehiaaa-auth-storage") !== null;

      if (!hasTokens && !hasAuthState) {
        // User is not logged in, redirect to login
        console.log("🚫 User not authenticated, redirecting to login");
        redirectToLogin();
        return Promise.reject(error);
      }

      // Start refresh process or queue this request
      if (!isRefreshing) {
        // Start refreshing token
        isRefreshing = true;
        originalRequest._retry = true;

        try {
          const newToken = await refreshAuthToken();

          // Process queued requests
          onTokenRefreshed(newToken);

          // Retry original request with new token if using token auth
          if (isTokenBasedAuth() && newToken !== "refreshed") {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          isRefreshing = false;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = []; // Clear subscribers on error

          console.log("🚫 Token refresh failed, redirecting to login");
          redirectToLogin();

          return Promise.reject(refreshError);
        }
      } else {
        // Queue this request while token is refreshing
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            // Add auth header if using token auth
            if (isTokenBasedAuth() && newToken !== "refreshed") {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            resolve(axiosInstance(originalRequest));
          });
        });
      }
    }

    // Handle forbidden errors (403)
    if (status === 403) {
      console.warn("Access forbidden (403)");
      // For 403, we might want to redirect to an unauthorized page instead of login
      if (typeof window !== "undefined") {
        window.location.href = "/401";
      }
      return Promise.reject(error);
    }

    // Handle session expired or other auth errors
    if (status === 419) {
      console.warn("Session expired (419)");
      redirectToLogin();
      return Promise.reject(error);
    }

    // Handle other errors
    console.error("API Error:", error.message, {
      status: error.response?.status,
      data: error.response?.data,
      url: originalRequest?.url,
      method: originalRequest?.method,
    });
    return Promise.reject(error);
  }
);

// Function to debug cookie issues
export const debugCookies = (): void => {
  if (typeof window !== "undefined") {
    console.log("🍪 JavaScript-accessible cookies:", document.cookie || "None");
    console.log("🔗 Current domain:", window.location.hostname);
    console.log("🌐 API URL:", BASE_URL);
    console.log(
      "ℹ️ Note: httpOnly cookies won't appear in document.cookie (this is normal)"
    );
    console.log(
      "🔍 Check Application > Storage > Cookies in DevTools for httpOnly cookies"
    );

    // Check if cookies exist (only non-httpOnly ones)
    const cookies = document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((c) => c);
    const authCookies = cookies.filter(
      (c) =>
        c.includes("_Secure-595") ||
        c.includes("_Secure-959") ||
        c.includes("h_a") ||
        c.includes("h_aa")
    );

    if (cookies.length === 0) {
      console.log(
        "ℹ️ No JavaScript-accessible cookies (httpOnly cookies are hidden)"
      );
    } else {
      console.log("🔐 JavaScript-accessible auth cookies:", authCookies);
    }

    console.log(
      "💡 If you see auth cookies in DevTools but getting 401 errors:"
    );
    console.log("   - Backend needs CORS with credentials: true");
    console.log("   - Cookie domain/path must match request URL");
  }
};

// Function to test cookie sending with a specific endpoint
export const testCookieSending = async (endpoint: string = "/observers") => {
  if (typeof window === "undefined") return;

  console.log("🧪 Testing cookie sending to:", endpoint);
  debugCookies();

  try {
    // Make a test request to see what happens
    const response = await axiosInstance.get(endpoint);
    console.log("✅ Request successful:", response.status);
    return response;
  } catch (error) {
    console.log("❌ Request failed - checking error details...");
    // The response interceptor will log detailed error info
    throw error;
  }
};

export default axiosInstance;
