"use client";

// =======================================================================================
// 🚫 401 UNAUTHORIZED PAGE - Access Denied
// =======================================================================================
//
// Professional unauthorized access page featuring:
// 🛡️ Clear security messaging
// 🎨 Professional design with brand consistency
// 🔄 Smart redirection options
// 📱 Responsive design
// 🔐 Security-focused UX
//
// =======================================================================================

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  AlertTriangle,
  Home,
  ArrowLeft,
  Lock,
  User,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser, useIsAuthenticated } from "@/stores/authStore";
import Header from "@/components/Header";

export default function UnauthorizedPage() {
  const router = useRouter();
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Auto redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      <Header />

      <main className="pt-20 pb-12 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            {/* Large Error Icon */}
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <Shield className="h-10 w-10 text-white" />
              </div>
            </div>

            {/* Error Code */}
            <div className="text-8xl font-bold text-red-600 dark:text-red-400 mb-4">
              401
            </div>

            {/* Error Title */}
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              غير مصرح بالوصول
            </h1>

            {/* Error Description */}
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              عذراً، ليس لديك الصلاحية للوصول إلى هذه الصفحة
            </p>
          </div>

          {/* Error Details Card */}
          <Card className="mb-8 border-red-200 dark:border-red-800">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-red-700 dark:text-red-300">
                <AlertTriangle className="h-5 w-5" />
                تفاصيل الخطأ
              </CardTitle>
              <CardDescription>معلومات إضافية حول حالة الوصول</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* User Status */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">حالة المستخدم:</span>
                </div>
                <div className="flex items-center gap-2">
                  {isAuthenticated ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600 dark:text-green-400">
                        مسجل الدخول ({user?.name})
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-red-600 dark:text-red-400">
                        غير مسجل الدخول
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Access Level */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">مستوى الوصول:</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {user?.role === "admin"
                      ? "مدير النظام"
                      : user?.role === "medical_staff"
                      ? "طاقم طبي"
                      : user?.role === "donor"
                      ? "متبرع"
                      : "غير محدد"}
                  </span>
                </div>
              </div>

              {/* Required Permission */}
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium text-red-700 dark:text-red-300">
                    الصلاحية المطلوبة:
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                    مدير النظام (Admin)
                  </span>
                </div>
              </div>

              {/* Auto Redirect Notice */}
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    إعادة التوجيه التلقائي:
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {countdown} ثواني
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <Button
                onClick={handleLogin}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                size="lg"
              >
                <User className="h-4 w-4 ml-2" />
                تسجيل الدخول
              </Button>
            ) : (
              <Button onClick={handleGoBack} variant="outline" size="lg">
                <ArrowLeft className="h-4 w-4 ml-2" />
                العودة للخلف
              </Button>
            )}

            <Button onClick={handleGoHome} variant="outline" size="lg">
              <Home className="h-4 w-4 ml-2" />
              الصفحة الرئيسية
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع إدارة النظام
            </p>

            {/* Contact Info */}
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <strong>البريد الإلكتروني:</strong> support@ehiaaa.com
              </div>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <strong>الهاتف:</strong> +966 11 123 4567
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1">
                  إشعار أمني
                </h3>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  تم تسجيل محاولة الوصول هذه لأغراض الأمان. جميع المحاولات غير
                  المصرح بها يتم مراقبتها وتسجيلها.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
