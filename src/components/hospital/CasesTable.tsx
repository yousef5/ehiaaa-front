"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type CaseResponse } from "@/lib/cases-api";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  Calendar,
  Clock,
  Droplets,
  Edit,
  Eye,
  FileText,
  Heart,
  Trash2,
  User,
  Users,
} from "lucide-react";

interface CasesTableProps {
  cases: CaseResponse[];
  isLoading?: boolean;
  onViewCase?: (caseId: string) => void;
  onEditCase?: (caseId: string) => void;
  onDeleteCase?: (caseId: string) => void;
}

export function CasesTable({
  cases,
  isLoading,
  onViewCase,
  onEditCase,
  onDeleteCase,
}: CasesTableProps) {
  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      {
        label: string;
        variant: "secondary" | "default" | "destructive" | "outline";
        className?: string;
      }
    > = {
      pending: { label: "معلق", variant: "secondary" },
      approved: { label: "مُعتمد", variant: "default" },
      rejected: { label: "مرفوض", variant: "destructive" },
      completed: {
        label: "مكتمل",
        variant: "default",
        className: "bg-green-50 text-green-700 border-green-200",
      },
      cancelled: { label: "ملغي", variant: "outline" },
    };

    const statusInfo = statusMap[status] || {
      label: status,
      variant: "secondary" as const,
    };

    return (
      <Badge
        variant={statusInfo.variant}
        className={`text-xs ${statusInfo.className || ""}`}
      >
        {statusInfo.label}
      </Badge>
    );
  };

  const getBloodTypeBadge = (bloodType: string) => {
    const isRare = ["AB-", "AB+", "B-", "A-", "O-"].includes(bloodType);
    return (
      <Badge
        variant={isRare ? "destructive" : "outline"}
        className={`text-xs ${
          isRare ? "bg-red-50 text-red-700 border-red-200" : ""
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
        color: "bg-red-50 text-red-700 border-red-200",
      },
      plasma: {
        label: "بلازما",
        color: "bg-yellow-50 text-yellow-700 border-yellow-200",
      },
      platelets: {
        label: "صفائح دموية",
        color: "bg-blue-50 text-blue-700 border-blue-200",
      },
    };

    const typeInfo = typeMap[donationType as keyof typeof typeMap] || {
      label: donationType,
      color: "bg-gray-50 text-gray-700 border-gray-200",
    };

    return (
      <Badge variant="outline" className={`text-xs ${typeInfo.color}`}>
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

  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            الحالات الطبية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 space-x-reverse"
              >
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!cases || cases.length === 0) {
    return (
      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            الحالات الطبية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              لا توجد حالات طبية
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              لم يتم إنشاء أي حالات طبية بعد. ابدأ بإنشاء حالة جديدة.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          الحالات الطبية ({cases.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">المريض</TableHead>
                <TableHead className="text-right">العمر</TableHead>
                <TableHead className="text-right">فصيلة الدم</TableHead>
                <TableHead className="text-right">نوع التبرع</TableHead>
                <TableHead className="text-right">عدد الأكياس</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">التبرعات</TableHead>
                <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((caseItem) => (
                <TableRow
                  key={caseItem.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {caseItem.patientName}
                        </div>
                        {caseItem.description && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-32 truncate">
                            {caseItem.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">
                        {caseItem.patientAge} سنة
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getBloodTypeBadge(caseItem.bloodType)}</TableCell>
                  <TableCell>
                    {getDonationTypeBadge(caseItem.donationType)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-red-500" />
                      <span className="font-medium">{caseItem.bagsNeeded}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(caseItem.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {caseItem.donations?.length || 0} متبرع
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Calendar className="h-3 w-3" />
                        {formatDate(caseItem.createdAt)}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mt-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(caseItem.createdAt)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {onViewCase && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewCase(caseItem.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      {onEditCase && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditCase(caseItem.id)}
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {onDeleteCase && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteCase(caseItem.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
