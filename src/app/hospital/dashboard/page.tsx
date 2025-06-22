"use client";

import { CaseCard } from "@/components/hospital/CaseCard";
import { CreateCaseDialog } from "@/components/hospital/CreateCaseDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { calculateDashboardStats, useHospitalCases } from "@/hooks/useCases";
import { useUser } from "@/stores/authStore";
import {
  Activity,
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Droplets,
  FileText,
  Filter,
  Heart,
  Plus,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HospitalDashboard() {
  const user = useUser();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [createCaseDialogOpen, setCreateCaseDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch hospital cases using React Query
  const {
    data: cases = [],
    isLoading: casesLoading,
    error: casesError,
    refetch: refetchCases,
  } = useHospitalCases(user?.id);

  // Calculate dashboard statistics from real data
  const dashboardStats = calculateDashboardStats(cases);

  // Filter cases based on search query
  const filteredCases = cases.filter(
    (caseItem) =>
      caseItem.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCaseCreated = () => {
    refetchCases();
  };

  const handleViewCase = (caseId: string) => {
    router.push(`/hospital/cases/${caseId}`);
  };

  // Loading skeleton for case cards
  const CaseCardSkeleton = () => (
    <Card className="animate-pulse">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-16 w-full" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
      dir="rtl"
    >
      {/* Professional Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left side - Hospital info */}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg">
                <Building2 className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  لوحة التحكم
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {user?.name || "مستشفى الأحياء"}
                </p>
              </div>
            </div>

            {/* Center - Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="البحث في الحالات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                />
              </div>
            </div>

            {/* Right side - Actions and time */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:block text-right text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {currentTime.toLocaleTimeString("ar-SA", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{currentTime.toLocaleDateString("ar-SA")}</span>
                </div>
              </div>

              <Button
                onClick={() => setCreateCaseDialogOpen(true)}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-4 w-4 ml-2" />
                حالة جديدة
              </Button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="البحث في الحالات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Error Message */}
        {casesError && (
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 mb-8">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span>حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Professional Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {casesLoading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="text-right">
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-8 w-12" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              {/* Total Cases */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-blue-500 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                        إجمالي الحالات
                      </p>
                      <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                        {dashboardStats.totalCases}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Cases */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-amber-500 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">
                        حالات معلقة
                      </p>
                      <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">
                        {dashboardStats.pendingCases}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Completed Cases */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-green-500 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                        حالات مكتملة
                      </p>
                      <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                        {dashboardStats.completedCases}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Donations */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-purple-500 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Heart className="h-6 w-6" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">
                        تبرعات نشطة
                      </p>
                      <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                        {dashboardStats.activeDonations}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Total Bags */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-red-500 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Droplets className="h-6 w-6" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                        إجمالي الأكياس
                      </p>
                      <p className="text-3xl font-bold text-red-700 dark:text-red-300">
                        {dashboardStats.totalBags}
                      </p>
                      <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                        كيس = 450 مل
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Cases Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <Activity className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  الحالات الطبية
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {filteredCases.length} من أصل {cases.length} حالة
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 ml-2" />
                تصفية
              </Button>
            </div>
          </div>

          {/* Cases Grid */}
          {casesLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <CaseCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCases.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  case={caseItem}
                  onViewCase={handleViewCase}
                />
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2 border-slate-300 dark:border-slate-600">
              <CardContent className="p-12 text-center">
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full w-fit mx-auto mb-4">
                  <FileText className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {searchQuery ? "لا توجد نتائج" : "لا توجد حالات طبية"}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {searchQuery
                    ? `لم يتم العثور على حالات تطابق "${searchQuery}"`
                    : "ابدأ بإنشاء أول حالة طبية لك"}
                </p>
                {!searchQuery && (
                  <Button
                    onClick={() => setCreateCaseDialogOpen(true)}
                    className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    إنشاء حالة جديدة
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Create Case Dialog */}
      <CreateCaseDialog
        open={createCaseDialogOpen}
        onOpenChange={setCreateCaseDialogOpen}
        onSuccess={handleCaseCreated}
      />
    </div>
  );
}
