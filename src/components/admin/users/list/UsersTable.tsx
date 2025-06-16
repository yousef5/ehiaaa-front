import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Building2,
  Cake,
  Calendar,
  CheckCircle,
  Droplets,
  Eye,
  Mail,
  MapPin,
  Phone,
  Trash2,
  User,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";

interface UserObserver {
  uuid: string;
  name: string;
  avatar: string;
  cityNameAr: string;
  governorateNameAr: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: string;
  userStatus: string;
  isActive: boolean;
  createdAt: string;
  avatar?: string;
  birthDate?: string;
  bloodType?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  city?: {
    nameAr: string;
    governorate?: {
      nameAr: string;
    };
  };
  observers?: UserObserver[];
}

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  onUserAction: (
    action: "approve" | "reject" | "toggle" | "delete",
    userId: string,
    reason?: string
  ) => void;
  router: AppRouterInstance;
}

// Age calculation function
function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

// Format birthdate for display
function formatBirthDate(birthDate: string): string {
  return new Date(birthDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Compact Age display component with tooltip
function AgeDisplay({ birthDate }: { birthDate: string }) {
  const age = calculateAge(birthDate);
  const formattedBirthDate = formatBirthDate(birthDate);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 cursor-help">
            <Cake className="w-3 h-3 flex-shrink-0" />
            <span>{age} سنة</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>تاريخ الميلاد: {formattedBirthDate}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Compact Observer Avatars Component
function ObserverAvatars({ observers }: { observers: UserObserver[] }) {
  const getBackendUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  };

  const getObserverAvatarUrl = (avatar: string) => {
    if (avatar.startsWith("http")) return avatar;
    return `${getBackendUrl()}/public/${avatar}`;
  };

  if (!observers || observers.length === 0) {
    return (
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
        <Users className="w-3 h-3" />
        <span>لا يوجد مراجعين</span>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
        <Users className="w-3 h-3" />
        <span>مراجعين ({observers.length})</span>
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        {observers.slice(0, 3).map((observer) => (
          <TooltipProvider key={observer.uuid}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-blue-600 p-0.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                    {observer.avatar ? (
                      <Image
                        src={getObserverAvatarUrl(observer.avatar)}
                        alt={`صورة ${observer.name}`}
                        width={24}
                        height={24}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const fallback =
                            target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.classList.remove("hidden");
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full ${
                        observer.avatar ? "hidden" : ""
                      }`}
                    >
                      <User className="w-2 h-2 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <div className="space-y-1 text-center">
                  <p className="font-medium text-sm">{observer.name}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
                    <MapPin className="w-3 h-3" />
                    <span>
                      {observer.cityNameAr} - {observer.governorateNameAr}
                    </span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        {observers.length > 3 && (
          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              +{observers.length - 3}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function UsersTable({
  users,
  isLoading,
  onUserAction,
  router,
}: UsersTableProps) {
  const getBackendUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  };

  const getAvatarUrl = (avatar?: string) => {
    if (avatar) {
      const avatarPath = `${avatar}`;
      return `${getBackendUrl()}/public/${avatarPath}`;
    }
    return `/avatars/avatar1.png`; // Default local avatar
  };

  const getUserTypeLabel = (userType: string) => {
    switch (userType) {
      case "USER":
      case "user":
        return "متبرع";
      case "HOSPITAL":
      case "hospital":
        return "مستشفى";
      case "BLOOD_BANK":
      case "bloodbank":
        return "بنك دم";
      default:
        return userType;
    }
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case "USER":
      case "user":
        return Droplets;
      case "HOSPITAL":
      case "hospital":
        return Building2;
      case "BLOOD_BANK":
      case "bloodbank":
        return Building2;
      default:
        return User;
    }
  };

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case "USER":
      case "user":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800";
      case "HOSPITAL":
      case "hospital":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800";
      case "BLOOD_BANK":
      case "bloodbank":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800";
    }
  };

  const getUserStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING_DATA_REVIEW":
        return "في انتظار المراجعة";
      case "ACTIVE":
        return "معتمد";
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

  const getBloodTypeColor = (bloodType: string) => {
    const colors = {
      "A+": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      "A-": "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
      "B+": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "B-": "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
      "AB+":
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      "AB-":
        "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
      "O+": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      "O-": "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    };
    return (
      colors[bloodType as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    );
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                لا توجد مستخدمين
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                لم يتم العثور على أي مستخدمين مطابقين للبحث
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {users.map((user) => {
        const TypeIcon = getUserTypeIcon(user.userType);

        return (
          <Card
            key={user.id}
            className="group hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
          >
            <CardContent className="p-3">
              {/* Compact Header with Avatar and User Info */}
              <div className="flex items-start gap-2 mb-3">
                {/* Compact Avatar */}
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5 shadow-sm">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <Image
                        src={getAvatarUrl(user.avatar)}
                        alt={`صورة ${user.name}`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
                        <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Compact User Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate leading-tight">
                    {user.name}
                  </h3>

                  {/* Compact Badges Row */}
                  <div className="flex items-center gap-1 mt-1 mb-1">
                    <Badge
                      variant="outline"
                      className={`text-xs py-0 px-1 h-5 ${getUserTypeColor(
                        user.userType
                      )} border`}
                    >
                      <TypeIcon className="w-2.5 h-2.5 ml-0.5" />
                      {getUserTypeLabel(user.userType)}
                    </Badge>
                  </div>

                  {/* Compact Status Row */}
                  <div className="flex items-center gap-1">
                    <Badge
                      className={`text-xs py-0 px-1 h-4 ${getUserStatusColor(
                        user.userStatus
                      )}`}
                    >
                      {getUserStatusLabel(user.userStatus)}
                    </Badge>
                    <Badge
                      variant={user.isActive ? "default" : "secondary"}
                      className="text-xs py-0 px-1 h-4"
                    >
                      {user.isActive ? "نشط" : "غير نشط"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Compact Contact Information */}
              <div className="space-y-1 mb-2 text-xs">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <Mail className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate" title={user.email}>
                    {user.email}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <Phone className="w-3 h-3 flex-shrink-0" />
                  <span>{user.phone}</span>
                </div>
                {user.city && (
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">
                      {user.city.governorate?.nameAr
                        ? `${user.city.nameAr} - ${user.city.governorate.nameAr}`
                        : user.city.nameAr || "غير محدد"}
                    </span>
                  </div>
                )}

                {/* Compact Info Row */}
                <div className="flex items-center justify-between">
                  {user.birthDate && <AgeDisplay birthDate={user.birthDate} />}
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Compact Blood Type */}
              {user.bloodType && (
                <div className="flex items-center gap-1 mb-2">
                  <Droplets className="w-3 h-3 text-red-500" />
                  <Badge
                    className={`text-xs py-0 px-1 h-4 ${getBloodTypeColor(
                      user.bloodType
                    )}`}
                  >
                    {user.bloodType}
                  </Badge>
                </div>
              )}

              {/* Compact Observers Section */}
              <div className="mb-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                <ObserverAvatars observers={user.observers || []} />
              </div>

              {/* Compact Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                  {/* Toggle Status */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-6 w-6 p-0 ${
                            user.isActive
                              ? "text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                              : "text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                          }`}
                          onClick={() => onUserAction("toggle", user.id)}
                        >
                          <UserCheck className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{user.isActive ? "إيقاف" : "تفعيل"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* Approval Actions */}
                  {user.userStatus === "PENDING_DATA_REVIEW" && (
                    <>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                              onClick={() => onUserAction("approve", user.id)}
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>اعتماد</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                              onClick={() =>
                                onUserAction(
                                  "reject",
                                  user.id,
                                  "تم الرفض من قبل المدير"
                                )
                              }
                            >
                              <XCircle className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>رفض</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </>
                  )}

                  {/* Delete */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          onClick={() => onUserAction("delete", user.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>حذف</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Compact View Details */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 px-2 text-xs text-blue-600 border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        onClick={() => router.push(`/admin/users/${user.id}`)}
                      >
                        <Eye className="h-3 w-3 ml-1" />
                        تفاصيل
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>عرض تفاصيل المستخدم</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
