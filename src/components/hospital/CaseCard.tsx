"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type CaseResponse } from "@/lib/cases-api";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Droplets,
  Eye,
  FileText,
  Heart,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";

interface CaseCardProps {
  case: CaseResponse;
  onViewCase?: (caseId: string) => void;
}

export function CaseCard({ case: caseItem, onViewCase }: CaseCardProps) {
  // Calculate total bags donated (450ml = 1 bag)
  const totalBagsDonated = Math.floor(
    (caseItem.donations?.reduce((total, donation) => {
      const quantity = Number(donation.quantity) || 0;
      return total + (isNaN(quantity) ? 0 : quantity);
    }, 0) || 0) / 450
  );

  const bagsNeeded = Number(caseItem.bagsNeeded) || 0;
  const isCompleted = totalBagsDonated >= bagsNeeded && bagsNeeded > 0;

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: {
        label: "معلق",
        className:
          "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400",
      },
      approved: {
        label: "مُعتمد",
        className:
          "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
      },
      rejected: {
        label: "مرفوض",
        className:
          "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400",
      },
      completed: {
        label: "مكتمل",
        className:
          "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400",
      },
      cancelled: {
        label: "ملغي",
        className:
          "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400",
      },
    };

    const statusInfo = statusMap[status] || {
      label: status,
      className:
        "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400",
    };

    return (
      <Badge
        variant="outline"
        className={`text-xs font-medium ${statusInfo.className}`}
      >
        {statusInfo.label}
      </Badge>
    );
  };

  const getBloodTypeBadge = (bloodType: string) => {
    const isRare = ["AB-", "AB+", "B-", "A-", "O-"].includes(bloodType);
    return (
      <Badge
        variant="outline"
        className={`text-sm font-bold ${
          isRare
            ? "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-400"
            : "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400"
        }`}
      >
        {bloodType}
      </Badge>
    );
  };

  const getDonationTypeBadge = (donationType: string) => {
    const typeMap = {
      whole_blood: {
        label: "دم كامل",
        className:
          "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400",
      },
      plasma: {
        label: "بلازما",
        className:
          "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400",
      },
      platelets: {
        label: "صفائح دموية",
        className:
          "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400",
      },
    };

    const typeInfo = typeMap[donationType as keyof typeof typeMap] || {
      label: donationType,
      className:
        "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400",
    };

    return (
      <Badge
        variant="outline"
        className={`text-xs font-medium ${typeInfo.className}`}
      >
        {typeInfo.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: ar });
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "HH:mm", { locale: ar });
  };

  const getUrgencyLevel = () => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const isRecent = new Date(caseItem.createdAt) > twentyFourHoursAgo;
    const isHighDemand = caseItem.bagsNeeded >= 5;

    if (isRecent && isHighDemand) return "عاجل جداً";
    if (isRecent || isHighDemand) return "عاجل";
    return "عادي";
  };

  const urgency = getUrgencyLevel();

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 relative overflow-hidden">
      {/* Status Indicator Bar */}
      <div
        className={`absolute top-0 left-0 h-1 w-full ${
          caseItem.status === "pending"
            ? "bg-amber-400"
            : caseItem.status === "completed"
            ? "bg-green-400"
            : caseItem.status === "rejected"
            ? "bg-red-400"
            : "bg-gray-400"
        }`}
      />

      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-sm">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                {caseItem.patientName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {caseItem.patientAge} سنة
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {getStatusBadge(caseItem.status)}
            {urgency !== "عادي" && (
              <Badge
                variant="outline"
                className={`text-xs ${
                  urgency === "عاجل جداً"
                    ? "bg-red-100 text-red-700 border-red-300 animate-pulse"
                    : "bg-orange-100 text-orange-700 border-orange-300"
                }`}
              >
                <AlertCircle className="h-3 w-3 ml-1" />
                {urgency}
              </Badge>
            )}
          </div>
        </div>

        {/* Medical Information */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-red-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              فصيلة الدم:
            </span>
            {getBloodTypeBadge(caseItem.bloodType)}
          </div>

          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              نوع التبرع:
            </span>
            {getDonationTypeBadge(caseItem.donationType)}
          </div>
        </div>

        {/* Bags Required - Enhanced Display */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg p-4 mb-4 border border-red-100 dark:border-red-800 relative">
          {/* Completion Badge */}
          {isCompleted && (
            <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-red-700 dark:text-red-400">
                  إحصائيات الأكياس
                </span>
              </div>
              {isCompleted && (
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                  مكتمل ✓
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {totalBagsDonated}
                </div>
                <div className="text-xs font-medium text-green-700 dark:text-green-500">
                  تم التبرع
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {bagsNeeded}
                </div>
                <div className="text-xs font-medium text-red-700 dark:text-red-500">
                  مطلوب
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-red-200 dark:border-red-700">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-red-700 dark:text-red-400">
                  المتبقي:
                </span>
                <span
                  className={`text-sm font-bold ${
                    isCompleted
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {isCompleted
                    ? "مكتمل ✓"
                    : `${bagsNeeded - totalBagsDonated} كيس`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Donations Section */}
        <div className="flex items-center justify-between mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              التبرعات الحالية
            </span>
          </div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {caseItem.donations?.length || 0} متبرع
          </div>
        </div>

        {/* Hospital Information */}
        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {caseItem.hospital?.name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <MapPin className="h-3 w-3" />
            <span>{caseItem.hospital?.city?.nameAr}</span>
            <Phone className="h-3 w-3 mr-2" />
            <span>{caseItem.hospital?.phone}</span>
          </div>
        </div>

        {/* Description */}
        {caseItem.description && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
              <div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                  ملاحظات إضافية:
                </span>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {caseItem.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1 mb-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(caseItem.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatTime(caseItem.createdAt)}</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewCase?.(caseItem.id)}
            className="group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors"
          >
            <Eye className="h-4 w-4 ml-2" />
            عرض التفاصيل
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
