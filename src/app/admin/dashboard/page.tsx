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

import {
  Activity,
  AlertCircle,
  Building2,
  Calendar,
  Clock,
  Eye,
  FileText,
  Heart,
  MapPin,
  Settings,
  Shield,
  TrendingDown,
  TrendingUp,
  User,
  UserCog,
  Users,
  UsersIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AdminDataDialog from "@/components/AdminDataDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStatistics } from "@/hooks/useDashboardStatistics";
import { useUser } from "@/stores/authStore";
import { useQuickToast } from "@/stores/uiStore";

// =======================================================================================
// 📊 STATISTICS CARD COMPONENTS
// =======================================================================================
interface StatCardProps {
  title: string;
  value: number;
  subValue?: number;
  subLabel?: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "yellow" | "red" | "purple" | "indigo";
  trend?: "up" | "down";
}

const StatCard = ({
  title,
  value,
  subValue,
  subLabel,
  icon,
  color,
  trend,
}: StatCardProps) => {
  const colorClasses = {
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-700/50",
    green:
      "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 text-green-700 dark:text-green-300 border-green-200/60 dark:border-green-700/50",
    yellow:
      "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/30 text-yellow-700 dark:text-yellow-300 border-yellow-200/60 dark:border-yellow-700/50",
    red: "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30 text-red-700 dark:text-red-300 border-red-200/60 dark:border-red-700/50",
    purple:
      "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-700/50",
    indigo:
      "bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/30 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-700/50",
  };

  const iconBgClasses = {
    blue: "bg-blue-500/10 dark:bg-blue-400/20",
    green: "bg-green-500/10 dark:bg-green-400/20",
    yellow: "bg-yellow-500/10 dark:bg-yellow-400/20",
    red: "bg-red-500/10 dark:bg-red-400/20",
    purple: "bg-purple-500/10 dark:bg-purple-400/20",
    indigo: "bg-indigo-500/10 dark:bg-indigo-400/20",
  };

  return (
    <Card
      className={`${colorClasses[color]} border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] backdrop-blur-sm`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold tracking-wide">
          {title}
        </CardTitle>
        <div className={`p-3 rounded-xl ${iconBgClasses[color]} shadow-inner`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold flex items-center gap-3 mb-1">
          {value.toLocaleString("ar-EG")}
          {trend && (
            <div
              className={`flex items-center ${
                trend === "up"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-500 dark:text-red-400"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp className="h-5 w-5" />
              ) : (
                <TrendingDown className="h-5 w-5" />
              )}
            </div>
          )}
        </div>
        {subValue !== undefined && subLabel && (
          <p className="text-sm opacity-80 font-medium">
            {subLabel}:{" "}
            <span className="font-bold">
              {subValue.toLocaleString("ar-EG")}
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default function AdminDashboard() {
  const router = useRouter();
  const user = useUser();
  const toast = useQuickToast();
  const {
    data: statistics,
    isLoading,
    error,
    refetch,
  } = useDashboardStatistics();

  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // =======================================================================================
  // 🔄 LOAD DASHBOARD DATA & REAL-TIME CLOCK
  // =======================================================================================
  useEffect(() => {
    if (!isLoading && statistics) {
      toast.success("مرحباً في لوحة التحكم", `أهلاً وسهلاً ${user?.name}`);
    }
  }, [isLoading, statistics, user, toast]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleViewAdminData = () => {
    setIsUserDialogOpen(true);
  };

  const formatDateTime = (date: Date) => {
    return {
      time: date.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      date: date.toLocaleDateString("ar-EG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600 mx-auto mb-6"></div>
              <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-blue-300 animate-ping mx-auto"></div>
            </div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              جاري تحميل لوحة التحكم...
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              يرجى الانتظار قليلاً
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-4 mx-auto mb-6 w-fit">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              حدث خطأ في تحميل البيانات
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              تعذر الاتصال بالخادم، يرجى المحاولة مرة أخرى
            </p>
            <Button
              onClick={() => refetch()}
              size="lg"
              className="bg-red-600 hover:bg-red-700"
            >
              <AlertCircle className="h-4 w-4 ml-2" />
              إعادة المحاولة
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { time, date } = formatDateTime(currentTime);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Professional Header */}
        <div className="mb-12">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-2xl p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left Section - Title & Info */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                      لوحة تحكم المدير
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-1 font-medium">
                      إدارة شاملة لنظام التبرع بالدم
                    </p>
                  </div>
                </div>

                {/* Welcome Message */}
                <div className="flex items-center gap-3 mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 text-base font-semibold border-emerald-200 dark:border-emerald-700"
                  >
                    مرحباً {user?.name}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 text-sm">
                    مدير النظام
                  </Badge>
                </div>

                {/* Date & Time */}
                <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">{date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                      {time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Section - Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleViewAdminData}
                  className="bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border-2 hover:bg-blue-50 dark:hover:bg-slate-600 transition-all duration-300"
                >
                  <User className="h-5 w-5 ml-2" />
                  بياناتي الشخصية
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border-2 hover:bg-purple-50 dark:hover:bg-slate-600 transition-all duration-300"
                >
                  <Settings className="h-5 w-5 ml-2" />
                  إعدادات النظام
                </Button>
                <Button
                  size="lg"
                  onClick={() => router.push("/admin/users")}
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <UserCog className="h-5 w-5 ml-2" />
                  إدارة المستخدمين
                </Button>
                <Button
                  size="lg"
                  onClick={() => router.push("/admin/observers")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Users className="h-5 w-5 ml-2" />
                  إدارة المراجعين
                </Button>
                <Button
                  size="lg"
                  onClick={() => router.push("/admin/cases")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FileText className="h-5 w-5 ml-2" />
                  إدارة الحالات
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        {statistics && (
          <div className="space-y-12">
            {/* User Statistics */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <UsersIcon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  إحصائيات المستخدمين
                </h2>
                <div className="h-px bg-gradient-to-r from-blue-300 to-transparent flex-1"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                  title="إجمالي المستخدمين"
                  value={statistics.users.totalUsers}
                  subValue={statistics.users.activeUsers}
                  subLabel="نشط"
                  icon={<UsersIcon className="h-6 w-6" />}
                  color="blue"
                  trend="up"
                />
                <StatCard
                  title="المستشفيات"
                  value={statistics.users.totalHospitals}
                  subValue={statistics.users.activeHospitals}
                  subLabel="نشط"
                  icon={<Building2 className="h-6 w-6" />}
                  color="green"
                />
                <StatCard
                  title="بنوك الدم"
                  value={statistics.users.totalBloodBanks}
                  subValue={statistics.users.activeBloodBanks}
                  subLabel="نشط"
                  icon={<Heart className="h-6 w-6" />}
                  color="red"
                />
                <StatCard
                  title="المراجعين"
                  value={statistics.users.totalObservers}
                  subValue={statistics.users.activeObservers}
                  subLabel="نشط"
                  icon={<Eye className="h-6 w-6" />}
                  color="purple"
                />
              </div>
            </div>

            {/* Location Statistics */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  إحصائيات المواقع الجغرافية
                </h2>
                <div className="h-px bg-gradient-to-r from-indigo-300 to-transparent flex-1"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <StatCard
                  title="المحافظات المسجلة"
                  value={statistics.locations.totalGovernorates}
                  icon={<MapPin className="h-6 w-6" />}
                  color="indigo"
                />
                <StatCard
                  title="المدن المسجلة"
                  value={statistics.locations.totalCities}
                  icon={<MapPin className="h-6 w-6" />}
                  color="yellow"
                />
              </div>
            </div>

            {/* Cases & Donations Statistics */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl shadow-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  إحصائيات الحالات والتبرعات
                </h2>
                <div className="h-px bg-gradient-to-r from-red-300 to-transparent flex-1"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                  title="إجمالي التبرعات"
                  value={statistics.donations.totalDonations}
                  icon={<Heart className="h-6 w-6" />}
                  color="red"
                  trend="up"
                />
                <StatCard
                  title="إجمالي الحالات"
                  value={statistics.cases.totalCases}
                  icon={<FileText className="h-6 w-6" />}
                  color="blue"
                />
                <StatCard
                  title="الحالات النشطة"
                  value={statistics.cases.activeCases}
                  icon={<Activity className="h-6 w-6" />}
                  color="green"
                  trend="up"
                />
                <StatCard
                  title="الحالات المعلقة"
                  value={statistics.cases.pendingCases}
                  icon={<AlertCircle className="h-6 w-6" />}
                  color="yellow"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  إجراءات سريعة
                </h2>
                <div className="h-px bg-gradient-to-r from-emerald-300 to-transparent flex-1"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card
                  className="bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-900/20 dark:to-blue-800/30 border-2 border-blue-200/60 dark:border-blue-700/50 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                  onClick={() => router.push("/admin/users")}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-6">
                      <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <UserCog className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">
                          إدارة المستخدمين
                        </h3>
                        <p className="text-blue-700 dark:text-blue-300 text-base">
                          عرض وإدارة جميع المستخدمين والمستشفيات وبنوك الدم
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-2 font-medium">
                          انقر للوصول السريع
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="bg-gradient-to-br from-green-50/80 to-green-100/80 dark:from-green-900/20 dark:to-green-800/30 border-2 border-green-200/60 dark:border-green-700/50 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                  onClick={() => router.push("/admin/observers")}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-6">
                      <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
                          إدارة المراجعين
                        </h3>
                        <p className="text-green-700 dark:text-green-300 text-base">
                          عرض وإدارة المراجعين ومتابعة أنشطتهم
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-medium">
                          انقر للوصول السريع
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="bg-gradient-to-br from-purple-50/80 to-purple-100/80 dark:from-purple-900/20 dark:to-purple-800/30 border-2 border-purple-200/60 dark:border-purple-700/50 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                  onClick={() => router.push("/admin/cases")}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-6">
                      <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <FileText className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-2">
                          إدارة الحالات
                        </h3>
                        <p className="text-purple-700 dark:text-purple-300 text-base">
                          عرض وإدارة جميع حالات التبرع والطوارئ
                        </p>
                        <p className="text-sm text-purple-600 dark:text-purple-400 mt-2 font-medium">
                          انقر للوصول السريع
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Admin Data Dialog */}
        <AdminDataDialog
          isOpen={isUserDialogOpen}
          onOpenChange={setIsUserDialogOpen}
        />
      </div>
    </div>
  );
}
