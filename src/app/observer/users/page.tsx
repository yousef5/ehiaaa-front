"use client";

import { ObserverUsersList } from "@/components/observer/users/ObserverUsersList";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { useObserverUsers } from "@/hooks/useObserverUsers";
import { createContext, useContext, useState } from "react";

// Create context for observer users operations
interface ObserverUsersContextType {
  refetchObserverUsers: () => void;
  invalidateObserverUsersQueries: () => void;
}

const ObserverUsersContext = createContext<ObserverUsersContextType | null>(
  null
);

// Custom hook to use the context
export const useObserverUsersContext = () => {
  const context = useContext(ObserverUsersContext);
  if (!context) {
    throw new Error(
      "useObserverUsersContext must be used within ObserverUsersProvider"
    );
  }
  return context;
};

// Provider component that wraps the page
function ObserverUsersProvider({ children }: { children: React.ReactNode }) {
  const [filters] = useState({
    page: 1,
    limit: 12,
    userType: "all" as const,
    status: "all" as const,
    search: "",
  });

  const { refetchObserverUsers, invalidateObserverUsersQueries } =
    useObserverUsers(filters);

  return (
    <ObserverUsersContext.Provider
      value={{
        refetchObserverUsers,
        invalidateObserverUsersQueries,
      }}
    >
      {children}
    </ObserverUsersContext.Provider>
  );
}

export default function ObserverUsersPage() {
  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "الرئيسية",
      href: "/",
    },
    {
      label: "لوحة المراقب",
      href: "/observer/dashboard",
    },
    {
      label: "المستخدمين",
      current: true,
    },
  ];

  return (
    <ObserverUsersProvider>
      <div className="w-full space-y-6 px-4 sm:px-6 py-6" dir="rtl">
        {/* Breadcrumb Navigation */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Main Content */}
        <ObserverUsersList />
      </div>
    </ObserverUsersProvider>
  );
}
