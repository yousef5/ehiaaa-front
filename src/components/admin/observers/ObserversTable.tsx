import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Observer } from "@/types/observer";
import {
  Calendar,
  Camera,
  Edit,
  Mail,
  MapPin,
  Phone,
  Trash,
  UserCheck,
  UserX,
} from "lucide-react";
import Image from "next/image";

interface ObserversTableProps {
  observers: Observer[];
  onUpdateObserver: (id: string) => void;
  onDeleteObserver?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
  onUpdateAvatar?: (id: string) => void;
}

export default function ObserversTable({
  observers,
  onUpdateObserver,
  onDeleteObserver,
  onToggleStatus,
  onUpdateAvatar,
}: ObserversTableProps) {
  const getBackendUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  };

  const getAvatarUrl = (observer: Observer) => {
    if (observer.avatar) {
      const avatarPath = observer.avatar.startsWith("avatars/")
        ? observer.avatar
        : `avatars/${observer.avatar}`;
      return `${getBackendUrl()}/public/${avatarPath}`;
    }
    return `/avatars/avatar1.png`; // Default local avatar
  };

  const getLocationInfo = (observer: Observer) => {
    if (observer.city?.governorate) {
      return `${observer.city.governorate.nameAr} - ${observer.city.nameAr}`;
    } else if (observer.city) {
      return observer.city.nameAr;
    }
    return "غير محدد";
  };

  return (
    <div className="py-4">
      {/* Mobile filter bar */}
      <div className="flex items-center justify-between mb-4 px-4 md:hidden">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {observers.length} مراجع
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            تصفية
          </Button>
          <Button variant="outline" size="sm">
            ترتيب
          </Button>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {observers.map((observer) => (
          <div
            key={observer.id}
            className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700 group"
          >
            {/* Card header with gradient */}
            <div className="h-16 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800"></div>

            {/* Avatar */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-700">
                  <Image
                    src={getAvatarUrl(observer)}
                    alt={observer.name}
                    width={64}
                    height={64}
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/avatars/avatar1.png";
                    }}
                  />
                </div>
                {onUpdateAvatar && (
                  <Button
                    onClick={() => onUpdateAvatar(observer.id)}
                    variant="ghost"
                    className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-white dark:bg-gray-700 shadow-md p-0 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 border border-gray-100 dark:border-gray-600"
                    title="تحديث الصورة الشخصية"
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>

            {/* Status badge */}
            <div className="absolute top-3 left-3">
              <Badge
                variant={observer.isActive ? "default" : "destructive"}
                className={
                  observer.isActive
                    ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/40"
                    : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/40"
                }
              >
                {observer.isActive ? "نشط" : "غير نشط"}
              </Badge>
            </div>

            {/* Card content */}
            <div className="pt-10 px-4 pb-4">
              <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-gray-100 mb-4">
                {observer.name}
              </h3>

              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-2" />
                  <span
                    className="text-gray-700 dark:text-gray-300 truncate"
                    title={observer.email}
                  >
                    {observer.email}
                  </span>
                </div>

                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {observer.phone}
                  </span>
                </div>

                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {getLocationInfo(observer)}
                  </span>
                </div>

                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {new Date(observer.createdAt).toLocaleDateString("ar-EG")}
                  </span>
                </div>
              </div>
            </div>

            {/* Card actions */}
            <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-800/80 flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Button
                  onClick={() => onUpdateObserver(observer.id)}
                  variant="ghost"
                  className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-full"
                  title="تعديل"
                >
                  <Edit className="h-4 w-4" />
                </Button>

                {onToggleStatus && (
                  <Button
                    onClick={() => onToggleStatus(observer.id)}
                    variant="ghost"
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-full"
                    title={observer.isActive ? "إيقاف" : "تفعيل"}
                  >
                    {observer.isActive ? (
                      <UserX className="h-4 w-4" />
                    ) : (
                      <UserCheck className="h-4 w-4" />
                    )}
                  </Button>
                )}

                {onDeleteObserver && (
                  <Button
                    onClick={() => onDeleteObserver(observer.id)}
                    variant="ghost"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-full"
                    title="حذف"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  onClick={() => onUpdateObserver(observer.id)}
                >
                  عرض التفاصيل
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {observers.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <UserX className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            لا يوجد مراجعين
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            لم يتم العثور على أي مراجعين مطابقين للمعايير المحددة.
          </p>
        </div>
      )}
    </div>
  );
}
