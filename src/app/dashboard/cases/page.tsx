"use client";

import { CaseCard } from "@/components/hospital/CaseCard";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  calculateMyCityCasesStats,
  useActiveCasesInMyCity,
  type MyCityCasesFilters,
} from "@/hooks/useCases";
import { type CaseResponse } from "@/lib/cases-api";
import { useUser } from "@/stores/authStore";
import {
  AlertCircle,
  Calendar,
  Clock,
  Droplets,
  FileText,
  Heart,
  MapPin,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyCityCasesPage() {
  const user = useUser();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<MyCityCasesFilters>({
    page: 1,
    limit: 12,
  });

  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "الرئيسية",
      href: "/",
    },
    {
      label: "لوحة التحكم",
      href: "/dashboard",
    },
    {
      label: "حالات تحتاج تبرع",
      current: true,
    },
  ];

  // Fetch cases in user's city using React Query
  const {
    data: casesData,
    isLoading: casesLoading,
    error: casesError,
  } = useActiveCasesInMyCity(filters);

  const cases = casesData?.cases || [];
  const pagination = casesData?.pagination;
  const userCity = casesData?.userCity;

  // Filter cases based on search query
  const filteredCases = cases.filter(
    (caseItem: CaseResponse) =>
      caseItem.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleViewCase = (caseId: string) => {
    router.push(`/dashboard/cases/${caseId}`);
  };

  const handleFilterChange = (
    key: keyof MyCityCasesFilters,
    value: string | number | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== "page" ? 1 : (value as number), // Reset page when changing other filters
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  // Calculate statistics from current data
  const stats = calculateMyCityCasesStats(cases);

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
      className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
      dir="rtl"
    >
      {/* Professional Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left side - User info */}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-red-600 to-rose-600 text-white rounded-xl shadow-lg">
                <Heart className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  حالات تحتاج تبرع
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {user?.name || "المتبرع"}
                </p>
              </div>
            </div>

            {/* Center - City info */}
            {userCity && (
              <div className="hidden md:flex items-center gap-4 bg-slate-50 dark:bg-slate-800 rounded-lg px-4 py-2">
                <MapPin className="h-5 w-5 text-red-600" />
                <div className="text-sm">
                  <div className="font-medium text-slate-900 dark:text-slate-100">
                    {userCity.nameAr || userCity.nameEn}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    مدينتك
                  </div>
                </div>
              </div>
            )}

            {/* Right side - Time */}
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
            </div>
          </div>

          {/* Filters Row */}
          <div className="pb-4 space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
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

              {/* Filters */}
              <div className="flex gap-2">
                <Select
                  value={filters.bloodType || "all"}
                  onValueChange={(value) =>
                    handleFilterChange(
                      "bloodType",
                      value === "all" ? undefined : value
                    )
                  }
                >
                  <SelectTrigger className="w-32 bg-slate-50 dark:bg-slate-800">
                    <SelectValue placeholder="فصيلة الدم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفصائل</SelectItem>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.donationType || "all"}
                  onValueChange={(value) =>
                    handleFilterChange(
                      "donationType",
                      value === "all" ? undefined : value
                    )
                  }
                >
                  <SelectTrigger className="w-40 bg-slate-50 dark:bg-slate-800">
                    <SelectValue placeholder="نوع التبرع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأنواع</SelectItem>
                    <SelectItem value="blood">دم</SelectItem>
                    <SelectItem value="organ">أعضاء</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Error State */}
        {casesError && (
          <Card className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span>حدث خطأ في تحميل الحالات. يرجى المحاولة مرة أخرى.</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                  {casesLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {stats.total}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-lg">
                  <Zap className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    حالات عاجلة
                  </p>
                  {casesLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {stats.urgent}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    حالات حديثة
                  </p>
                  {casesLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {stats.recent}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                  <Droplets className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    فصائل مختلفة
                  </p>
                  {casesLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {Object.keys(stats.byBloodType).length}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cases Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              الحالات النشطة ({filteredCases.length})
            </h2>
            {pagination && (
              <div className="text-sm text-slate-600 dark:text-slate-400">
                صفحة {pagination.currentPage} من {pagination.totalPages}
              </div>
            )}
          </div>

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
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                      لا توجد حالات نشطة
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      لم يتم العثور على حالات تحتاج تبرع في مدينتك حاليًا
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((caseItem: CaseResponse) => (
                <CaseCard
                  key={caseItem.id}
                  case={caseItem}
                  onViewCase={handleViewCase}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                عرض {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}{" "}
                إلى{" "}
                {Math.min(
                  pagination.currentPage * pagination.itemsPerPage,
                  pagination.totalItems
                )}{" "}
                من أصل {pagination.totalItems} حالة
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPreviousPage}
                >
                  السابق
                </Button>
                {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                  const pageNum = Math.max(
                    1,
                    Math.min(
                      pagination.currentPage - 2 + i,
                      pagination.totalPages - 4 + i
                    )
                  );
                  return (
                    <Button
                      key={pageNum}
                      variant={
                        pagination.currentPage === pageNum
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className="w-8"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                >
                  التالي
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
