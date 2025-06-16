import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usersApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  AlertTriangle,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  History,
  RefreshCw,
  ShieldCheck,
  User,
  UserCheck,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { UserDocuments } from "./UserDocuments";
import { UserHeader } from "./UserHeader";
import { UserPersonalInfo } from "./UserPersonalInfo";
import { UserReviewInfo } from "./UserReviewInfo";
import { UserStatusDialog } from "./UserStatusDialog";
import { UserStatusHistory } from "./UserStatusHistory";

interface UserDetailProps {
  userId: string;
}

// Define color types for type safety
type ColorType =
  | "blue"
  | "emerald"
  | "amber"
  | "purple"
  | "rose"
  | "indigo"
  | "cyan"
  | "violet"
  | "gray";

export function UserDetail({ userId }: UserDetailProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
    isActive: boolean;
  } | null>(null);

  const {
    data: userFullData,
    isLoading: isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user-full", userId],
    queryFn: () => usersApi.getFullUserData(userId),
    retry: 2,
    enabled: !!userId,
  });

  const handleUserAction = async (
    action: "approve" | "reject" | "activate" | "deactivate",
    reason?: string
  ) => {
    setIsLoading(true);
    try {
      switch (action) {
        case "approve":
          await usersApi.approveUser(userId);
          toast.success("تم اعتماد المستخدم بنجاح");
          break;
        case "reject":
          if (!reason) return;
          await usersApi.rejectUser(userId, reason);
          toast.success("تم رفض المستخدم");
          break;
        case "activate":
          await usersApi.activateUser(userId, reason);
          toast.success("تم تفعيل المستخدم بنجاح");
          break;
        case "deactivate":
          if (!reason) return;
          await usersApi.deactivateUser(userId, reason);
          toast.success("تم إيقاف المستخدم بنجاح");
          break;
      }
      refetch();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message
          : "حدث خطأ أثناء تنفيذ العملية";
      toast.error(errorMessage || "حدث خطأ أثناء تنفيذ العملية");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusDialogConfirm = async (
    action: "activate" | "deactivate",
    reason?: string
  ) => {
    await handleUserAction(action, reason);
    setStatusDialogOpen(false);
    setSelectedUser(null);
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-red-100 dark:border-red-900/30 p-8">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-red-600"></div>
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-red-50 dark:bg-red-900/20 rounded-full"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-full mb-4">
              <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              خطأ في تحميل البيانات
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              لم نتمكن من تحميل بيانات المستخدم. يرجى التحقق من الاتصال
              بالإنترنت والمحاولة مرة أخرى.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xs">
              <Button
                onClick={() => refetch()}
                className="relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:opacity-90 transition-opacity"></span>
                <span className="relative flex items-center justify-center">
                  <RefreshCw className="h-4 w-4 ml-2" />
                  إعادة المحاولة
                </span>
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push("/admin/users")}
                className="border-gray-200 dark:border-gray-700"
              >
                العودة للقائمة
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <div className="space-y-8">
          {/* Header skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-48"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-72"></div>
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-28" />
              </div>
            </div>
          </div>

          {/* Status cards skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-3 w-full">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-20"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-16"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-32"></div>
                  </div>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Content skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-56 w-full rounded-xl" />
              <Skeleton className="h-40 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userFullData) {
    return null;
  }

  // Get data from the API response
  const { user, documents, reviewInfo } = userFullData;

  // Custom status cards instead of using UserStatusCards component
  const renderStatusCards = () => {
    const statusCards = [
      {
        title: "الحالة",
        value: user.isActive ? "نشط" : "غير نشط",
        description: user.isActive
          ? "المستخدم نشط حالياً"
          : "المستخدم غير نشط حالياً",
        icon: user.isActive ? CheckCircle2 : XCircle,
        color: user.isActive ? "emerald" : ("gray" as ColorType),
      },
      {
        title: "حالة الموافقة",
        value:
          user.userStatus === "approved" || user.userStatus === "Approved"
            ? "معتمد"
            : user.userStatus === "rejected" || user.userStatus === "Rejected"
            ? "مرفوض"
            : "قيد المراجعة",
        description:
          user.userStatus === "approved" || user.userStatus === "Approved"
            ? "تمت الموافقة على المستخدم"
            : user.userStatus === "rejected" || user.userStatus === "Rejected"
            ? "تم رفض المستخدم"
            : "في انتظار المراجعة",
        icon:
          user.userStatus === "approved" || user.userStatus === "Approved"
            ? BadgeCheck
            : user.userStatus === "rejected" || user.userStatus === "Rejected"
            ? AlertTriangle
            : Clock,
        color:
          user.userStatus === "approved" || user.userStatus === "Approved"
            ? "blue"
            : user.userStatus === "rejected" || user.userStatus === "Rejected"
            ? "amber"
            : ("purple" as ColorType),
      },
      {
        title: "نوع المستخدم",
        value:
          user.userType === "user"
            ? "متبرع"
            : user.userType === "hospital"
            ? "مستشفى"
            : "بنك دم",
        description: `نوع حساب المستخدم: ${
          user.userType === "user"
            ? "متبرع"
            : user.userType === "hospital"
            ? "مستشفى"
            : "بنك دم"
        }`,
        icon: User,
        color:
          user.userType === "user"
            ? "rose"
            : user.userType === "hospital"
            ? "indigo"
            : ("cyan" as ColorType),
      },
      {
        title: "تاريخ التسجيل",
        value: new Date(user.createdAt).toLocaleDateString("ar-EG"),
        description: `تم التسجيل في ${new Date(
          user.createdAt
        ).toLocaleDateString("ar-EG")}`,
        icon: Calendar,
        color: "violet" as ColorType,
      },
    ];

    // Define color mappings with proper typing
    const colorClasses: Record<ColorType, string> = {
      blue: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800/30",
      emerald:
        "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-800/20 border-emerald-200 dark:border-emerald-800/30",
      amber:
        "from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-800/20 border-amber-200 dark:border-amber-800/30",
      purple:
        "from-purple-50 to-fuchsia-100 dark:from-purple-900/20 dark:to-fuchsia-800/20 border-purple-200 dark:border-purple-800/30",
      rose: "from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-800/20 border-rose-200 dark:border-rose-800/30",
      indigo:
        "from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-800/20 border-indigo-200 dark:border-indigo-800/30",
      cyan: "from-cyan-50 to-sky-100 dark:from-cyan-900/20 dark:to-sky-800/20 border-cyan-200 dark:border-cyan-800/30",
      violet:
        "from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-800/20 border-violet-200 dark:border-violet-800/30",
      gray: "from-gray-50 to-gray-100 dark:from-gray-800/40 dark:to-gray-700/40 border-gray-200 dark:border-gray-700/30",
    };

    const iconColorClasses: Record<ColorType, string> = {
      blue: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800/30",
      emerald:
        "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-800/30",
      amber:
        "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-800/30",
      purple:
        "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-800/30",
      rose: "text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-800/30",
      indigo:
        "text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-800/30",
      cyan: "text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-800/30",
      violet:
        "text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-800/30",
      gray: "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/30",
    };

    const textColorClasses: Record<ColorType, string> = {
      blue: "text-blue-900 dark:text-blue-100",
      emerald: "text-emerald-900 dark:text-emerald-100",
      amber: "text-amber-900 dark:text-amber-100",
      purple: "text-purple-900 dark:text-purple-100",
      rose: "text-rose-900 dark:text-rose-100",
      indigo: "text-indigo-900 dark:text-indigo-100",
      cyan: "text-cyan-900 dark:text-cyan-100",
      violet: "text-violet-900 dark:text-violet-100",
      gray: "text-gray-900 dark:text-gray-100",
    };

    const descriptionColorClasses: Record<ColorType, string> = {
      blue: "text-blue-700/70 dark:text-blue-300/70",
      emerald: "text-emerald-700/70 dark:text-emerald-300/70",
      amber: "text-amber-700/70 dark:text-amber-300/70",
      purple: "text-purple-700/70 dark:text-purple-300/70",
      rose: "text-rose-700/70 dark:text-rose-300/70",
      indigo: "text-indigo-700/70 dark:text-indigo-300/70",
      cyan: "text-cyan-700/70 dark:text-cyan-300/70",
      violet: "text-violet-700/70 dark:text-violet-300/70",
      gray: "text-gray-700/70 dark:text-gray-300/70",
    };

    const gradientBorderClasses: Record<ColorType, string> = {
      blue: "from-blue-400 to-indigo-500 dark:from-blue-600 dark:to-indigo-700",
      emerald:
        "from-emerald-400 to-green-500 dark:from-emerald-600 dark:to-green-700",
      amber:
        "from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-700",
      purple:
        "from-purple-400 to-fuchsia-500 dark:from-purple-600 dark:to-fuchsia-700",
      rose: "from-rose-400 to-pink-500 dark:from-rose-600 dark:to-pink-700",
      indigo:
        "from-indigo-400 to-blue-500 dark:from-indigo-600 dark:to-blue-700",
      cyan: "from-cyan-400 to-sky-500 dark:from-cyan-600 dark:to-sky-700",
      violet:
        "from-violet-400 to-purple-500 dark:from-violet-600 dark:to-purple-700",
      gray: "from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700",
    };

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusCards.map((card, index) => {
          const IconComponent = card.icon;

          return (
            <div
              key={index}
              className={`relative overflow-hidden bg-gradient-to-br ${
                colorClasses[card.color]
              } rounded-2xl shadow-lg p-6 border backdrop-blur-sm group hover:shadow-xl transition-all duration-300`}
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  gradientBorderClasses[card.color]
                }`}
              ></div>
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/10 rounded-full transform group-hover:scale-110 transition-transform duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className={`font-medium ${textColorClasses[card.color]
                      .replace("900", "700")
                      .replace("100", "300")}`}
                  >
                    {card.title}
                  </h3>
                  <div
                    className={`p-2 rounded-full ${
                      iconColorClasses[card.color]
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>
                </div>

                <p
                  className={`text-2xl font-bold ${
                    textColorClasses[card.color]
                  } mb-1`}
                >
                  {card.value}
                </p>

                <p className={`text-sm ${descriptionColorClasses[card.color]}`}>
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
      {/* Header with enhanced design */}
      <div className="mb-8">
        <UserHeader
          user={{
            id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus,
            isActive: user.isActive,
            avatar: user.avatar || undefined,
          }}
          onUserAction={(action, reason) => {
            handleUserAction(action, reason);
          }}
          onStatusToggle={() => {
            setSelectedUser({
              id: user.id,
              name: user.name,
              isActive: user.isActive,
            });
            setStatusDialogOpen(true);
          }}
          onAvatarUpdate={() => {
            refetch();
          }}
          isLoading={isLoading}
          router={router}
        />
      </div>

      {/* Status Overview with enhanced cards */}
      <div className="mb-10">{renderStatusCards()}</div>

      {/* Main content with section headers */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        {/* Left column */}
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30">
                <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                البيانات الشخصية
              </h2>
            </div>

            <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-800/80 rounded-2xl shadow-lg border border-blue-100/50 dark:border-blue-900/20 overflow-hidden">
              <div className="p-2">
                <UserPersonalInfo
                  user={{
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    birthDate: user.birthDate,
                    bloodType: user.bloodType,
                    identityNumber: user.identityNumber,
                    taxNumber: user.taxNumber,
                    commercialRecord: user.commercialRecord,
                    address: user.address,
                    city: {
                      nameAr: user.city.nameAr,
                      governorate: {
                        nameAr: user.city.governorate.nameAr,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-amber-50 dark:bg-amber-900/30">
                <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                المستندات
              </h2>
            </div>

            <div className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-800/80 rounded-2xl shadow-lg border border-amber-100/50 dark:border-amber-900/20 overflow-hidden">
              <div className="p-6">
                <UserDocuments documents={documents} />
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30">
                <History className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                سجل الحالة
              </h2>
            </div>

            <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-800/80 rounded-2xl shadow-lg border border-indigo-100/50 dark:border-indigo-900/20 overflow-hidden">
              <div className="p-6">
                <UserStatusHistory
                  statusLogs={user.statusLogs.map((log) => ({
                    id: log.id,
                    status: log.status,
                    description: log.description,
                    createdAt: log.createdAt,
                    observer: log.observerId ? { name: "المشرف" } : undefined,
                  }))}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-green-50 dark:bg-green-900/30">
                <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                معلومات المراجعة
              </h2>
            </div>

            <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-800/80 rounded-2xl shadow-lg border border-green-100/50 dark:border-green-900/20 overflow-hidden">
              <div className="p-6">
                <UserReviewInfo reviewInfo={reviewInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Status Dialog */}
      <UserStatusDialog
        isOpen={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        onConfirm={handleStatusDialogConfirm}
        user={selectedUser}
        isLoading={isLoading}
      />
    </div>
  );
}
