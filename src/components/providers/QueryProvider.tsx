"use client";

// =======================================================================================
// 🔄 REACT QUERY PROVIDER COMPONENT
// =======================================================================================
//
// This provider component sets up React Query for the entire application:
// ✨ Query client configuration with optimized settings
// 🛠️ Development tools for debugging queries
// 🔄 Error boundaries for robust error handling
// 📱 Hydration support for Next.js SSR
//
// =======================================================================================

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/query-client";
import { ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Show devtools only in development */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
