"use client";

// =======================================================================================
// 🎯 COMPACT LOGIN PAGE - Modern & Elegant Authentication
// =======================================================================================
//
// This is a compact, modern login page featuring:
// 🏢 App logo integration with brand identity
// 🎨 Clean, minimalist design with premium feel
// 📱 Ultra-responsive compact layout
// 🚀 Smooth animations and micro-interactions
// 🔐 Streamlined form validation
// 🎭 Professional gradient backgrounds
//
// Design Philosophy:
// - Compact yet functional
// - Logo-centric branding
// - Clean visual hierarchy
// - Accessible and intuitive
// - Perfect theme integration
// =======================================================================================

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useAuthActions,
  useAuthStore,
  useIsAuthenticated,
} from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// =======================================================================================
// 🎯 FORM VALIDATION SCHEMA
// =======================================================================================
const formSchema = z.object({
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صحيح.",
  }),
  password: z.string().min(6, {
    message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل.",
  }),
  rememberMe: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

// =======================================================================================
// 🎯 MAIN COMPACT LOGIN PAGE COMPONENT
// =======================================================================================
export default function LoginPage() {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const { login } = useAuthActions();

  // =======================================================================================
  // 🎭 COMPACT STATE MANAGEMENT
  // =======================================================================================
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    } else {
      // Only show the form after checking authentication
      setIsCheckingAuth(false);
    }
  }, [isAuthenticated, router]);

  // =======================================================================================
  // 🎯 FORM CONFIGURATION
  // =======================================================================================
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "admin@ehiaaa.com",
      password: "",
      rememberMe: false,
    },
  });

  // =======================================================================================
  // 📝 FORM SUBMISSION HANDLER
  // =======================================================================================
  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await login({ email: data.email, password: data.password });

      setSuccess("تم تسجيل الدخول بنجاح! جاري التوجيه...");
      toast.success("تم تسجيل الدخول بنجاح", {
        description: "مرحباً بك في منصة إحياء",
      });

      handleRedirect(useAuthStore.getState().user);
    } catch (error: unknown) {
      const errorMessage =
        (error as Error).message ||
        "حدث خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.";
      setError(errorMessage);

      toast.error("فشل في تسجيل الدخول", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Helper function to handle redirect logic
  const handleRedirect = (
    currentUser: {
      role?: string;
      userType?: string;
      dashboardRoute?: string;
    } | null
  ) => {
    console.log("Redirecting user:", currentUser);

    // Redirect based on user type
    if (currentUser?.userType === "admin") {
      console.log("Redirecting admin to admin dashboard");
      router.push("/admin/dashboard");
    } else if (
      currentUser?.userType?.toLowerCase() === "hospital" ||
      currentUser?.userType?.toLowerCase() === "bloodbank" ||
      currentUser?.userType?.toLowerCase() === "blood_bank"
    ) {
      console.log("Redirecting hospital user to hospital dashboard");
      router.push("/hospital/dashboard");
    } else if (
      currentUser?.userType?.toLowerCase() === "user" ||
      currentUser?.userType?.toLowerCase() === "donor"
    ) {
      console.log("Redirecting user to user dashboard");
      router.push("/dashboard");
    } else if (currentUser?.dashboardRoute) {
      console.log(
        "Redirecting to dashboard route:",
        currentUser.dashboardRoute
      );
      router.push(currentUser.dashboardRoute);
    } else {
      console.log("Redirecting to home page");
      router.push("/");
    }
  };

  // Show logo loading screen while checking authentication or redirecting after success
  if (isCheckingAuth || success) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20 flex items-center justify-center p-4"
        dir="rtl"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(34,197,94,0.15)_1px,transparent_0)] [background-size:24px_24px]" />
        </div>

        {/* Logo Loading Screen */}
        <div className="relative z-10 flex flex-col items-center">
          {/* App Logo with Animation */}
          <div className="relative mb-6">
            <div className="w-24 h-24   flex items-center justify-center animate-pulse">
              <Image
                src="/logo.png"
                alt="إحياء"
                width={60}
                height={60}
                className="w-16 h-16 object-contain"
                priority
              />
            </div>

            {/* Subtle Loading Indicator */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>

          {/* Brand Text */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            <span className="text-emerald-600 dark:text-emerald-400">
              إحياء
            </span>
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {success ? "جاري إعادة التوجيه..." : "منصة التبرع بالدم"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20 flex items-center justify-center p-4"
      dir="rtl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(34,197,94,0.15)_1px,transparent_0)] [background-size:24px_24px]" />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Compact Login Card */}
        <Card className="border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-emerald-500/10 dark:shadow-emerald-400/5 rounded-2xl overflow-hidden">
          {/* Logo Header */}
          <CardHeader className="text-center pb-6 pt-8">
            {/* App Logo */}
            <div className="flex justify-center mb-4">
              <div className="relative w-20 h-20 mb-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="إحياء"
                    width={44}
                    height={44}
                    className="w-16 h-16 object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Brand Title */}
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              منصة إحياء
            </CardTitle>

            <CardDescription className="text-gray-600 dark:text-gray-400">
              تسجيل الدخول إلى حسابك
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {/* Status Messages */}
            {(error || success) && (
              <div
                className={`mb-4 p-3 rounded-lg border flex items-center gap-3 transition-all duration-300 ${
                  success
                    ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                    : "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
                }`}
              >
                {success ? (
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                )}
                <span className="text-sm font-medium">{success || error}</span>
              </div>
            )}

            {/* Compact Login Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                        البريد الإلكتروني
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="your@email.com"
                            type="email"
                            className={`pr-10 h-11 rounded-lg border transition-all duration-200 ${
                              form.formState.errors.email
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-200 dark:border-gray-600 focus:border-emerald-500"
                            }`}
                            {...field}
                            autoComplete="email"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                        كلمة المرور
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="••••••••"
                            type={showPassword ? "text" : "password"}
                            className={`pr-10 pl-10 h-11 rounded-lg border transition-all duration-200 ${
                              form.formState.errors.password
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-200 dark:border-gray-600 focus:border-emerald-500"
                            }`}
                            {...field}
                            autoComplete="current-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                          >
                            {showPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-x-reverse">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                          />
                        </FormControl>
                        <FormLabel className="text-gray-700 dark:text-gray-300 cursor-pointer">
                          تذكرني
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <Button
                    variant="link"
                    className="px-0 h-auto text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                    type="button"
                  >
                    نسيت كلمة المرور؟
                  </Button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 font-semibold rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 shadow-lg shadow-emerald-500/25 hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>جاري التسجيل...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>تسجيل الدخول</span>
                    </div>
                  )}
                </Button>
              </form>
            </Form>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ليس لديك حساب؟{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium"
                  onClick={() => router.push("/register")}
                >
                  إنشاء حساب جديد
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Brand Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            انضم لمجتمع إنقاذ الأرواح • محمي بتشفير SSL
          </p>
        </div>
      </div>
    </div>
  );
}
