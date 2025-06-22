"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonorCard } from "@/components/ui/donor-card";
import { Skeleton } from "@/components/ui/skeleton";
import { observerUsersApi, usersApi } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  Activity,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Droplets,
  Heart,
  Info,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
  UserCheck,
  UserX,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ObserverAvatarUpload } from "./ObserverAvatarUpload";
import { ObserverChangePasswordDialog } from "./ObserverChangePasswordDialog";
import { ObserverUserStatusDialog } from "./ObserverUserStatusDialog";
import { ObserverUserStatusHistory } from "./ObserverUserStatusHistory";

interface ObserverUserDetailProps {
  userId: string;
}

export function ObserverUserDetail({ userId }: ObserverUserDetailProps) {
  const queryClient = useQueryClient();
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [donorCardOpen, setDonorCardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
    isActive: boolean;
  } | null>(null);

  const {
    data: user,
    isLoading: isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["observer-user-detail", userId],
    queryFn: () => observerUsersApi.getUserById(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleStatusToggle = () => {
    if (user) {
      setSelectedUser({
        id: user.id,
        name: user.name,
        isActive: user.isActive,
      });
      setStatusDialogOpen(true);
    }
  };

  const handleStatusDialogConfirm = async (
    action: "activate" | "deactivate",
    reason?: string
  ) => {
    setIsLoading(true);
    try {
      if (action === "activate") {
        await usersApi.activateUser(userId, reason);
        toast.success("تم تفعيل المستخدم بنجاح");
      } else {
        if (!reason) {
          toast.error("سبب الإيقاف مطلوب");
          return;
        }
        await usersApi.deactivateUser(userId, reason);
        toast.success("تم إيقاف المستخدم بنجاح");
      }

      // Invalidate observer users queries to update the main list
      queryClient.invalidateQueries({ queryKey: ["observer-users"] });
      queryClient.invalidateQueries({
        queryKey: ["observer-user-detail", userId],
      });

      refetch();
      setStatusDialogOpen(false);
      setSelectedUser(null);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message
          : "حدث خطأ أثناء تغيير حالة المستخدم";
      toast.error(errorMessage || "حدث خطأ أثناء تغيير حالة المستخدم");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = () => {
    setPasswordDialogOpen(true);
  };

  const handlePasswordDialogConfirm = async (newPassword: string) => {
    setIsLoading(true);
    try {
      await usersApi.changeUserPassword(userId, newPassword);
      toast.success("تم تغيير كلمة المرور بنجاح");
      setPasswordDialogOpen(false);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message
          : "حدث خطأ أثناء تغيير كلمة المرور";
      toast.error(errorMessage || "حدث خطأ أثناء تغيير كلمة المرور");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy", { locale: ar });
  };

  if (isFetching) {
    return <LoadingSkeleton />;
  }

  if (error || !user) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="space-y-8" dir="rtl">
      {/* User Profile Header Card */}
      <Card className="border-0 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30 dark:from-gray-800 dark:via-gray-800/80 dark:to-gray-900/60 shadow-xl backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Avatar and Basic Info */}
            <div className="lg:col-span-1">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <ObserverAvatarUpload
                    userId={userId}
                    currentAvatar={user.avatar || undefined}
                    userName={user.name}
                    onAvatarUpdate={refetch}
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {user.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400" dir="ltr">
                    {user.email}
                  </p>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge
                    variant={user.isActive ? "default" : "secondary"}
                    className={`px-3 py-1.5 text-sm font-medium ${
                      user.isActive
                        ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50"
                        : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600/50"
                    }`}
                  >
                    {user.isActive ? (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-2" />
                    )}
                    {user.isActive ? "نشط" : "غير نشط"}
                  </Badge>

                  <Badge
                    className={`px-3 py-1.5 text-sm font-medium ${
                      user.userStatus === "Active"
                        ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50"
                        : "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700/50"
                    }`}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    {user.userStatus === "Active" ? "موثق" : "غير موثق"}
                  </Badge>
                </div>

                {/* Action Button */}
                <Button
                  onClick={handleStatusToggle}
                  disabled={isLoading}
                  className={`w-full max-w-48 ${
                    user.isActive
                      ? "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                      : "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                  } text-white shadow-lg transition-all duration-200`}
                >
                  {user.isActive ? (
                    <UserX className="h-4 w-4 mr-2" />
                  ) : (
                    <UserCheck className="h-4 w-4 mr-2" />
                  )}
                  {user.isActive ? "إيقاف المستخدم" : "تفعيل المستخدم"}
                </Button>

                {/* Change Password Button */}
                <Button
                  onClick={handlePasswordChange}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full max-w-48 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 shadow-lg transition-all duration-200"
                >
                  <KeyRound className="h-4 w-4 mr-2" />
                  تغيير كلمة المرور
                </Button>

                {/* Donor Card Button - Only show for donors */}
                {user.userType === "donor" && (
                  <Button
                    onClick={() => setDonorCardOpen(true)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <CreditCard className="h-4 w-4" />
                    بطاقة المتبرع
                  </Button>
                )}
              </div>
            </div>

            {/* User Details Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <Card className="border border-gray-200/80 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-900 dark:text-gray-100">
                      <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      معلومات الاتصال
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          البريد الإلكتروني
                        </div>
                        <div
                          className="text-sm font-medium text-gray-900 dark:text-gray-100"
                          dir="ltr"
                        >
                          {user.email}
                        </div>
                      </div>
                    </div>

                    {user.phone && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            رقم الهاتف
                          </div>
                          <div
                            className="text-sm font-medium text-gray-900 dark:text-gray-100"
                            dir="ltr"
                          >
                            {user.phone}
                          </div>
                        </div>
                      </div>
                    )}

                    {user.city && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            المدينة
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {user.city.nameAr}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Account Information */}
                <Card className="border border-gray-200/80 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-900 dark:text-gray-100">
                      <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      معلومات الحساب
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          نوع الحساب
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {user.userType === "hospital"
                            ? "مستشفى"
                            : user.userType === "user"
                            ? "متبرع"
                            : "بنك دم"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                        <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          تاريخ التسجيل
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {formatDate(user.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                        <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          آخر تحديث
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {formatDate(user.updatedAt)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content - Spans 2 columns */}
        <div className="xl:col-span-2 space-y-6">
          {/* Type-specific Information */}
          {user.userType === "hospital" && (
            <Card className="border border-gray-200/80 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-100/50 dark:border-blue-800/30">
                <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
                  <div className="p-2 bg-blue-600 dark:bg-blue-700 text-white rounded-xl shadow-md">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">معلومات المستشفى</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      البيانات التجارية والقانونية
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.commercialRecord && (
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        السجل التجاري
                      </label>
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
                        <span className="text-gray-900 dark:text-gray-100 font-mono text-lg">
                          {user.commercialRecord}
                        </span>
                      </div>
                    </div>
                  )}
                  {user.taxNumber && (
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        الرقم الضريبي
                      </label>
                      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200/50 dark:border-indigo-800/30">
                        <span className="text-gray-900 dark:text-gray-100 font-mono text-lg">
                          {user.taxNumber}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {user.userType === "user" && user.bloodType && (
            <Card className="border border-gray-200/80 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-50/80 to-rose-50/80 dark:from-red-900/20 dark:to-rose-900/20 border-b border-red-100/50 dark:border-red-800/30">
                <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
                  <div className="p-2 bg-red-600 dark:bg-red-700 text-white rounded-xl shadow-md">
                    <Droplets className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">معلومات المتبرع</h3>
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                      فصيلة الدم ومعلومات التبرع
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200/50 dark:border-red-800/30">
                  <div className="p-3 bg-red-600 dark:bg-red-700 text-white rounded-full">
                    <Droplets className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      فصيلة الدم
                    </div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {user.bloodType}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Address Information */}
          {user.address && (
            <Card className="border border-gray-200/80 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
                  <div className="p-2 bg-purple-600 dark:bg-purple-700 text-white rounded-xl">
                    <MapPin className="h-5 w-5" />
                  </div>
                  العنوان التفصيلي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200/50 dark:border-purple-800/30">
                  <p className="text-gray-900 dark:text-gray-100 leading-relaxed">
                    {user.address}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Status History */}
          <div className="space-y-4">
            <ObserverUserStatusHistory
              statusLogs={user.statusLogs?.map((log) => ({
                id: log.id,
                status: log.status,
                description: log.description,
                createdAt: log.createdAt,
                observer: log.observerId ? { name: "المشرف" } : undefined,
              }))}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          {/* Quick Stats */}
          <Card className="border border-gray-200/80 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900 dark:text-gray-100">
                <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                إحصائيات سريعة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200/50 dark:border-green-800/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                        حالة النشاط
                      </div>
                      <div className="text-lg font-bold text-green-700 dark:text-green-300">
                        {user.isActive ? "نشط" : "غير نشط"}
                      </div>
                    </div>
                    <div
                      className={`p-2 rounded-full ${
                        user.isActive ? "bg-green-600" : "bg-gray-500"
                      }`}
                    >
                      {user.isActive ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : (
                        <XCircle className="h-5 w-5 text-white" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        حالة التوثيق
                      </div>
                      <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                        {user.userStatus === "Active" ? "موثق" : "غير موثق"}
                      </div>
                    </div>
                    <div
                      className={`p-2 rounded-full ${
                        user.userStatus === "Active"
                          ? "bg-blue-600"
                          : "bg-amber-500"
                      }`}
                    >
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200/50 dark:border-purple-800/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                        نوع المستخدم
                      </div>
                      <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
                        {user.userType === "hospital"
                          ? "مستشفى"
                          : user.userType === "user"
                          ? "متبرع"
                          : "بنك دم"}
                      </div>
                    </div>
                    <div className="p-2 bg-purple-600 rounded-full">
                      {user.userType === "hospital" ? (
                        <Building2 className="h-5 w-5 text-white" />
                      ) : user.userType === "user" ? (
                        <Droplets className="h-5 w-5 text-white" />
                      ) : (
                        <Heart className="h-5 w-5 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          {user.city && (
            <Card className="border border-gray-200/80 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-gray-900 dark:text-gray-100">
                  <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  معلومات الموقع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200/50 dark:border-indigo-800/30">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                        المدينة
                      </span>
                      <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                        {user.city.nameAr}
                      </span>
                    </div>
                    {user.city.governorate && (
                      <div className="flex items-center justify-between border-t border-indigo-200/50 dark:border-indigo-800/30 pt-3">
                        <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                          المحافظة
                        </span>
                        <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                          {user.city.governorate.nameAr}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Status Dialog */}
      <ObserverUserStatusDialog
        isOpen={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        onConfirm={handleStatusDialogConfirm}
        user={selectedUser}
        isLoading={isLoading}
      />

      {/* Password Dialog */}
      <ObserverChangePasswordDialog
        isOpen={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
        user={user ? { id: user.id, name: user.name } : null}
        onConfirm={handlePasswordDialogConfirm}
        isLoading={isLoading}
      />

      {/* Donor Card Dialog */}
      <DonorCard
        userId={user.id}
        userName={user.name}
        userAvatar={user.avatar || undefined}
        isOpen={donorCardOpen}
        onOpenChange={setDonorCardOpen}
      />
    </div>
  );
}

// Loading Skeleton Component
function LoadingSkeleton() {
  return (
    <div className="space-y-8" dir="rtl">
      {/* Header Skeleton */}
      <Card className="border-0 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30 dark:from-gray-800 dark:via-gray-800/80 dark:to-gray-900/60 shadow-xl">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 flex flex-col items-center space-y-4">
              <Skeleton className="w-32 h-32 rounded-full" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-10 w-48" />
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-48 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
        <div className="xl:col-span-1 space-y-6">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// Error State Component
function ErrorState({ error }: { error: Error | null }) {
  console.error("User detail error:", error);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
          <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          حدث خطأ في تحميل البيانات
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          لم نتمكن من تحميل بيانات المستخدم. يرجى المحاولة مرة أخرى.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
        >
          إعادة المحاولة
        </Button>
      </div>
    </div>
  );
}
