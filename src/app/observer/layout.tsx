"use client";

import Header from "@/components/Header";
import { useIsAuthenticated, useUser } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ObserverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Wait for Zustand store to hydrate from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasHydrated(true);
    }, 100); // Small delay to ensure store hydration

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only run auth check after store has hydrated
    if (!hasHydrated) return;

    const checkAuth = async () => {
      console.log("Checking auth:", { isAuthenticated, user: user?.userType });

      if (!isAuthenticated) {
        console.log("Not authenticated, redirecting to login");
        router.push("/login");
        return;
      }

      if (user?.userType !== "observer") {
        console.log("Not observer, redirecting to 401");
        router.push("/401");
        return;
      }

      // User is authenticated and authorized
      console.log("User authorized as observer");
      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [hasHydrated, isAuthenticated, user, router]);

  // Show loading while waiting for hydration or auth check
  if (!hasHydrated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            جاري التحقق من الصلاحيات...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      <Header />
      <main className="pb-8">{children}</main>
    </div>
  );
}
