"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCase } from "@/hooks/useCases";
import { useAuthStore } from "@/stores/authStore";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Droplets,
  Edit,
  FileText,
  Heart,
  MapPin,
  Phone,
  Shield,
  Trash2,
  User,
  XCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

interface AdminCaseDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AdminCaseDetailPage({
  params,
}: AdminCaseDetailPageProps) {
  const resolvedParams = use(params);
  const { data: caseData, isLoading, error } = useCase(resolvedParams.id);
  const caseItem = caseData;
  const { user } = useAuthStore();

  // Check if user is an admin
  const isAdmin = user?.userType === "admin";

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "closed":
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "approved":
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-gray-600" />;
      case "pending":
        return <Clock className="h-5 w-5 text-amber-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: {
        label: "معلق",
        className:
          "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border-amber-200/50 dark:from-amber-900/10 dark:to-orange-900/10 dark:text-amber-300 dark:border-amber-700/30 shadow-lg backdrop-blur-sm",
      },
      active: {
        label: "نشط",
        className:
          "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200/50 dark:from-emerald-900/10 dark:to-teal-900/10 dark:text-emerald-300 dark:border-emerald-700/30 shadow-lg backdrop-blur-sm",
      },
      approved: {
        label: "مُعتمد",
        className:
          "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200/50 dark:from-emerald-900/10 dark:to-teal-900/10 dark:text-emerald-300 dark:border-emerald-700/30 shadow-lg backdrop-blur-sm",
      },
      closed: {
        label: "مغلق",
        className:
          "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200/50 dark:from-blue-900/10 dark:to-indigo-900/10 dark:text-blue-300 dark:border-blue-700/30 shadow-lg backdrop-blur-sm",
      },
      rejected: {
        label: "مرفوض",
        className:
          "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200/50 dark:from-red-900/10 dark:to-rose-900/10 dark:text-red-300 dark:border-red-700/30 shadow-lg backdrop-blur-sm",
      },
      completed: {
        label: "مكتمل",
        className:
          "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200/50 dark:from-green-900/10 dark:to-emerald-900/10 dark:text-green-300 dark:border-green-700/30 shadow-lg backdrop-blur-sm",
      },
      cancelled: {
        label: "ملغي",
        className:
          "bg-gradient-to-r from-slate-50 to-zinc-50 text-slate-700 border-slate-200/50 dark:from-slate-900/10 dark:to-zinc-900/10 dark:text-slate-300 dark:border-slate-700/30 shadow-lg backdrop-blur-sm",
      },
    };

    const statusInfo = statusMap[status] || {
      label: status,
      className:
        "bg-gradient-to-r from-slate-50 to-zinc-50 text-slate-700 border-slate-200/50 dark:from-slate-900/10 dark:to-zinc-900/10 dark:text-slate-300 dark:border-slate-700/30 shadow-lg backdrop-blur-sm",
    };

    return (
      <Badge
        variant="outline"
        className={`text-sm font-semibold px-4 py-2 transition-all duration-300 hover:scale-105 ${statusInfo.className}`}
      >
        {getStatusIcon(status)}
        <span className="mr-2">{statusInfo.label}</span>
      </Badge>
    );
  };

  const getBloodTypeBadge = (bloodType: string) => {
    const isRare = ["AB-", "AB+", "B-", "A-", "O-"].includes(bloodType);
    return (
      <Badge
        variant="outline"
        className={`text-lg font-bold px-4 py-2 transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm ${
          isRare
            ? "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200/50 dark:from-red-900/10 dark:to-rose-900/10 dark:text-red-300 dark:border-red-700/30"
            : "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200/50 dark:from-blue-900/10 dark:to-indigo-900/10 dark:text-blue-300 dark:border-blue-700/30"
        }`}
      >
        <Droplets className="w-4 h-4 mr-2" />
        {bloodType}
      </Badge>
    );
  };

  const getDonationTypeBadge = (donationType: string) => {
    const typeMap = {
      whole_blood: {
        label: "دم كامل",
        icon: <Heart className="w-4 h-4" />,
        className:
          "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200/50 dark:from-red-900/10 dark:to-rose-900/10 dark:text-red-300 dark:border-red-700/30",
      },
      plasma: {
        label: "بلازما",
        icon: <Zap className="w-4 h-4" />,
        className:
          "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-200/50 dark:from-amber-900/10 dark:to-yellow-900/10 dark:text-amber-300 dark:border-amber-700/30",
      },
      platelets: {
        label: "صفائح دموية",
        icon: <Shield className="w-4 h-4" />,
        className:
          "bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 border-purple-200/50 dark:from-purple-900/10 dark:to-violet-900/10 dark:text-purple-300 dark:border-purple-700/30",
      },
    };

    const typeInfo = typeMap[donationType as keyof typeof typeMap] || {
      label: donationType,
      icon: <Activity className="w-4 h-4" />,
      className:
        "bg-gradient-to-r from-slate-50 to-zinc-50 text-slate-700 border-slate-200/50 dark:from-slate-900/10 dark:to-zinc-900/10 dark:text-slate-300 dark:border-slate-700/30",
    };

    return (
      <Badge
        variant="outline"
        className={`text-sm font-semibold px-3 py-2 transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm ${typeInfo.className}`}
      >
        <span className="mr-2">{typeInfo.icon}</span>
        {typeInfo.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy", { locale: ar });
  };

  // Calculate current donations from donations array
  const currentDonations = caseItem?.donations?.length || 0;
  const remainingBags = Math.max(
    0,
    (caseItem?.bagsNeeded || 0) - currentDonations
  );

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy - HH:mm", { locale: ar });
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-indigo-50/80 via-cyan-50/60 to-teal-50/80 dark:from-slate-950 dark:via-indigo-950/30 dark:to-slate-900"
        dir="rtl"
      >
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-emerald-200/30 dark:from-teal-900/10 dark:to-emerald-900/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Header Skeleton */}
        <div className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/30 dark:border-slate-700/30 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Skeleton className="h-12 w-36 rounded-xl" />
                <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl">
                  <Skeleton className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-10 w-24 rounded-xl" />
                <Skeleton className="h-10 w-20 rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-slate-700/30">
                <div className="space-y-4">
                  <Skeleton className="h-8 w-48 rounded-lg" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Skeleton className="h-6 w-full rounded-lg" />
                      <Skeleton className="h-6 w-3/4 rounded-lg" />
                    </div>
                    <div className="space-y-3">
                      <Skeleton className="h-6 w-full rounded-lg" />
                      <Skeleton className="h-6 w-3/4 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-slate-700/30">
                <Skeleton className="h-8 w-40 rounded-lg mb-6" />
                <div className="space-y-4">
                  <Skeleton className="h-20 w-full rounded-lg" />
                  <Skeleton className="h-32 w-full rounded-lg" />
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/30">
                <Skeleton className="h-8 w-32 rounded-lg mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-6 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4 rounded-lg" />
                  <Skeleton className="h-6 w-1/2 rounded-lg" />
                </div>
              </div>
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/30">
                <Skeleton className="h-8 w-40 rounded-lg mb-4" />
                <div className="space-y-4">
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !caseItem) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-indigo-50/80 via-cyan-50/60 to-teal-50/80 dark:from-slate-950 dark:via-indigo-950/30 dark:to-slate-900"
        dir="rtl"
      >
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-emerald-200/30 dark:from-teal-900/10 dark:to-emerald-900/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 py-24 flex items-center justify-center min-h-screen">
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-red-200/50 dark:border-red-800/30 shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-50/80 to-rose-50/80 dark:from-red-900/20 dark:to-rose-900/20 p-6 border-b border-red-200/30 dark:border-red-800/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-500 text-white rounded-xl shadow-lg">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-red-700 dark:text-red-300">
                    خطأ في التحميل
                  </h1>
                  <p className="text-sm text-red-600/80 dark:text-red-400/80">
                    لم نتمكن من الوصول إلى البيانات
                  </p>
                </div>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  حدث خطأ في تحميل بيانات الحالة. يرجى التحقق من الاتصال
                  بالإنترنت والمحاولة مرة أخرى.
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/admin/cases">
                    <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      العودة إلى الحالات
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    إعادة المحاولة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-50/80 via-cyan-50/60 to-teal-50/80 dark:from-slate-950 dark:via-indigo-950/30 dark:to-slate-900"
      dir="rtl"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 dark:from-purple-900/5 dark:to-pink-900/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-emerald-200/30 dark:from-teal-900/10 dark:to-emerald-900/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-slate-200/40 dark:border-slate-700/40 shadow-2xl sticky top-0 z-50">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-teal-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-teal-500/10"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-6">
          {/* Top row - Navigation and Quick Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link href="/admin/cases">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-slate-300/60 dark:border-slate-600/60 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-xl group"
                >
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <span className="font-medium">العودة</span>
                </Button>
              </Link>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-mono bg-slate-100/60 dark:bg-slate-800/60 px-3 py-1 rounded-lg backdrop-blur-sm">
                #{caseItem.id.slice(-8)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {getStatusBadge(caseItem.status)}
              {getBloodTypeBadge(caseItem.bloodType)}
            </div>
          </div>

          {/* Main Header Content */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left Side - Case Info */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-2xl shadow-xl">
                  <Shield className="h-8 w-8" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    إدارة الحالة
                  </h1>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{caseItem.patientName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span className="text-sm">{caseItem.hospital.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Action Buttons */}
            {isAdmin && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Admin Control Buttons Group */}
                <div className="flex items-center gap-2 p-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                  <Button size="sm" variant="outline" className="gap-2">
                    <Edit className="w-4 h-4" />
                    تعديل
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    حذف
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Info Bar */}
          <div className="mt-6 pt-4 border-t border-slate-200/30 dark:border-slate-700/30">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-emerald-500" />
                  <span>تم الإنشاء: {formatDate(caseItem.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>آخر تحديث: {formatDate(caseItem.updatedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-red-500" />
                  <span className="font-medium">
                    {caseItem.bagsNeeded} كيس مطلوب
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  حالة نشطة
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Case Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Case Header Card */}
            <Card className="bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                          {caseItem.patientName}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                          العمر: {caseItem.patientAge} سنة
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      {getStatusBadge(caseItem.status)}
                      {getBloodTypeBadge(caseItem.bloodType)}
                      {getDonationTypeBadge(caseItem.donationType)}
                    </div>
                  </div>
                  {/* Admin Actions */}
                  {isAdmin && (
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Edit className="w-4 h-4" />
                        تعديل
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        حذف
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Case Description */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    وصف الحالة
                  </h3>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200/50 dark:border-slate-700/50">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {caseItem.description || "لا يوجد وصف متاح لهذه الحالة"}
                    </p>
                  </div>
                </div>

                {/* Case Progress */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    تقدم الحالة
                  </h3>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200/50 dark:border-slate-700/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {caseItem.bagsNeeded}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          أكياس مطلوبة
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {currentDonations}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          تبرعات حالية
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                          {remainingBags}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          أكياس متبقية
                        </p>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                        <span>التقدم</span>
                        <span>
                          {Math.round(
                            (currentDonations / caseItem.bagsNeeded) * 100
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              (currentDonations / caseItem.bagsNeeded) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hospital Information */}
            <Card className="bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  <Building2 className="w-5 h-5" />
                  معلومات المستشفى
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        اسم المستشفى
                      </p>
                      <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {caseItem.hospital.name}
                      </p>
                    </div>
                    {caseItem.hospital.phone && (
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          رقم الهاتف
                        </p>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-slate-500" />
                          <a
                            href={`tel:${caseItem.hospital.phone}`}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                          >
                            {caseItem.hospital.phone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {caseItem.hospital.address && (
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          العنوان
                        </p>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-slate-500 mt-1" />
                          <p className="text-slate-700 dark:text-slate-300">
                            {caseItem.hospital.address}
                          </p>
                        </div>
                      </div>
                    )}
                    {caseItem.hospital.city && (
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          المدينة
                        </p>
                        <p className="text-slate-700 dark:text-slate-300">
                          {caseItem.hospital.city.nameAr}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Case Status Card */}
            <Card className="bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  <Shield className="w-5 h-5" />
                  إدارة الحالة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isAdmin && (
                  <div className="space-y-3">
                    <Button className="w-full justify-start gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      <Edit className="w-4 h-4" />
                      تغيير حالة القضية
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 border-green-200 text-green-700 hover:bg-green-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                      اعتماد الحالة
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 border-red-200 text-red-700 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4" />
                      رفض الحالة
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Case Timeline */}
            <Card className="bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  <Clock className="w-5 h-5" />
                  الجدول الزمني
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        تم إنشاء الحالة
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        {formatDateTime(caseItem.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200/50 dark:border-green-800/50">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                        آخر تحديث
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        {formatDateTime(caseItem.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  <Activity className="w-5 h-5" />
                  إحصائيات سريعة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      نوع الطوارئ
                    </span>
                    <Badge
                      variant="outline"
                      className="border-blue-300 text-blue-700 bg-blue-50"
                    >
                      عادي
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      معرف الحالة
                    </span>
                    <span className="text-sm font-mono font-medium text-slate-700 dark:text-slate-300">
                      #{caseItem.id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
