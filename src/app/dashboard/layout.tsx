"use client";

import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { useAuthStore, useUser } from "@/stores/authStore";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const isLoading = useAuthStore((state) => state.isLoading);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Don't do anything while loading
    if (isLoading) {
      console.log("Still loading authentication...");
      return;
    }

    // Wait a bit more for auth state to stabilize
    const authCheckDelay = setTimeout(() => {
      const currentUser = useAuthStore.getState().user;

      // Redirect if user is not authenticated
      if (!currentUser) {
        console.log("No user found, redirecting to login");
        setShouldRedirect(true);
        redirect("/login");
        return;
      }

      // Allow access for regular users (donors), hospitals, and blood banks
      const userType = currentUser.userType?.toLowerCase();
      const isUserType =
        userType === "user" ||
        userType === "donor" ||
        userType === "hospital" ||
        userType === "blood_bank" ||
        userType === "bloodbank";

      console.log("Checking user access:", {
        userType: currentUser.userType,
        role: currentUser.role,
        isUserType,
      });

      if (!isUserType) {
        console.log("User is not a regular user type, redirecting to 401");
        setShouldRedirect(true);
        redirect("/401");
        return;
      }

      console.log("User authorized for dashboard");
      setShouldRedirect(false);
    }, 300);

    return () => clearTimeout(authCheckDelay);
  }, [user, isLoading]);

  // Show loading while checking authentication
  if (isLoading || shouldRedirect) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userType = user.userType?.toLowerCase();
  const isUserType =
    userType === "user" ||
    userType === "donor" ||
    userType === "hospital" ||
    userType === "blood_bank" ||
    userType === "bloodbank";

  if (!isUserType) {
    return null;
  }

  return (
    <ThemeProvider>
      <div className=" bg-background">
        <Header />
        <main>{children}</main>
      </div>
    </ThemeProvider>
  );
}
