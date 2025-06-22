"use client";

import { AddDonationDialog } from "@/components/hospital/AddDonationDialog";
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
  CheckCircle,
  Clock,
  Download,
  Droplets,
  FileText,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

interface CaseDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CaseDetailPage({ params }: CaseDetailPageProps) {
  const resolvedParams = use(params);
  const { data: caseData, isLoading, error } = useCase(resolvedParams.id);
  const caseItem = caseData;
  const { user } = useAuthStore();

  console.log(caseItem);
  // Check if user is a hospital
  const isHospital = user?.userType === "hospital";

  // Helper function to get standardized avatar URL
  const getAvatarUrl = (avatar?: string | null) => {
    if (avatar) {
      const backendUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      return `${backendUrl}/public/${avatar}`;
    }
    return `/avatars/avatar1.png`; // Default local avatar
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
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
      approved: {
        label: "مُعتمد",
        className:
          "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200/50 dark:from-emerald-900/10 dark:to-teal-900/10 dark:text-emerald-300 dark:border-emerald-700/30 shadow-lg backdrop-blur-sm",
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
        icon: <Activity className="w-4 h-4" />,
        className:
          "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200/50 dark:from-red-900/10 dark:to-rose-900/10 dark:text-red-300 dark:border-red-700/30",
      },
      plasma: {
        label: "بلازما",
        icon: <Droplets className="w-4 h-4" />,
        className:
          "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-200/50 dark:from-amber-900/10 dark:to-yellow-900/10 dark:text-amber-300 dark:border-amber-700/30",
      },
      platelets: {
        label: "صفائح دموية",
        icon: <Users className="w-4 h-4" />,
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

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "HH:mm", { locale: ar });
  };

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy - HH:mm", { locale: ar });
  };

  // Calculate total bags donated (assuming 450ml = 1 bag)
  const totalBagsDonated = caseItem
    ? Math.floor(
        (caseItem.donations?.reduce((total, donation) => {
          const quantity = Number(donation.quantity) || 0;
          return total + (isNaN(quantity) ? 0 : quantity);
        }, 0) || 0) / 450
      )
    : 0;
  const bagsNeeded = Number(caseItem?.bagsNeeded) || 0;
  const safeTotalBagsDonated = isNaN(totalBagsDonated) ? 0 : totalBagsDonated;
  const safeBagsNeeded = isNaN(bagsNeeded) ? 0 : bagsNeeded;
  const showAlarm =
    caseItem?.isActive &&
    safeTotalBagsDonated >= safeBagsNeeded &&
    safeBagsNeeded > 0;

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
        dir="rtl"
      >
        {/* Header Skeleton */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-8 w-48" />
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !caseItem) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 flex items-center justify-center"
        dir="rtl"
      >
        <Card className="max-w-md w-full mx-4 shadow-xl">
          <CardContent className="p-8 text-center">
            <XCircle className="h-20 w-20 text-red-500 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              حدث خطأ
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {error?.message?.includes("404") ||
              error?.message?.includes("not found")
                ? "لم يتم العثور على الحالة المطلوبة"
                : error?.message?.includes("403") ||
                  error?.message?.includes("Forbidden")
                ? "ليس لديك صلاحية للوصول لهذه الحالة"
                : "حدث خطأ أثناء تحميل بيانات الحالة"}
            </p>
            <Link href="/hospital/dashboard">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <ArrowRight className="h-4 w-4 ml-2" />
                العودة للوحة التحكم
              </Button>
            </Link>
          </CardContent>
        </Card>
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
      <div className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/30 dark:border-slate-700/30 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/hospital/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105 rounded-xl shadow-md backdrop-blur-sm"
                >
                  <ArrowRight className="h-4 w-4" />
                  العودة للوحة التحكم
                </Button>
              </Link>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  تفاصيل الحالة الطبية
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
                  #{caseItem.id.slice(-8)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {getStatusBadge(caseItem.status)}
              {getBloodTypeBadge(caseItem.bloodType)}
              {isHospital &&
                (caseItem.status === "approved" ||
                  process.env.NODE_ENV === "development") && (
                  <AddDonationDialog
                    caseId={caseItem.id}
                    bloodType={caseItem.bloodType}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Alert */}
      {showAlarm && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6 shadow-xl border border-green-200 dark:border-green-700 mb-6"
            dir="rtl"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">
                  تم استيفاء الكمية المطلوبة! 🎉
                </h3>
                <p className="text-green-50 text-lg">
                  تم التبرع بـ{" "}
                  <span className="font-bold">{safeTotalBagsDonated}</span> كيس
                  من أصل <span className="font-bold">{safeBagsNeeded}</span> كيس
                  مطلوب.
                  {safeTotalBagsDonated > safeBagsNeeded && (
                    <span className="block mt-1">
                      تم تجاوز الكمية المطلوبة بـ{" "}
                      <span className="font-bold">
                        {safeTotalBagsDonated - safeBagsNeeded}
                      </span>{" "}
                      كيس إضافي.
                    </span>
                  )}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {safeTotalBagsDonated}/{safeBagsNeeded}
                </div>
                <div className="text-sm text-green-100">أكياس</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Patient Information */}
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]">
              <CardHeader className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 border-b border-blue-100/50 dark:border-blue-800/30">
                <CardTitle className="flex items-center gap-4 text-slate-900 dark:text-slate-100 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-bold">معلومات المريض</span>
                    <p className="text-sm text-blue-600/80 dark:text-blue-400/80 font-normal mt-1">
                      البيانات الأساسية للحالة الطبية
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="group">
                      <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 block">
                        اسم المريض
                      </label>
                      <div className="p-4 bg-gradient-to-r from-slate-50 to-zinc-50 dark:from-slate-700/50 dark:to-zinc-700/50 rounded-xl border border-slate-200/50 dark:border-slate-600/30 group-hover:shadow-md transition-all duration-300">
                        <p className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                          <User className="h-5 w-5 text-blue-500" />
                          {caseItem.patientName}
                        </p>
                      </div>
                    </div>
                    <div className="group">
                      <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 block">
                        العمر
                      </label>
                      <div className="p-4 bg-gradient-to-r from-slate-50 to-zinc-50 dark:from-slate-700/50 dark:to-zinc-700/50 rounded-xl border border-slate-200/50 dark:border-slate-600/30 group-hover:shadow-md transition-all duration-300">
                        <p className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                          <Activity className="h-5 w-5 text-emerald-500" />
                          {caseItem.patientAge} سنة
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="group">
                      <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 block">
                        فصيلة الدم المطلوبة
                      </label>
                      <div className="flex justify-start">
                        {getBloodTypeBadge(caseItem.bloodType)}
                      </div>
                    </div>
                    <div className="group">
                      <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 block">
                        نوع التبرع
                      </label>
                      <div className="flex justify-start">
                        {getDonationTypeBadge(caseItem.donationType)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bags Required - Prominent Display */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-red-100 dark:border-red-800 shadow-inner">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-500 text-white rounded-xl shadow-lg">
                          <Droplets className="h-6 w-6" />
                        </div>
                        <span className="text-lg font-bold text-red-700 dark:text-red-400">
                          إحصائيات الأكياس
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                          {safeTotalBagsDonated}
                        </div>
                        <div className="text-sm font-medium text-green-700 dark:text-green-500">
                          تم التبرع
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                          {safeBagsNeeded}
                        </div>
                        <div className="text-sm font-medium text-red-700 dark:text-red-500">
                          مطلوب
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-red-200 dark:border-red-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-red-700 dark:text-red-400">
                          المتبقي:
                        </span>
                        <span
                          className={`text-lg font-bold ${
                            safeTotalBagsDonated >= safeBagsNeeded
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {safeTotalBagsDonated >= safeBagsNeeded
                            ? "مكتمل ✓"
                            : `${safeBagsNeeded - safeTotalBagsDonated} كيس`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {caseItem.description && (
                  <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-2">
                      ملاحظات إضافية
                    </label>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {caseItem.description}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Medical Report */}
            {caseItem.reportDocument && (
              <Card className="shadow-lg border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg">
                      <FileText className="h-6 w-6" />
                    </div>
                    التقرير الطبي
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-green-600" />
                      <div>
                        <div className="font-bold text-green-800 dark:text-green-400 text-lg">
                          تقرير الحالة الطبية
                        </div>
                        <div className="text-sm text-green-600 dark:text-green-500">
                          ملف PDF متاح للتحميل
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="text-green-600 border-green-200 hover:bg-green-50 dark:hover:bg-green-900/30"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = `${
                          process.env.NEXT_PUBLIC_API_URL ||
                          "http://localhost:3000"
                        }/public/documents/cases/${caseItem.id}.pdf`;
                        link.download = `case-${caseItem.id}-report.pdf`;
                        link.target = "_blank";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Download className="h-4 w-4 ml-2" />
                      تحميل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Donations */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg">
                    <Users className="h-6 w-6" />
                  </div>
                  التبرعات ({caseItem.donations?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {caseItem.donations && caseItem.donations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseItem.donations.map((donation) => {
                      const donorName =
                        donation.donor?.name ||
                        `متبرع #${donation.id.slice(-6).toUpperCase()}`;
                      const avatarUrl = (donation.donor as { avatar?: string })
                        ?.avatar; // Use backend avatar
                      const bagCount = Math.floor(
                        (Number(donation.quantity) || 0) / 450
                      );

                      return (
                        <div
                          key={donation.id}
                          className="relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-slate-800 dark:via-purple-900/10 dark:to-pink-900/10 rounded-xl border border-purple-100 dark:border-purple-800/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden group"
                        >
                          {/* Background Pattern */}
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-100/20 to-pink-100/20 dark:from-transparent dark:via-purple-900/10 dark:to-pink-900/10"></div>

                          {/* Status Badge */}
                          <div className="absolute top-3 left-3 z-10">
                            <Badge
                              variant="outline"
                              className="bg-white/90 backdrop-blur-sm text-purple-700 border-purple-200 dark:bg-slate-800/90 dark:text-purple-400 dark:border-purple-700 text-xs font-medium shadow-sm"
                            >
                              {donation.status === "confirmed"
                                ? "مؤكد"
                                : donation.status === "pending"
                                ? "معلق"
                                : donation.status === "completed"
                                ? "مكتمل"
                                : donation.status}
                            </Badge>
                          </div>

                          <div className="relative p-6">
                            {/* Avatar Section */}
                            <div className="flex flex-col items-center mb-4">
                              <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 p-[3px] shadow-lg">
                                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                                    {avatarUrl ? (
                                      <Image
                                        src={getAvatarUrl(avatarUrl)}
                                        alt={donorName}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                        <User className="w-6 h-6 text-white" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {/* Online indicator */}
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 shadow-sm"></div>
                              </div>

                              {/* Donor Name */}
                              <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-3 text-center leading-tight">
                                {donorName}
                              </h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                متبرع نشط
                              </p>
                            </div>

                            {/* Donation Details */}
                            <div className="space-y-3">
                              {/* Quantity Display */}
                              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3 border border-purple-100 dark:border-purple-800/30">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Droplets className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                      الكمية
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-bold text-purple-700 dark:text-purple-400">
                                      {donation.quantity || 0} مل
                                    </div>
                                    <div className="text-xs text-purple-600 dark:text-purple-500">
                                      ({bagCount} كيس)
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Date */}
                              {donation.donationDate && (
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                  <Clock className="h-4 w-4" />
                                  <span>
                                    {formatDateTime(
                                      donation.donationDate.toString()
                                    )}
                                  </span>
                                </div>
                              )}

                              {/* Thank You Message */}
                              <div className="mt-4 pt-3 border-t border-purple-100 dark:border-purple-800/30">
                                <div className="flex items-center gap-2 text-center justify-center">
                                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">
                                      ❤️
                                    </span>
                                  </div>
                                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    شكرًا لك على التبرع
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Hover Effect Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <Users className="h-10 w-10 text-purple-500 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                      لا توجد تبرعات بعد
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                      لم يتم تسجيل أي تبرعات لهذه الحالة حتى الآن. سيتم عرض
                      التبرعات هنا عند وصولها.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Case Status & Timeline */}
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]">
              <CardHeader className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-blue-100/50 dark:border-blue-800/30">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      حالة الطلب
                    </span>
                    <p className="text-sm text-blue-600/80 dark:text-blue-400/80 font-normal mt-1">
                      تتبع حالة الطلب والتحديثات
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="text-center p-4 bg-gradient-to-r from-slate-50/80 to-zinc-50/80 dark:from-slate-700/30 dark:to-zinc-700/30 rounded-xl border border-slate-200/50 dark:border-slate-600/30">
                    {getStatusBadge(caseItem.status)}
                  </div>
                  <div className="space-y-4 pt-2 border-t border-slate-200/50 dark:border-slate-600/30">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50/50 to-zinc-50/50 dark:from-slate-700/20 dark:to-zinc-700/20 rounded-lg">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        تاريخ الإنشاء:
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                        {formatDate(caseItem.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50/50 to-zinc-50/50 dark:from-slate-700/20 dark:to-zinc-700/20 rounded-lg">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        الوقت:
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                        {formatTime(caseItem.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50/50 to-zinc-50/50 dark:from-slate-700/20 dark:to-zinc-700/20 rounded-lg">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        آخر تحديث:
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                        {formatDate(caseItem.updatedAt)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50/50 to-zinc-50/50 dark:from-slate-700/20 dark:to-zinc-700/20 rounded-lg">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        نشط:
                      </span>
                      <Badge
                        variant={caseItem.isActive ? "default" : "secondary"}
                        className={`text-xs font-semibold px-3 py-1 ${
                          caseItem.isActive
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200/50 dark:from-green-900/10 dark:to-emerald-900/10 dark:text-green-300 dark:border-green-700/30"
                            : "bg-gradient-to-r from-slate-50 to-zinc-50 text-slate-700 border-slate-200/50 dark:from-slate-900/10 dark:to-zinc-900/10 dark:text-slate-300 dark:border-slate-700/30"
                        }`}
                      >
                        {caseItem.isActive ? "نعم" : "لا"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hospital Information */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg">
                    <Building2 className="h-5 w-5" />
                  </div>
                  معلومات المستشفى
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                      اسم المستشفى
                    </label>
                    <div className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
                      {caseItem.hospital?.name}
                    </div>
                  </div>

                  {caseItem.hospital?.city && (
                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                        المدينة
                      </label>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-700 dark:text-slate-300">
                          {caseItem.hospital.city.nameAr}
                        </span>
                      </div>
                    </div>
                  )}

                  {caseItem.hospital?.phone && (
                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                        رقم الهاتف
                      </label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span
                          className="text-slate-700 dark:text-slate-300"
                          dir="ltr"
                        >
                          {caseItem.hospital.phone}
                        </span>
                      </div>
                    </div>
                  )}

                  {caseItem.hospital?.email && (
                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                        البريد الإلكتروني
                      </label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span
                          className="text-slate-700 dark:text-slate-300 text-sm"
                          dir="ltr"
                        >
                          {caseItem.hospital.email}
                        </span>
                      </div>
                    </div>
                  )}

                  {caseItem.hospital?.address && (
                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                        العنوان
                      </label>
                      <div className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed bg-slate-50 dark:bg-slate-700/30 p-2 rounded">
                        {caseItem.hospital.address}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Status History */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg">
                    <Clock className="h-5 w-5" />
                  </div>
                  تاريخ الحالة
                </CardTitle>
              </CardHeader>
              <CardContent>
                {caseItem.statusLogs && caseItem.statusLogs.length > 0 ? (
                  <div className="space-y-4">
                    {caseItem.statusLogs.map((log) => (
                      <div key={log.id} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full mt-2 shadow-lg" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {log.description}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {formatDateTime(log.createdAt)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      لا يوجد تاريخ متاح للحالة
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
