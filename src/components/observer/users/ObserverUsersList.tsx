"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DonorCard } from "@/components/ui/donor-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  observerUsersApi,
  type ObserverUser,
  type ObserverUsersFilters,
} from "@/lib/api";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Droplets,
  Eye,
  Heart,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  ShieldAlert,
  TrendingUp,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Statistics Cards Component
function StatisticsCards({ users }: { users: ObserverUser[] }) {
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const donorUsers = users.filter((user) => user.userType === "donor").length;
  const hospitalUsers = users.filter(
    (user) => user.userType === "hospital"
  ).length;
  const bloodbankUsers = users.filter(
    (user) => user.userType === "bloodbank"
  ).length;
  const verifiedUsers = users.filter((user) => user.isVerified).length;

  const cards = [
    {
      title: "إجمالي المستخدمين",
      value: totalUsers,
      icon: User,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-700 dark:text-blue-300",
    },
    {
      title: "المستخدمين النشطين",
      value: activeUsers,
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-700 dark:text-green-300",
    },
    {
      title: "المتبرعين",
      value: donorUsers,
      icon: Droplets,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-700 dark:text-red-300",
    },
    {
      title: "المستشفيات",
      value: hospitalUsers,
      icon: Building2,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      textColor: "text-indigo-700 dark:text-indigo-300",
    },
    {
      title: "بنوك الدم",
      value: bloodbankUsers,
      icon: Heart,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-700 dark:text-purple-300",
    },
    {
      title: "المستخدمين الموثقين",
      value: verifiedUsers,
      icon: User,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      textColor: "text-emerald-700 dark:text-emerald-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <Card
            key={index}
            className="relative overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">
                    {card.title}
                  </p>
                  <p className={`text-2xl font-bold ${card.textColor}`}>
                    {card.value.toLocaleString("ar-EG")}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-full ${card.bgColor} transition-transform duration-300 group-hover:scale-110`}
                >
                  <IconComponent className={`h-5 w-5 ${card.textColor}`} />
                </div>
              </div>

              {/* Gradient Background Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-lg">
                <div
                  className={`absolute inset-0 rounded-lg bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  style={{
                    background: `linear-gradient(90deg, transparent, ${
                      card.color.split(" ")[1]
                    }, transparent)`,
                    transform: "translateX(-100%)",
                    animation: "shimmer 2s infinite",
                  }}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export function ObserverUsersList() {
  const queryClient = useQueryClient();

  // State for filters
  const [filters, setFilters] = useState<ObserverUsersFilters>({
    page: 1,
    limit: 12,
    userType: "all",
    status: "all",
    search: "",
  });

  // State for donor card
  const [selectedDonorUser, setSelectedDonorUser] =
    useState<ObserverUser | null>(null);
  const [donorCardOpen, setDonorCardOpen] = useState(false);

  // Fetch users data with React Query
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["observer-users", filters],
    queryFn: () => observerUsersApi.getObserverAreaUsers(filters),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2,
  });

  // Function to invalidate and refetch observer users data
  const refetchObserverUsers = () => {
    // Invalidate all observer-users queries
    queryClient.invalidateQueries({ queryKey: ["observer-users"] });
    // Also invalidate user detail queries to ensure consistency
    queryClient.invalidateQueries({ queryKey: ["observer-user-detail"] });
    // Force refetch current data
    refetch();
  };

  // Handle donor card opening
  const handleOpenDonorCard = (user: ObserverUser) => {
    setSelectedDonorUser(user);
    setDonorCardOpen(true);
  };

  const users = data?.data || [];
  const pagination = {
    page: data?.page || 1,
    limit: data?.limit || 12,
    total: data?.total || 0,
    pages: data?.total ? Math.ceil(data.total / (data.limit || 12)) : 0,
  };

  const handleFilterChange = (
    key: keyof ObserverUsersFilters,
    value: string | number
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== "page" ? 1 : (value as number), // Ensure page is always a number
    }));
  };

  const handleSearch = (searchTerm: string) => {
    setFilters((prev) => ({
      ...prev,
      search: searchTerm,
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const getBackendUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  };

  const getAvatarUrl = (avatar?: string) => {
    if (!avatar) return "/avatars/avatar1.png"; // Return fallback instead of null
    if (avatar.startsWith("http")) return avatar;
    return `${getBackendUrl()}/public/${avatar}`;
  };

  const getUserTypeLabel = (userType: string) => {
    const labels = {
      user: "متبرع",
      hospital: "مستشفى",
      bloodbank: "بنك الدم",
    };
    return labels[userType as keyof typeof labels] || userType;
  };

  const getUserTypeIcon = (userType: string) => {
    const icons = {
      donor: User,
      hospital: Building2,
      bloodbank: Building2,
    };
    return icons[userType as keyof typeof icons] || User;
  };

  const getUserTypeColor = (userType: string) => {
    const colors = {
      donor: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
      hospital:
        "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
      bloodbank:
        "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    };
    return (
      colors[userType as keyof typeof colors] ||
      "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
    );
  };

  const getUserStatusLabel = (status: string) => {
    const labels = {
      active: "نشط",
      inactive: "غير نشط",
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getUserStatusColor = (status: string) => {
    const colors = {
      active:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      inactive:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    };
    return (
      colors[status as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    );
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="relative bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl border border-red-200 dark:border-red-800 text-center max-w-md w-full overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-100 dark:bg-red-800/20 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-100 dark:bg-red-800/20 rounded-full"></div>
          <div className="relative z-10">
            <ShieldAlert className="h-12 w-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
            <div className="text-red-600 dark:text-red-400 text-xl font-bold mb-3">
              حدث خطأ في تحميل البيانات
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              لم نتمكن من الوصول إلى بيانات المستخدمين. يرجى المحاولة مرة أخرى.
            </p>
            <Button
              onClick={() => refetchObserverUsers()}
              variant="destructive"
              className="w-full relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-500 group-hover:opacity-90 transition-opacity"></span>
              <span className="relative flex items-center justify-center">
                <RefreshCw className="h-4 w-4 ml-2" />
                إعادة المحاولة
              </span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8" dir="rtl">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-800">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
        <div className="relative p-8 sm:p-10">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-2">
              <User className="h-3.5 w-3.5" />
              إدارة المستخدمين
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              مستخدمو المنطقة
            </h1>
            <p className="text-blue-100 max-w-md text-lg">
              عرض وإدارة المتبرعين والمستشفيات وبنوك الدم في منطقتك
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      {!isLoading && !error && <StatisticsCards users={users} />}

      {/* Statistics Cards Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                  <div className="w-11 h-11 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث بالاسم أو البريد الإلكتروني..."
              value={filters.search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select
            value={filters.userType}
            onValueChange={(value) => handleFilterChange("userType", value)}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="نوع المستخدم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              <SelectItem value="donor">متبرعين</SelectItem>
              <SelectItem value="hospital">مستشفيات</SelectItem>
              <SelectItem value="bloodbank">بنوك الدم</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="inactive">غير نشط</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => refetchObserverUsers()}
          variant="outline"
          disabled={isFetching}
          className="gap-2"
        >
          <RefreshCw className={cn("h-4 w-4", isFetching && "animate-spin")} />
          تحديث
        </Button>
      </div>

      {/* Users Grid */}
      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : users.length === 0 ? (
          <Card className="text-center py-8">
            <CardContent>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                    لا توجد مستخدمين
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    لم يتم العثور على أي مستخدمين مطابقين للبحث
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {users.map((user) => {
              const TypeIcon = getUserTypeIcon(user.userType);

              return (
                <Card
                  key={user.id}
                  className="group hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <CardContent className="p-3">
                    {/* Compact Header with Avatar and User Info */}
                    <div className="flex items-start gap-2 mb-3">
                      {/* Compact Avatar */}
                      <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5 shadow-sm">
                        <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                          {user.avatar ? (
                            <Image
                              src={getAvatarUrl(user.avatar)}
                              alt={`صورة ${user.name}`}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover rounded-full"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                target.nextElementSibling?.classList.remove(
                                  "hidden"
                                );
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
                              <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Compact User Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate leading-tight">
                          {user.name}
                        </h3>

                        {/* Compact Badges Row */}
                        <div className="flex items-center gap-1 mt-1 mb-1">
                          <Badge
                            variant="outline"
                            className={`text-xs py-0 px-1 h-5 ${getUserTypeColor(
                              user.userType
                            )} border`}
                          >
                            <TypeIcon className="w-2.5 h-2.5 ml-0.5" />
                            {getUserTypeLabel(user.userType)}
                          </Badge>
                        </div>

                        {/* Compact Status Row */}
                        <div className="flex items-center gap-1">
                          <Badge
                            className={`text-xs py-0 px-1 h-4 ${getUserStatusColor(
                              user.status
                            )}`}
                          >
                            {getUserStatusLabel(user.status)}
                          </Badge>
                          {user.isVerified && (
                            <Badge
                              variant="default"
                              className="text-xs py-0 px-1 h-4"
                            >
                              موثق
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Compact Contact Information */}
                    <div className="space-y-1 mb-2 text-xs">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Mail className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate" title={user.email}>
                          {user.email}
                        </span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Phone className="w-3 h-3 flex-shrink-0" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                      {user.city && (
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">
                            {user.city.nameAr || "غير محدد"}
                          </span>
                        </div>
                      )}

                      {/* Compact Info Row */}
                      <div className="flex items-center justify-end">
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(user.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-end gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 px-2 text-xs text-blue-600 border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              asChild
                            >
                              <Link href={`/observer/users/${user.id}`}>
                                <Eye className="h-3 w-3 ml-1" />
                                تفاصيل
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>عرض تفاصيل المستخدم</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      {/* Donor Card Button - Only for donors */}
                      {user.userType === "donor" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 px-2 text-xs text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                                onClick={() => handleOpenDonorCard(user)}
                              >
                                <CreditCard className="h-3 w-3 ml-1" />
                                بطاقة
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>تصدير بطاقة المتبرع</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            عرض {(pagination.page - 1) * pagination.limit + 1} إلى{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} من
            أصل {pagination.total} مستخدم
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
            >
              <ChevronRight className="h-4 w-4" />
              السابق
            </Button>
            {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
              const pageNum = Math.max(
                1,
                Math.min(pagination.page - 2 + i, pagination.pages - 4 + i)
              );
              return (
                <Button
                  key={pageNum}
                  variant={pagination.page === pageNum ? "default" : "outline"}
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
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.pages}
            >
              التالي
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Donor Card Dialog */}
      {selectedDonorUser && (
        <DonorCard
          userId={selectedDonorUser.id}
          userName={selectedDonorUser.name}
          userAvatar={selectedDonorUser.avatar || undefined}
          isOpen={donorCardOpen}
          onOpenChange={setDonorCardOpen}
        />
      )}
    </div>
  );
}
