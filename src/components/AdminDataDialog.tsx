"use client";

import { User, Mail, Phone, Calendar, Shield, X, Droplets } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/stores/authStore";

interface AdminDataDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AdminDataDialog({
  isOpen,
  onOpenChange,
}: AdminDataDialogProps) {
  const user = useUser();

  if (!user) return null;

  const getBackendUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-4" dir="rtl">
        <DialogHeader className="text-right pb-3 flex-row items-center justify-between">
          <div>
            <DialogTitle className="flex items-center justify-start gap-2 text-lg font-semibold">
              <User className="h-5 w-5 text-blue-500" />
              بيانات المدير
            </DialogTitle>
            <DialogDescription className="text-right text-sm text-gray-600 dark:text-gray-400 mt-1">
              عرض المعلومات الشخصية وصلاحيات المدير
            </DialogDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <ScrollArea className="h-[calc(60vh-80px)] pl-4" dir="rtl">
          <div className="space-y-4 mt-2">
            {/* Profile Section */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1 text-right">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {user.name}
                </h3>
                <div className="flex items-center justify-start gap-2">
                  <Badge
                    variant={user.role === "admin" ? "default" : "secondary"}
                    className="text-xs flex items-center gap-1"
                  >
                    <Shield className="h-3 w-3" />
                    {user.role === "admin" ? "مدير" : "متبرع"}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {user.bloodType || "غير محدد"}
                  </Badge>
                </div>
              </div>
              <div className="relative flex-shrink-0">
                <Image
                  src={`${getBackendUrl()}/public/avatars/${user.avatar}`}
                  alt={user.name}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-gray-200 dark:border-gray-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling?.classList.remove("hidden");
                  }}
                />
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="text-right">
              <h4 className="text-base font-semibold mb-2 flex items-center justify-start gap-2">
                <Mail className="h-4 w-4 text-green-500" />
                معلومات الاتصال
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="h-3 w-3" />
                    <span className="font-medium">البريد الإلكتروني:</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 pr-5 text-sm">
                    {user.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="h-3 w-3" />
                    <span className="font-medium">رقم الهاتف:</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 pr-5 text-sm">
                    {user.phone || "غير محدد"}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Personal Information */}
            <div className="text-right">
              <h4 className="text-base font-semibold mb-2 flex items-center justify-start gap-2">
                <User className="h-4 w-4 text-blue-500" />
                المعلومات الشخصية
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-3 w-3" />
                    <span className="font-medium">تاريخ الميلاد:</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 pr-5 text-sm">
                    {user.dateOfBirth || "غير محدد"}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Droplets className="h-3 w-3" />
                    <span className="font-medium">فصيلة الدم:</span>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 pr-5">
                    <Badge variant="outline" className="text-xs">
                      {user.bloodType || "غير محدد"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Information */}
            <div className="text-right">
              <h4 className="text-base font-semibold mb-2 flex items-center justify-start gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                معلومات الحساب
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-3 w-3" />
                    <span className="font-medium">تاريخ الانضمام:</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 pr-5 text-sm">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("ar-SA", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "غير محدد"}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Shield className="h-3 w-3" />
                    <span className="font-medium">معرف المستخدم:</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 pr-5 text-sm font-mono">
                    #{user.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
