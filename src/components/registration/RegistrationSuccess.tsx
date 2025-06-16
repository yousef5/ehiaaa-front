"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DonorRegistrationResponse } from "@/types/donor";
import type { HospitalRegistrationResponse } from "@/types/hospital";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Mail,
  MessageSquare,
} from "lucide-react";

type RegistrationData =
  | DonorRegistrationResponse
  | HospitalRegistrationResponse;

interface RegistrationSuccessProps {
  data: RegistrationData | null;
  onBackToLogin: () => void;
}

// Type guard to check if data is donor registration
function isDonorRegistration(
  data: RegistrationData
): data is DonorRegistrationResponse {
  return "user" in data && "bloodType" in data.user;
}

// Type guard to check if data is hospital registration
function isHospitalRegistration(
  data: RegistrationData
): data is HospitalRegistrationResponse {
  return "user" in data && "type" in data;
}

export default function RegistrationSuccess({
  data,
  onBackToLogin,
}: RegistrationSuccessProps) {
  const isDonor = data ? isDonorRegistration(data) : false;
  const isHospital = data ? isHospitalRegistration(data) : false;

  const getUserType = () => {
    if (isDonor) return "متبرع";
    if (isHospital) {
      const hospitalData = data as HospitalRegistrationResponse;
      return hospitalData.type === "bloodbank" ? "بنك دم" : "مستشفى";
    }
    return "مستخدم";
  };

  const userType = getUserType();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-green-950/20 flex items-center justify-center p-4"
      dir="rtl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(34,197,94,0.15)_1px,transparent_0)] [background-size:24px_24px]" />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-2xl relative z-10">
        {/* Success Card */}
        <Card className="border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-green-500/10 dark:shadow-green-400/5 rounded-2xl overflow-hidden">
          {/* Header */}
          <CardHeader className="text-center pb-6 pt-8">
            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="relative w-24 h-24 mb-2">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl shadow-green-500/25 flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Success Title */}
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              تم إنشاء حسابك بنجاح!
            </CardTitle>

            <CardDescription className="text-gray-600 dark:text-gray-400">
              مرحباً بك في منصة إحياء كـ{userType}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {/* Status Information */}
            <div className="space-y-6">
              {/* Account Status */}
              <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                      الحساب قيد المراجعة
                    </h3>
                    <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                      بعد الانتهاء من مراجعة البيانات سيتم إبلاغكم برسالة موبايل
                      وإيميل
                    </p>
                  </div>
                </div>
              </div>

              {/* User Information */}
              {data && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    معلومات الحساب
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        الاسم:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {data.user.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        البريد الإلكتروني:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {data.user.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        رقم الهاتف:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {data.user.phone}
                      </span>
                    </div>
                    {isDonor && isDonorRegistration(data) && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          فصيلة الدم:
                        </span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {data.user.bloodType}
                        </span>
                      </div>
                    )}
                    {isHospital && isHospitalRegistration(data) && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          نوع المؤسسة:
                        </span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {data.type === "bloodbank" ? "بنك دم" : "مستشفى"}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        الحالة:
                      </span>
                      <span className="font-medium text-amber-600 dark:text-amber-400">
                        {data.status === "PENDING_APPROVAL"
                          ? "في انتظار الموافقة"
                          : data.status}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Next Steps */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  الخطوات التالية:
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        1
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      سيقوم فريقنا بمراجعة بياناتك والوثائق المرفقة
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        2
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ستصلك رسالة تأكيد عبر
                      </p>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-green-600">SMS</span>
                      </div>
                      <span className="text-gray-400">و</span>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span className="text-xs text-blue-600">Email</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        3
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isDonor
                        ? "بعد الموافقة، يمكنك تسجيل الدخول والبدء في التبرع"
                        : "بعد الموافقة، يمكنك تسجيل الدخول وإدارة طلبات الدم"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                      ملاحظة مهمة
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      تأكد من صحة بيانات الاتصال (الهاتف والإيميل) لضمان وصول
                      رسالة التأكيد
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onBackToLogin}
                className="flex-1 h-12 font-semibold rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-500/25 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
              >
                <ArrowLeft className="h-5 w-5 ml-2" />
                العودة لتسجيل الدخول
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Brand Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            شكراً لانضمامك لمجتمع إنقاذ الأرواح • منصة إحياء
          </p>
        </div>
      </div>
    </div>
  );
}
