import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateObserverFormData } from "../schema";

interface AuthSectionProps {
  form: UseFormReturn<CreateObserverFormData>;
  isUpdate?: boolean;
}

export function AuthSection({ form, isUpdate = false }: AuthSectionProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <Lock className="h-4 w-4 text-green-500" />
        <h3 className="font-medium">معلومات تسجيل الدخول</h3>
      </div>

      {/* Email Field */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              البريد الإلكتروني *
            </FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="example@ehiaaa.com"
                {...field}
                className="text-right"
                dir="rtl"
                autoComplete="email"
              />
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
            <FormLabel className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              {isUpdate
                ? "كلمة المرور (اتركها فارغة للإبقاء على كلمة المرور الحالية)"
                : "كلمة المرور *"}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    isUpdate ? "أدخل كلمة مرور جديدة" : "أدخل كلمة مرور قوية"
                  }
                  {...field}
                  className="text-right pr-10"
                  dir="rtl"
                  autoComplete={isUpdate ? "new-password" : "new-password"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </FormControl>
            <div className="text-xs text-muted-foreground mt-1">
              {isUpdate
                ? "إذا أردت تغيير كلمة المرور، يجب أن تحتوي على حرف كبير وصغير ورقم على الأقل"
                : "يجب أن تحتوي على حرف كبير وصغير ورقم على الأقل"}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
