"use client";

import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { observerDashboardApi } from "@/lib/api";
import { useUser } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  AlertCircle,
  Building2,
  Clock,
  Eye,
  FileText,
  Heart,
  MapPin,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

interface CasesStatistics {
  totalCases: number;
  sameCityCount: number;
  otherCitiesCount: number;
  statusTotals: {
    pending: number;
    active: number;
    closed: number;
    rejected: number;
  };
  sameCityStatusTotals: {
    pending: number;
    active: number;
    closed: number;
    rejected: number;
  };
  otherCitiesStatusTotals: {
    pending: number;
    active: number;
    closed: number;
    rejected: number;
  };
  observerArea: {
    cityId: string;
    cityName: string;
    cityNameAr: string;
    governorateId: string;
    governorateName: string;
    governorateNameAr: string;
    citiesWithoutObservers: number;
    citiesWithoutObserversList: Array<{
      id: string;
      nameEn: string;
      nameAr: string;
    }>;
  };
}

interface UsersStatistics {
  totalUsers: number;
  sameCityCount: number;
  otherCitiesCount: number;
  userTypeTotals: {
    hospitals: number;
    donors: number;
    bloodbanks: number;
  };
  statusTotals: {
    active: number;
    inactive: number;
  };
  sameCityTotals: {
    hospitals: number;
    donors: number;
    bloodbanks: number;
    active: number;
    inactive: number;
  };
  otherCitiesTotals: {
    hospitals: number;
    donors: number;
    bloodbanks: number;
    active: number;
    inactive: number;
  };
  observerArea: {
    cityId: string;
    cityName: string;
    cityNameAr: string;
    governorateId: string;
    governorateName: string;
    governorateNameAr: string;
    citiesWithoutObservers: number;
    citiesWithoutObserversList: Array<{
      id: string;
      nameEn: string;
      nameAr: string;
    }>;
  };
}

export default function ObserverDashboard() {
  const user = useUser();

  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "الرئيسية",
      href: "/",
    },
    {
      label: "لوحة المراقب",
      current: true,
    },
  ];

  // Fetch cases statistics
  const {
    data: casesStats,
    isLoading: casesLoading,
    error: casesError,
  } = useQuery<CasesStatistics>({
    queryKey: ["observer-cases-statistics"],
    queryFn: observerDashboardApi.getCasesStatistics,
  });

  // Fetch users statistics
  const {
    data: usersStats,
    isLoading: usersLoading,
    error: usersError,
  } = useQuery<UsersStatistics>({
    queryKey: ["observer-users-statistics"],
    queryFn: observerDashboardApi.getUsersStatistics,
  });

  const isLoading = casesLoading || usersLoading;
  const hasError = casesError || usersError;

  if (hasError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb for error state */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
              <span>حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left side - Observer info */}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-xl shadow-lg">
                <Eye className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  لوحة تحكم المراقب
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {user?.name || "المراقب"}
                </p>
              </div>
            </div>

            {/* Center - Area info */}
            {casesStats?.observerArea && (
              <div className="hidden md:flex items-center gap-4 bg-slate-50 dark:bg-slate-800 rounded-lg px-4 py-2">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <div className="text-sm">
                  <div className="font-medium text-slate-900 dark:text-slate-100">
                    {casesStats.observerArea.cityNameAr}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    محافظة {casesStats.observerArea.governorateNameAr}
                  </div>
                </div>
              </div>
            )}

            {/* Right side - Time and actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Link href="/observer/users">
                  <Button variant="outline" className="gap-2">
                    <Users className="h-4 w-4" />
                    المستخدمون
                  </Button>
                </Link>
                <Link href="/observer/cases">
                  <Button className="gap-2">
                    <FileText className="h-4 w-4" />
                    عرض الحالات
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8" dir="rtl">
        {/* Breadcrumb Navigation */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Observer Area Info */}
        {casesStats?.observerArea && (
          <Card className="mb-8 border-emerald-200 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
                <MapPin className="h-5 w-5" />
                منطقة المراقبة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                    {casesStats.observerArea.cityNameAr}
                  </div>
                  <div className="text-sm text-emerald-600 dark:text-emerald-400">
                    المدينة المكلف بها
                  </div>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                    {casesStats.observerArea.governorateNameAr}
                  </div>
                  <div className="text-sm text-emerald-600 dark:text-emerald-400">
                    المحافظة
                  </div>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {casesStats.observerArea.citiesWithoutObservers}
                  </div>
                  <div className="text-sm text-orange-600 dark:text-orange-400">
                    مدن بدون مراقبين
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Cases */}
          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    إجمالي الحالات
                  </p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {casesStats?.totalCases || 0}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Cases */}
          <Card className="border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    حالات معلقة
                  </p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {casesStats?.statusTotals.pending || 0}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Users */}
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    إجمالي المستخدمين
                  </p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {usersStats?.totalUsers || 0}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Cases */}
          <Card className="border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
                  <Activity className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    حالات نشطة
                  </p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {casesStats?.statusTotals.active || 0}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Cases Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                إحصائيات الحالات
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-8" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="font-medium">حالات نفس المدينة</span>
                    <Badge variant="secondary">
                      {casesStats?.sameCityCount || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="font-medium">حالات مدن أخرى</span>
                    <Badge variant="outline">
                      {casesStats?.otherCitiesCount || 0}
                    </Badge>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3 text-slate-700 dark:text-slate-300">
                      حسب الحالة:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex justify-between p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                        <span className="text-sm">معلقة</span>
                        <span className="font-medium">
                          {casesStats?.statusTotals.pending || 0}
                        </span>
                      </div>
                      <div className="flex justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <span className="text-sm">نشطة</span>
                        <span className="font-medium">
                          {casesStats?.statusTotals.active || 0}
                        </span>
                      </div>
                      <div className="flex justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <span className="text-sm">مغلقة</span>
                        <span className="font-medium">
                          {casesStats?.statusTotals.closed || 0}
                        </span>
                      </div>
                      <div className="flex justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded">
                        <span className="text-sm">مرفوضة</span>
                        <span className="font-medium">
                          {casesStats?.statusTotals.rejected || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Users Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                إحصائيات المستخدمين
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-8" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="font-medium">مستخدمين نفس المدينة</span>
                    <Badge variant="secondary">
                      {usersStats?.sameCityCount || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="font-medium">مستخدمين مدن أخرى</span>
                    <Badge variant="outline">
                      {usersStats?.otherCitiesCount || 0}
                    </Badge>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3 text-slate-700 dark:text-slate-300">
                      حسب النوع:
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">مستشفيات</span>
                        </div>
                        <span className="font-medium">
                          {usersStats?.userTypeTotals.hospitals || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-600" />
                          <span className="text-sm">متبرعين</span>
                        </div>
                        <span className="font-medium">
                          {usersStats?.userTypeTotals.donors || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">بنوك دم</span>
                        </div>
                        <span className="font-medium">
                          {usersStats?.userTypeTotals.bloodbanks || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Cities Without Observers */}
        {casesStats?.observerArea.citiesWithoutObserversList &&
          casesStats.observerArea.citiesWithoutObserversList.length > 0 && (
            <Card className="border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                  <AlertCircle className="h-5 w-5" />
                  مدن تحتاج لمراقبين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {casesStats.observerArea.citiesWithoutObserversList.map(
                    (city) => (
                      <div
                        key={city.id}
                        className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
                      >
                        <div className="font-medium text-orange-800 dark:text-orange-200">
                          {city.nameAr}
                        </div>
                        <div className="text-sm text-orange-600 dark:text-orange-400">
                          {city.nameEn}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  );
}
