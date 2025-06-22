"use client";

import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { useAuthStore, useUser } from "@/stores/authStore";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function HospitalLayout({
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

      // Check for both uppercase and lowercase userType values
      const userType = currentUser.userType?.toLowerCase();
      console.log("userType", userType);
      const isHospitalUser =
        userType === "hospital" ||
        userType === "blood_bank" ||
        userType === "bloodbank";

      console.log("Checking user access:", {
        userType: currentUser.userType,
        role: currentUser.role,
        isHospitalUser,
      });

      if (!isHospitalUser) {
        console.log("User is not hospital type, redirecting to 401");
        setShouldRedirect(true);
        redirect("/401");
        return;
      }

      console.log("User authorized for hospital dashboard");
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
  const isHospitalUser =
    userType === "hospital" ||
    userType === "blood_bank" ||
    userType === "bloodbank";

  if (!isHospitalUser) {
    return null;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">{children}</main>
      </div>
    </ThemeProvider>
  );
}
