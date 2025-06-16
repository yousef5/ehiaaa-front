"use client";

import { UserDetail } from "@/components/admin/users/UserDetail";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, Shield, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, use } from "react";

interface UserDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

function UserDetailPageContent({ userId }: { userId: string }) {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-b from-gray-50 via-gray-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
      {/* Enhanced Header with multi-layer design */}
      <div className="relative">
        {/* Background gradient with pattern overlay */}
        <div className="absolute inset-0 h-56 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-700 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.6))]"></div>
          <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-8 -right-8 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Header content */}
        <div className="relative pt-0 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-start">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-white/80 mb-4 mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-white hover:text-white hover:bg-white/10"
                onClick={() => router.push("/admin/users")}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>قائمة المستخدمين</span>
              </Button>
              <span className="mx-2 text-white/50">/</span>
              <span>بيانات المستخدم</span>
            </div>

            {/* Title and user ID */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="p-3 bg-white/15 backdrop-blur-sm rounded-full">
                  <User className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    بيانات المستخدم
                  </h1>
                  <p className="text-blue-100 mt-1">
                    عرض وإدارة بيانات المستخدم بالتفصيل
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm">
                <Shield className="h-4 w-4" />
                <span>معرف المستخدم:</span>
                <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-xs">
                  {userId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Curved edge for content */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50 dark:bg-gray-900 rounded-t-[60px]"></div>
      </div>

      {/* Main content area with negative margin to overlap with header */}
      <div className="relative z-10 -mt-10 pb-16">
        <UserDetail userId={userId} />
      </div>
    </div>
  );
}

// Loading component
function UserDetailLoading() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-gray-50 via-gray-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 min-h-[calc(100vh-64px)]">
      <div className="text-center px-4">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-900/30 opacity-25"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 dark:border-t-indigo-400 animate-spin"></div>
          <Loader2 className="absolute inset-0 h-full w-full text-indigo-600 dark:text-indigo-400 animate-pulse" />
        </div>
        <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
          جاري تحميل بيانات المستخدم...
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
          نحن نقوم بتحميل جميع المعلومات والمستندات الخاصة بالمستخدم، يرجى
          الانتظار قليلاً
        </p>
      </div>
    </div>
  );
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const resolvedParams = use(params);

  return (
    <div className="-mt-1">
      <Suspense fallback={<UserDetailLoading />}>
        <UserDetailPageContent userId={resolvedParams.id} />
      </Suspense>
    </div>
  );
}
