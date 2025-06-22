"use client";

import { CaseCard } from "@/components/hospital/CaseCard";
import { ObserverUserDetail } from "@/components/observer/users/ObserverUserDetail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DonorCard } from "@/components/ui/donor-card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useHospitalCases } from "@/hooks/useCases";
import {
  calculateDonationProgress,
  getDonationStatusInfo,
  useUserDonationData,
} from "@/hooks/useDonations";
import { observerUsersApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Clock,
  CreditCard,
  Droplets,
  FileText,
  Heart,
  Home,
  Loader2,
  Search,
  Shield,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, use, useState } from "react";

interface ObserverUserDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

function ObserverUserDetailPageContent({ userId }: { userId: string }) {
  const router = useRouter();
  const [donorCardOpen, setDonorCardOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch user data to check if user is a donor and get their details
  const { data: user } = useQuery({
    queryKey: ["observer-user-detail-page", userId],
    queryFn: () => observerUsersApi.getUserById(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch hospital/blood bank cases if user is hospital or blood bank
  const {
    data: cases = [],
    isLoading: casesLoading,
    error: casesError,
  } = useHospitalCases(
    user?.userType === "hospital" || user?.userType === "blood_bank"
      ? userId
      : undefined
  );

  // Fetch user donation data if user is a regular user/donor
  const {
    data: donationData,
    isLoading: donationLoading,
    error: donationError,
  } = useUserDonationData(user?.userType === "user" ? userId : undefined);

  // Filter cases based on search query
  const filteredCases = cases.filter(
    (caseItem) =>
      caseItem.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate case statistics
  const caseStats = {
    total: cases.length,
    pending: cases.filter((c) => c.status === "pending").length,
    completed: cases.filter((c) => c.status === "completed").length,
    active: cases.filter((c) => c.status === "active").length,
  };

  // Calculate donation progress if donation data is available
  const donationProgress = donationData
    ? calculateDonationProgress(donationData.donationStats)
    : null;

  const handleViewCase = (caseId: string) => {
    // Open case in new tab
    window.open(`/observer/cases/${caseId}`, "_blank");
  };

  const formatDate = (dateString: string | Date) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: ar });
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

  // Loading skeleton for donations
  const DonationCardSkeleton = () => (
    <Card className="animate-pulse">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800">
      {/* Professional Header Section */}
      <div className="relative overflow-hidden">
        {/* Enhanced Background with Professional Gradients */}
        <div className="absolute inset-0 h-64 bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

          {/* Floating Elements */}
          <div className="absolute top-12 right-12 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-16 left-16 w-24 h-24 bg-indigo-400/15 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-20 left-1/3 w-20 h-20 bg-slate-300/10 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>

        {/* Header Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-32">
          {/* Enhanced Breadcrumb Navigation */}
          <nav
            className="flex items-center space-x-2 text-sm text-white/90 mb-8"
            dir="ltr"
          >
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-xl px-3 py-2"
              onClick={() => router.push("/observer/dashboard")}
            >
              <Home className="h-4 w-4" />
              <span>لوحة التحكم</span>
            </Button>
            <ArrowRight className="h-3 w-3 text-white/50 mx-2" />
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-xl px-3 py-2"
              onClick={() => router.push("/observer/users")}
            >
              <Users className="h-4 w-4" />
              <span>إدارة المستخدمين</span>
            </Button>
            <ArrowRight className="h-3 w-3 text-white/50 mx-2" />
            <span className="text-white font-medium">تفاصيل المستخدم</span>
          </nav>

          {/* Page Title Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-start gap-6">
              {/* Professional Icon Container */}
              <div className="relative">
                <div className="p-4 bg-white/15 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
                  {user?.userType === "hospital" ||
                  user?.userType === "blood_bank" ? (
                    <Building2 className="h-8 w-8 text-white" />
                  ) : (
                    <User className="h-8 w-8 text-white" />
                  )}
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>

              {/* Title and Description */}
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  تفاصيل المستخدم
                </h1>
                <p className="text-lg text-blue-100/90 max-w-2xl leading-relaxed">
                  عرض شامل لجميع بيانات المستخدم مع إمكانية الإدارة والتحكم في
                  الصلاحيات
                </p>

                {/* Professional Stats Pills */}
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
                    <Shield className="h-4 w-4" />
                    <span>مراقب معتمد</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-100 text-sm font-medium">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>نشط الآن</span>
                  </div>

                  {/* User Type Badge */}
                  {user?.userType === "hospital" && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-100 text-sm font-medium">
                      <Building2 className="h-4 w-4" />
                      <span>مستشفى</span>
                    </div>
                  )}

                  {user?.userType === "blood_bank" && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-100 text-sm font-medium">
                      <Heart className="h-4 w-4" />
                      <span>بنك دم</span>
                    </div>
                  )}

                  {/* Donor Badge - Only show for donors */}
                  {user?.userType === "donor" && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-100 text-sm font-medium">
                      <CreditCard className="h-4 w-4" />
                      <span>متبرع معتمد</span>
                    </div>
                  )}

                  {/* Regular User Badge */}
                  {user?.userType === "user" && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-100 text-sm font-medium">
                      <Droplets className="h-4 w-4" />
                      <span>مستخدم/متبرع</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Action Section */}
            <div className="flex flex-col items-start lg:items-end gap-3">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-100/70 font-medium">
                    معرف المستخدم
                  </div>
                  <div className="text-sm font-mono bg-white/20 px-3 py-1 rounded-lg mt-1 tracking-wider">
                    #{userId}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Donor Card Button - Only show for donors */}
                {user?.userType === "donor" && (
                  <Button
                    onClick={() => setDonorCardOpen(true)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <CreditCard className="h-4 w-4 ml-2" />
                    بطاقة المتبرع
                  </Button>
                )}

                {/* Back Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                  onClick={() => router.push("/observer/users")}
                >
                  <ChevronLeft className="h-4 w-4 ml-2" />
                  العودة للقائمة
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Curved Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16 fill-slate-50 dark:fill-gray-900"
          >
            <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,0 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content Area with Professional Layout */}
      <div className="relative -mt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* User Details Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden mb-8">
            {/* Content Header */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-gray-800/50 dark:to-gray-700/50 px-8 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      معلومات المستخدم التفصيلية
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      جميع البيانات والمعلومات المرتبطة بحساب المستخدم
                    </p>
                  </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-3">
                  {/* Quick Donor Card Button in Header */}
                  {user?.userType === "donor" && (
                    <Button
                      onClick={() => setDonorCardOpen(true)}
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <CreditCard className="h-4 w-4 ml-2" />
                      تصدير البطاقة
                    </Button>
                  )}

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>تم التحميل بنجاح</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-8">
              <ObserverUserDetail userId={userId} />
            </div>
          </div>

          {/* Donations Section for Regular Users */}
          {user?.userType === "user" && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden mb-8">
              {/* Donations Header */}
              <div className="bg-gradient-to-r from-slate-50 to-purple-50/50 dark:from-gray-800/50 dark:to-purple-700/50 px-8 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                      <Droplets className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        بيانات التبرعات
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        تاريخ التبرعات والإحصائيات التفصيلية
                      </p>
                    </div>
                  </div>

                  {/* Donations Count */}
                  {donationData && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
                      <Droplets className="h-4 w-4" />
                      <span>
                        {donationData.donationStats.totalDonations} تبرع
                      </span>
                    </div>
                  )}
                </div>

                {/* Donation Statistics */}
                {donationData && donationProgress && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          إجمالي التبرعات
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          {donationData.donationStats.totalDonations}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          مكتملة
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          {donationData.donationStats.completedDonations}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                        <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          معلقة
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          {donationData.donationStats.pendingDonations}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <Droplets className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          إجمالي الأكياس
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          {donationProgress.totalBags}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Next Eligibility Info */}
                {donationData?.nextEligibilityInfo && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-blue-900 dark:text-blue-300">
                          حالة الأهلية للتبرع القادم
                        </div>
                        <div className="text-lg font-bold text-blue-700 dark:text-blue-400 mt-1">
                          {donationData.nextEligibilityInfo.isEligible
                            ? "مؤهل للتبرع"
                            : "غير مؤهل حالياً"}
                        </div>
                        <div className="text-sm text-blue-600 dark:text-blue-500 mt-1">
                          {donationData.nextEligibilityInfo.reason}
                        </div>
                        {donationData.nextEligibilityDate && (
                          <div className="text-sm text-blue-600 dark:text-blue-500 mt-2">
                            التاريخ المتاح القادم:{" "}
                            {formatDate(donationData.nextEligibilityDate)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Donations Content */}
              <div className="p-8">
                {donationError && (
                  <Card className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                        <AlertCircle className="h-5 w-5" />
                        <span>
                          حدث خطأ في تحميل بيانات التبرعات. يرجى المحاولة مرة
                          أخرى.
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {donationLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <DonationCardSkeleton key={i} />
                    ))}
                  </div>
                ) : donationData?.donations &&
                  donationData.donations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {donationData.donations.map((donation) => {
                      const statusInfo = getDonationStatusInfo(donation.status);
                      const bagCount = Math.floor(
                        (Number(donation.quantity) || 0) / 450
                      );

                      return (
                        <Card
                          key={donation.id}
                          className="bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10 border border-purple-100 dark:border-purple-800/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        >
                          <CardContent className="p-6">
                            {/* Donation Header */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                  <Droplets className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                  <div className="font-bold text-gray-900 dark:text-gray-100">
                                    تبرع #{donation.id.slice(-6).toUpperCase()}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {formatDate(donation.createdAt)}
                                  </div>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className={statusInfo.className}
                              >
                                {statusInfo.label}
                              </Badge>
                            </div>

                            {/* Donation Details */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between p-3 bg-purple-50/50 dark:bg-purple-900/20 rounded-lg">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                  الكمية
                                </span>
                                <div className="text-right">
                                  <div className="font-bold text-purple-700 dark:text-purple-400">
                                    {donation.quantity} مل
                                  </div>
                                  <div className="text-xs text-purple-600 dark:text-purple-500">
                                    ({bagCount} كيس)
                                  </div>
                                </div>
                              </div>

                              {donation.case && (
                                <div className="p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg">
                                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    الحالة المرتبطة
                                  </div>
                                  <div className="font-bold text-blue-700 dark:text-blue-400">
                                    {donation.case.patientName}
                                  </div>
                                  {donation.case.hospital && (
                                    <div className="text-sm text-blue-600 dark:text-blue-500">
                                      {donation.case.hospital.name}
                                    </div>
                                  )}
                                  <Badge
                                    variant="outline"
                                    className="mt-2 bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400"
                                  >
                                    {donation.case.bloodType}
                                  </Badge>
                                </div>
                              )}

                              {donation.donationDate && (
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                  <Calendar className="h-4 w-4" />
                                  <span>
                                    تاريخ التبرع:{" "}
                                    {formatDate(donation.donationDate)}
                                  </span>
                                </div>
                              )}

                              {donation.notes && (
                                <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    ملاحظات
                                  </div>
                                  <div className="text-sm text-gray-700 dark:text-gray-300">
                                    {donation.notes}
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center">
                          <Droplets className="w-8 h-8 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                            لا توجد تبرعات
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            لم يقم هذا المستخدم بأي تبرعات حتى الآن
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Cases Section for Hospital/Blood Bank */}
          {(user?.userType === "hospital" ||
            user?.userType === "blood_bank") && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden">
              {/* Cases Header */}
              <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-gray-800/50 dark:to-gray-700/50 px-8 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
                      <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        الحالات الطبية
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        جميع الحالات المرتبطة بهذا{" "}
                        {user?.userType === "hospital"
                          ? "المستشفى"
                          : "بنك الدم"}
                      </p>
                    </div>
                  </div>

                  {/* Cases Count */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                    <FileText className="h-4 w-4" />
                    <span>{caseStats.total} حالة</span>
                  </div>
                </div>

                {/* Cases Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        إجمالي الحالات
                      </div>
                      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {caseStats.total}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        معلقة
                      </div>
                      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {caseStats.pending}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        مكتملة
                      </div>
                      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {caseStats.completed}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Heart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        نشطة
                      </div>
                      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {caseStats.active}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="mt-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="البحث في الحالات..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Cases Content */}
              <div className="p-8">
                {casesError && (
                  <Card className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                        <AlertCircle className="h-5 w-5" />
                        <span>
                          حدث خطأ في تحميل الحالات. يرجى المحاولة مرة أخرى.
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {casesLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <CaseCardSkeleton key={i} />
                    ))}
                  </div>
                ) : filteredCases.length === 0 ? (
                  <Card className="text-center py-12">
                    <CardContent>
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                          <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                            لا توجد حالات
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {searchQuery
                              ? "لم يتم العثور على حالات مطابقة للبحث"
                              : "لم يتم إنشاء أي حالات بعد"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCases.map((caseItem) => (
                      <CaseCard
                        key={caseItem.id}
                        case={caseItem}
                        onViewCase={handleViewCase}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              آخر تحديث: {new Date().toLocaleString("ar-SA")} • نظام إدارة
              المستخدمين المتقدم
            </p>
          </div>
        </div>
      </div>

      {/* Floating Donor Card Button - Always visible for donors */}
      {user?.userType === "donor" && (
        <div className="fixed bottom-8 left-8 z-50">
          <Button
            onClick={() => setDonorCardOpen(true)}
            size="lg"
            className="rounded-full bg-red-600 hover:bg-red-700 text-white shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <CreditCard className="h-5 w-5 ml-2" />
            بطاقة المتبرع
          </Button>
        </div>
      )}

      {/* Donor Card Dialog */}
      {user && (
        <DonorCard
          userId={user.id}
          userName={user.name}
          userAvatar={user.avatar || undefined}
          isOpen={donorCardOpen}
          onOpenChange={setDonorCardOpen}
        />
      )}
    </div>
  );
}

// Enhanced Loading Component with Professional Design
function ObserverUserDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800">
      {/* Loading Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 h-64 bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-32">
          <div className="animate-pulse">
            <div className="h-6 bg-white/20 rounded-full w-64 mb-8"></div>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl"></div>
              <div className="space-y-3">
                <div className="h-8 bg-white/20 rounded-lg w-80"></div>
                <div className="h-5 bg-white/15 rounded-lg w-96"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16 fill-slate-50 dark:fill-gray-900"
          >
            <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,0 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </div>

      {/* Loading Content */}
      <div className="relative -mt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden">
            {/* Loading State */}
            <div className="flex flex-col items-center justify-center py-24 px-8">
              <div className="relative w-20 h-20 mb-8">
                {/* Animated Loading Rings */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-200/30 dark:border-blue-800/30"></div>
                <div className="absolute inset-2 rounded-full border-4 border-blue-400/50 dark:border-blue-600/50 border-t-blue-600 dark:border-t-blue-400 animate-spin"></div>
                <div className="absolute inset-4 rounded-full border-4 border-blue-600/70 dark:border-blue-400/70 border-t-blue-800 dark:border-t-blue-200 animate-spin reverse"></div>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-pulse" />
                </div>
              </div>

              <div className="text-center space-y-4 max-w-md">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  جاري تحميل بيانات المستخدم
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  نقوم بجلب جميع المعلومات والمستندات والسجلات المرتبطة بحساب
                  المستخدم. سيستغرق الأمر لحظات قليلة فقط.
                </p>

                {/* Loading Progress */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-6">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full animate-pulse"
                    style={{ width: "75%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>معالجة البيانات...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ObserverUserDetailPage({
  params,
}: ObserverUserDetailPageProps) {
  const resolvedParams = use(params);

  return (
    <Suspense fallback={<ObserverUserDetailLoading />}>
      <ObserverUserDetailPageContent userId={resolvedParams.id} />
    </Suspense>
  );
}
