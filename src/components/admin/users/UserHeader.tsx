import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle,
  UserCheck,
  UserX,
  XCircle,
} from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AvatarUpload } from "./AvatarUpload";

interface UserHeaderProps {
  user: {
    id: string;
    name: string;
    email: string;
    userType: string;
    userStatus: string;
    isActive: boolean;
    avatar?: string;
  };
  onUserAction: (action: "approve" | "reject", reason?: string) => void;
  onStatusToggle: () => void;
  onAvatarUpdate: () => void;
  isLoading: boolean;
  router: AppRouterInstance;
}

export function UserHeader({
  user,
  onUserAction,
  onStatusToggle,
  onAvatarUpdate,
  isLoading,
  router,
}: UserHeaderProps) {
  const getUserTypeLabel = (userType: string) => {
    switch (userType) {
      case "user":
        return "متبرع";
      case "hospital":
        return "مستشفى";
      case "bloodbank":
        return "بنك دم";
      default:
        return userType;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Left section with back button and user info */}
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <AvatarUpload
            userId={user.id}
            currentAvatar={user.avatar}
            userName={user.name}
            onAvatarUpdate={onAvatarUpdate}
            className="flex-shrink-0"
          />

          {/* User Info */}
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 truncate">
              {user.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1">
              {getUserTypeLabel(user.userType)} • {user.email}
            </p>

            {/* Status Badge */}
            <div className="flex items-center gap-2 mt-2">
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                  user.isActive
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    user.isActive ? "bg-green-500" : "bg-gray-500"
                  }`}
                />
                {user.isActive ? "نشط" : "غير نشط"}
              </div>

              <div
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  user.userStatus === "PENDING_DATA_REVIEW"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    : user.userStatus === "Active"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                }`}
              >
                {user.userStatus === "PendingDataReview"
                  ? "في انتظار المراجعة"
                  : user.userStatus === "Active"
                  ? "معتمد"
                  : "مرفوض"}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button
            variant={user.isActive ? "destructive" : "default"}
            size="sm"
            onClick={onStatusToggle}
            disabled={isLoading}
            className={`${
              user.isActive
                ? "hover:bg-red-600 dark:hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
            } transition-colors duration-200`}
          >
            {user.isActive ? (
              <>
                <UserX className="h-4 w-4 ml-2" />
                إيقاف التفعيل
              </>
            ) : (
              <>
                <UserCheck className="h-4 w-4 ml-2" />
                تفعيل المستخدم
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/users")}
            className="flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة للقائمة
          </Button>

          {user.userStatus === "PENDING_DATA_REVIEW" && (
            <>
              <Button
                size="sm"
                onClick={() => onUserAction("approve")}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200"
              >
                <CheckCircle className="h-4 w-4 ml-2" />
                اعتماد
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onUserAction("reject", "تم الرفض من قبل المدير")}
                disabled={isLoading}
                className="transition-colors duration-200"
              >
                <XCircle className="h-4 w-4 ml-2" />
                رفض
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
