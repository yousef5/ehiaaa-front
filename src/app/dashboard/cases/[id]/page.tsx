"use client";

import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { casesApi, type CaseResponse } from "@/lib/cases-api";
import { useUser } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Droplets,
  FileText,
  Heart,
  MapPin,
  Phone,
  User,
  XCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function CaseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const user = useUser();

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
      href: "/dashboard/cases",
    },
    {
      label: "تفاصيل الحالة",
      current: true,
    },
  ];

  // Fetch case data
  const {
    data: caseData,
    isLoading,
    error,
  } = useQuery<CaseResponse>({
    queryKey: ["case", id],
    queryFn: () => casesApi.getCaseById(id as string),
    enabled: !!id,
  });

  const formatDate = (dateString: string | Date) => {
    return format(new Date(dateString), "dd MMMM yyyy - HH:mm", { locale: ar });
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
          "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200/50 dark:from-green-900/10 dark:to-emerald-900/10 dark:text-green-300 dark:border-green-700/30 shadow-lg backdrop-blur-sm",
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
      closed: {
        label: "مغلق",
        className:
          "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-200/50 dark:from-gray-900/10 dark:to-slate-900/10 dark:text-gray-300 dark:border-gray-700/30 shadow-lg backdrop-blur-sm",
      },
      completed: {
        label: "مكتمل",
        className:
          "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200/50 dark:from-blue-900/10 dark:to-cyan-900/10 dark:text-blue-300 dark:border-blue-700/30 shadow-lg backdrop-blur-sm",
      },
      cancelled: {
        label: "ملغي",
        className:
          "bg-gradient-to-r from-gray-50 to-neutral-50 text-gray-600 border-gray-200/50 dark:from-gray-900/10 dark:to-neutral-900/10 dark:text-gray-400 dark:border-gray-700/30 shadow-lg backdrop-blur-sm",
      },
    };

    const statusInfo = statusMap[status] || statusMap.pending;
    return (
      <Badge variant="outline" className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    );
  };

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

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
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
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span>
                  حدث خطأ في تحميل بيانات الحالة أو أن الحالة غير موجودة.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                العودة
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-red-600 to-rose-600 text-white rounded-xl">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    تفاصيل الحالة
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {caseData.patientName}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getStatusIcon(caseData.status)}
              {getStatusBadge(caseData.status)}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case Details Card */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-lg border border-white/20 dark:border-slate-700/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                    <User className="h-6 w-6 text-red-600" />
                    {caseData.patientName}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-red-100 text-red-800 border-red-200 text-lg font-semibold px-4 py-1"
                  >
                    {caseData.bloodType}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <User className="h-4 w-4" />
                      <span className="font-medium">العمر:</span>
                      <span>{caseData.patientAge} سنة</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Droplets className="h-4 w-4" />
                      <span className="font-medium">نوع التبرع:</span>
                      <span>
                        {caseData.donationType === "blood" ? "دم" : "أعضاء"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Heart className="h-4 w-4" />
                      <span className="font-medium">الأكياس المطلوبة:</span>
                      <span>{caseData.bagsNeeded} كيس</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">تاريخ الإنشاء:</span>
                      <span>{formatDate(caseData.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">آخر تحديث:</span>
                      <span>{formatDate(caseData.updatedAt)}</span>
                    </div>
                  </div>
                </div>

                {caseData.description && (
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      وصف الحالة
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {caseData.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Donations Section */}
            {caseData.donations && caseData.donations.length > 0 && (
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-lg border border-white/20 dark:border-slate-700/20">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                    <Droplets className="h-5 w-5 text-blue-600" />
                    التبرعات ({caseData.donations.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {caseData.donations.map((donation) => (
                      <div
                        key={donation.id}
                        className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium text-slate-900 dark:text-slate-100">
                              {donation.donor?.name || "متبرع مجهول"}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              الكمية: {donation.quantity} مل
                            </div>
                            {donation.donationDate && (
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                تاريخ التبرع:{" "}
                                {formatDate(donation.donationDate)}
                              </div>
                            )}
                          </div>
                          <Badge variant="outline">{donation.status}</Badge>
                        </div>
                        {donation.notes && (
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            ملاحظات: {donation.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hospital Information */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-lg border border-white/20 dark:border-slate-700/20">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  معلومات المستشفى
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {caseData.hospital.name}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{caseData.hospital.city.nameAr}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Phone className="h-4 w-4" />
                  <span>{caseData.hospital.phone}</span>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {caseData.hospital.address}
                </div>
              </CardContent>
            </Card>

            {/* Action Card */}
            {(user?.userType === "user" || user?.userType === "donor") && (
              <Card className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-red-200 dark:border-red-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-red-900 dark:text-red-300 flex items-center gap-3">
                    <Heart className="h-5 w-5" />
                    هل تريد التبرع؟
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-red-700 dark:text-red-300 text-sm">
                    يمكنك التواصل مع المستشفى مباشرة للتبرع لهذه الحالة
                  </p>
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => {
                      window.open(`tel:${caseData.hospital.phone}`, "_self");
                    }}
                  >
                    <Phone className="h-4 w-4 ml-2" />
                    الاتصال بالمستشفى
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
