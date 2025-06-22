"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DonorCard } from "@/components/ui/donor-card";
import { UserAvatarUpload } from "@/components/user/UserAvatarUpload";
import { UserChangePasswordDialog } from "@/components/user/UserChangePasswordDialog";

import {
  calculateDonationProgress,
  getDonationStatusInfo,
  useUserDonationData,
} from "@/hooks/useDonations";
import {
  getUserFullProfile,
  UserProfileResponseDto,
  usersApi,
} from "@/lib/api";
import { useUser } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Droplets,
  FileText,
  Heart,
  KeyRound,
  Loader2,
  TrendingUp,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function UserDashboard() {
  const user = useUser();
  const router = useRouter();
  const [donorCardOpen, setDonorCardOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  // Fetch user's full profile data
  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
    refetch: profileRefetch,
  } = useQuery<UserProfileResponseDto>({
    queryKey: ["user-full-profile"],
    queryFn: getUserFullProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  console.log(profileData);
  // Fetch user donation data for detailed donation information
  const {
    data: donationData,
    isLoading: donationLoading,
    error: donationError,
  } = useUserDonationData(
    user?.userType === "user" || user?.userType === "donor"
      ? user?.id
      : undefined
  );

  // Calculate donation progress if donation data is available
  const donationProgress = donationData
    ? calculateDonationProgress(donationData.donationStats)
    : null;

  const isLoading = profileLoading || donationLoading;
  const error = profileError || donationError;

  const formatDate = (dateString: string | Date) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: ar });
  };

  // Handle avatar update - refresh user profile data
  const handleAvatarUpdate = () => {
    profileRefetch();
  };

  // Handle password change - simplified version
  const handlePasswordChange = async (newPassword: string) => {
    if (!user?.id) {
      toast.error("معرف المستخدم غير متوفر");
      return;
    }

    setIsPasswordLoading(true);
    try {
      await usersApi.changeOwnPassword(user.id, newPassword);
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
      setIsPasswordLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 h-64 bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-32">
            <div className="flex flex-col items-center justify-center py-24 px-8">
              <div className="relative w-20 h-20 mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-blue-200/30"></div>
                <div className="absolute inset-2 rounded-full border-4 border-blue-400/50 border-t-blue-600 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600 animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                جاري تحميل لوحة التحكم
              </h2>
              <p className="text-blue-100/90 text-center">
                نقوم بجلب جميع معلوماتك وبياناتك الشخصية
              </p>
              <div className="flex items-center gap-2 text-sm text-white/80 mt-4">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>معالجة البيانات...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span>حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 h-64 bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-32">
          <div className="flex items-start gap-6">
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

            <div className="space-y-3">
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                مرحباً، {user?.name}
              </h1>
              <p className="text-lg text-blue-100/90 max-w-2xl leading-relaxed">
                لوحة التحكم الشخصية - إدارة معلوماتك وتتبع نشاطاتك
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-100 text-sm font-medium">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>نشط الآن</span>
                </div>

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

                {(user?.userType === "user" || user?.userType === "donor") && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-100 text-sm font-medium">
                    <Droplets className="h-4 w-4" />
                    <span>متبرع</span>
                  </div>
                )}
              </div>

              {/* Social Media Subscription Section */}
              <div className="mt-8 relative group">
                {/* Background with gradient and glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 dark:from-cyan-400/30 dark:via-blue-400/30 dark:to-purple-400/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-all duration-500"></div>

                <div className="relative bg-white/15 dark:bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-600/30 p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] transform">
                  {/* Header with icon and text */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 dark:from-cyan-300 dark:to-blue-400 mb-3 shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                      ابق على اطلاع دائم
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      اشترك في قنواتنا ليصلك الحالات الطارئة أول بأول
                    </p>
                  </div>

                  {/* Subscription buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {/* Telegram Subscription */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("Telegram button clicked!"); // Debug log

                        // Simplified approach - try app first, then fallback
                        const telegramAppUrl =
                          "tg://resolve?domain=ehiaaa_donation";
                        const telegramWebUrl = "https://t.me/ehiaaa_donation";

                        // Try to open Telegram app
                        try {
                          window.location.href = telegramAppUrl;
                          // Fallback to web after short delay
                          setTimeout(() => {
                            window.open(
                              telegramWebUrl,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }, 1500);
                        } catch (error) {
                          // If app fails, open web version immediately
                          console.log("Opening Telegram web version", error);
                          window.open(
                            telegramWebUrl,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }
                      }}
                      className="relative z-10 group/telegram w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:shadow-blue-500/25 dark:hover:shadow-blue-400/25 transform hover:scale-110 transition-all duration-300 border border-blue-400/30 dark:border-blue-300/30 hover:border-blue-300/50 dark:hover:border-blue-200/50 cursor-pointer"
                    >
                      <div className="relative">
                        <Image
                          src="/telegram.svg"
                          alt="Telegram"
                          width={20}
                          height={20}
                          className="w-5 h-5 group-hover/telegram:rotate-12 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-md scale-150 opacity-0 group-hover/telegram:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <span className="relative">
                        تيليجرام
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/80 group-hover/telegram:w-full transition-all duration-300"></div>
                      </span>
                      <svg
                        className="w-4 h-4 group-hover/telegram:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>

                    {/* Facebook Subscription */}
                    <a
                      href="https://www.facebook.com/profile.php?id=61577831872699"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        console.log("Facebook button clicked!"); // Debug log
                        // Let the default behavior happen (open in new tab)
                      }}
                      className="relative z-10 group/facebook w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:shadow-blue-600/25 dark:hover:shadow-blue-500/25 transform hover:scale-110 transition-all duration-300 border border-blue-500/30 dark:border-blue-400/30 hover:border-blue-400/50 dark:hover:border-blue-300/50 cursor-pointer"
                    >
                      <div className="relative">
                        <Image
                          src="/facebook.svg"
                          alt="Facebook"
                          width={20}
                          height={20}
                          className="w-5 h-5 group-hover/facebook:rotate-12 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-md scale-150 opacity-0 group-hover/facebook:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <span className="relative">
                        فيسبوك
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/80 group-hover/facebook:w-full transition-all duration-300"></div>
                      </span>
                      <svg
                        className="w-4 h-4 group-hover/facebook:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </a>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 dark:from-cyan-300/30 dark:to-blue-400/30 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-2 left-2 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-500/20 dark:from-purple-300/30 dark:to-pink-400/30 rounded-full blur-2xl"></div>

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/60 dark:bg-gray-300/60 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/40 dark:bg-gray-300/40 rounded-full animate-pulse delay-300"></div>
                    <div className="absolute bottom-1/4 left-2/3 w-1 h-1 bg-white/50 dark:bg-gray-300/50 rounded-full animate-pulse delay-700"></div>
                  </div>
                </div>
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

      {/* Main Content */}
      <div className="relative -mt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Use donation data for more accurate statistics */}
            {donationData ? (
              <>
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          إجمالي التبرعات
                        </p>
                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                          {donationData.donationStats.totalDonations}
                        </p>
                      </div>
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">
                          مكتملة
                        </p>
                        <p className="text-2xl font-bold text-green-900 dark:text-green-300">
                          {donationData.donationStats.completedDonations}
                        </p>
                      </div>
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                          معلقة
                        </p>
                        <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-300">
                          {donationData.donationStats.pendingDonations}
                        </p>
                      </div>
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                        <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                          إجمالي الأكياس
                        </p>
                        <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">
                          {donationProgress?.totalBags || 0}
                        </p>
                      </div>
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <Droplets className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : profileData ? (
              <>
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          إجمالي التبرعات
                        </p>
                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                          {profileData.statistics.totalDonations}
                        </p>
                      </div>
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Droplets className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">
                          مكتملة
                        </p>
                        <p className="text-2xl font-bold text-green-900 dark:text-green-300">
                          {profileData.statistics.completedDonations}
                        </p>
                      </div>
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                          معلقة
                        </p>
                        <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-300">
                          {profileData.statistics.pendingDonations}
                        </p>
                      </div>
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                        <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                          حالات في المدينة
                        </p>
                        <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">
                          {profileData.statistics.activeCasesInCity}
                        </p>
                      </div>
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              // Loading skeleton cards
              <>
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        </div>
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>

          {/* User Profile Card */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-gray-800/50 dark:to-gray-700/50 px-8 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* User Avatar Display */}
                  <div className="relative">
                    <UserAvatarUpload
                      userId={user?.id || ""}
                      currentAvatar={profileData?.userData.profilePictureUrl}
                      userName={
                        profileData?.userData.firstName +
                          " " +
                          profileData?.userData.lastName ||
                        user?.name ||
                        ""
                      }
                      onAvatarUpdate={handleAvatarUpdate}
                    />
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"></div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        المعلومات الشخصية
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        بياناتك الأساسية ومعلومات الاتصال
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Avatar Management Button */}

                  {/* Password Change Button */}
                  <Button
                    onClick={() => setPasswordDialogOpen(true)}
                    variant="outline"
                    size="sm"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20"
                  >
                    <KeyRound className="h-4 w-4 ml-2" />
                    تغيير كلمة المرور
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-8">
              {profileData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        الاسم الكامل
                      </label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                        {profileData.userData.firstName}{" "}
                        {profileData.userData.lastName}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        البريد الإلكتروني
                      </label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                        {profileData.userData.email}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        رقم الهاتف
                      </label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                        {profileData.userData.phone}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        فصيلة الدم
                      </label>
                      <div className="mt-1">
                        <Badge
                          variant="outline"
                          className="bg-red-100 text-red-800 border-red-200 text-lg font-semibold"
                        >
                          {profileData.userData.bloodType}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        تاريخ الميلاد
                      </label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                        {formatDate(profileData.userData.birthDate)}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        المدينة والمحافظة
                      </label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                        {profileData.userData.city.nameAr}
                        {profileData.userData.city.governorate && (
                          <span className="text-sm text-gray-600 dark:text-gray-400 block mt-1">
                            محافظة{" "}
                            {profileData.userData.city.governorate.nameAr}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Donation Eligibility Card */}
          {(donationData?.nextEligibilityInfo || profileData?.eligibility) && (
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-slate-50 to-green-50/50 dark:from-gray-800/50 dark:to-green-700/50 px-8 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                    <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      حالة الأهلية للتبرع
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      معلومات عن إمكانية التبرع التالي
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="text-center space-y-4">
                  {/* Use donation data eligibility first, then fall back to profile data */}
                  {donationData?.nextEligibilityInfo ? (
                    donationData.nextEligibilityInfo.isEligible ? (
                      <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                        <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
                          مؤهل للتبرع
                        </h3>
                        <p className="text-green-700 dark:text-green-400">
                          {donationData.nextEligibilityInfo.reason}
                        </p>
                      </div>
                    ) : (
                      <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                        <Clock className="h-12 w-12 text-yellow-600 dark:text-yellow-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2">
                          غير مؤهل حالياً
                        </h3>
                        <p className="text-yellow-700 dark:text-yellow-400 mb-2">
                          {donationData.nextEligibilityInfo.reason}
                        </p>
                        {donationData.nextEligibilityDate && (
                          <p className="text-sm text-yellow-600 dark:text-yellow-500">
                            التاريخ المتاح القادم:{" "}
                            {formatDate(donationData.nextEligibilityDate)}
                          </p>
                        )}
                      </div>
                    )
                  ) : profileData?.eligibility?.canDonate ? (
                    <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
                        مؤهل للتبرع
                      </h3>
                      <p className="text-green-700 dark:text-green-400">
                        يمكنك التبرع بالدم الآن
                      </p>
                    </div>
                  ) : (
                    <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                      <Clock className="h-12 w-12 text-yellow-600 dark:text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2">
                        غير مؤهل حالياً
                      </h3>
                      <p className="text-yellow-700 dark:text-yellow-400 mb-2">
                        {profileData?.eligibility?.reasonIfNotEligible ||
                          "يرجى المراجعة للحصول على المزيد من المعلومات"}
                      </p>
                      {profileData?.eligibility?.nextEligibleDate && (
                        <p className="text-sm text-yellow-600 dark:text-yellow-500">
                          التاريخ المتاح القادم:{" "}
                          {formatDate(profileData.eligibility.nextEligibleDate)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Donations History Section */}
          {donationData?.donations && donationData.donations.length > 0 && (
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-slate-50 to-purple-50/50 dark:from-gray-800/50 dark:to-purple-700/50 px-8 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                      <Droplets className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        تاريخ التبرعات
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        جميع تبرعاتك السابقة والحالية
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
                    <Droplets className="h-4 w-4" />
                    <span>{donationData.donations.length} تبرع</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
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
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Floating Action Buttons */}
      {(user?.userType === "user" || user?.userType === "donor") && (
        <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-4">
          {/* Cases Button */}
          <Button
            onClick={() => router.push("/dashboard/cases")}
            size="lg"
            className="rounded-full bg-red-600 hover:bg-red-700 text-white shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <Heart className="h-5 w-5 ml-2" />
            حالات تحتاج تبرع
          </Button>

          {/* Donor Card Button */}
          <Button
            onClick={() => setDonorCardOpen(true)}
            size="lg"
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
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

      {/* Password Change Dialog */}
      <UserChangePasswordDialog
        isOpen={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
        user={user ? { id: user.id, name: user.name } : null}
        onConfirm={handlePasswordChange}
        isLoading={isPasswordLoading}
      />
    </div>
  );
}
