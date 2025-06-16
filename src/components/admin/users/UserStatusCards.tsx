import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Calendar,
  CheckCircle,
  Droplets,
  Shield,
  User,
  XCircle,
} from "lucide-react";

interface UserStatusCardsProps {
  user: {
    userType: string;
    userStatus: string;
    isActive: boolean;
    createdAt: string;
  };
}

export function UserStatusCards({ user }: UserStatusCardsProps) {
  const getUserTypeLabel = (userType: string) => {
    switch (userType) {
      case "USER":
        return "متبرع";
      case "HOSPITAL":
        return "مستشفى";
      case "BLOOD_BANK":
        return "بنك دم";
      default:
        return userType;
    }
  };

  const getUserStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING_DATA_REVIEW":
        return "في انتظار المراجعة";
      case "ACTIVE":
        return "مفعل";
      case "REJECTED":
        return "مرفوض";
      default:
        return status;
    }
  };

  const getUserStatusColor = (status: string) => {
    switch (status) {
      case "PENDING_DATA_REVIEW":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "ACTIVE":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "REJECTED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                نوع المستخدم
              </p>
              <p className="font-medium">{getUserTypeLabel(user.userType)}</p>
            </div>
            {user.userType === "USER" ? (
              <User className="h-5 w-5 text-blue-500" />
            ) : user.userType === "HOSPITAL" ? (
              <Building2 className="h-5 w-5 text-green-500" />
            ) : (
              <Droplets className="h-5 w-5 text-red-500" />
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                حالة الموافقة
              </p>
              <Badge className={getUserStatusColor(user.userStatus)}>
                {getUserStatusLabel(user.userStatus)}
              </Badge>
            </div>
            <Shield className="h-5 w-5 text-purple-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                حالة التفعيل
              </p>
              <Badge variant={user.isActive ? "default" : "secondary"}>
                {user.isActive ? "مفعل" : "غير مفعل"}
              </Badge>
            </div>
            {user.isActive ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                تاريخ التسجيل
              </p>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString("ar-SA")}
              </p>
            </div>
            <Calendar className="h-5 w-5 text-gray-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
