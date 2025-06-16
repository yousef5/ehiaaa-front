"use client";

// =======================================================================================
// 👑 ADMIN DASHBOARD - Blood Donation Management Center
// =======================================================================================
//
// Comprehensive admin dashboard featuring:
// 📊 Real-time analytics and statistics
// 🩸 Blood inventory management
// 👥 User and donor management
// 🏥 Hospital and campaign coordination
// 📈 Advanced reporting and insights
// 🔔 Notification and alert management
//
// =======================================================================================

import { BarChart3, Settings, User, UserCog, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AdminDataDialog from "@/components/AdminDataDialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@/stores/authStore";
import { useQuickToast } from "@/stores/uiStore";

export default function AdminDashboard() {
  const router = useRouter();
  const user = useUser();
  const toast = useQuickToast();

  const [loading, setLoading] = useState(true);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  // =======================================================================================
  // 🔄 LOAD DASHBOARD DATA
  // =======================================================================================
  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setLoading(false);
      toast.success("مرحباً في لوحة التحكم", `أهلاً وسهلاً ${user?.name}`);
    }, 1000);
  }, [user, toast]);

  const handleViewAdminData = () => {
    setIsUserDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            جاري تحميل لوحة التحكم...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              لوحة تحكم المدير
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              إدارة شاملة لنظام التبرع بالدم - مرحباً {user?.name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleViewAdminData}>
              <User className="h-4 w-4 ml-2" />
              بياناتي
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 ml-2" />
              الإعدادات
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/admin/users")}
            >
              <UserCog className="h-4 w-4 ml-2" />
              المستخدمين
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/admin/observers")}
            >
              <Users className="h-4 w-4 ml-2" />
              المراجعين
            </Button>
            <Button size="sm">
              <BarChart3 className="h-4 w-4 ml-2" />
              التقارير
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard cards will go here */}
      </div>

      {/* Admin Data Dialog */}
      <AdminDataDialog
        isOpen={isUserDialogOpen}
        onOpenChange={setIsUserDialogOpen}
      />
    </div>
  );
}
