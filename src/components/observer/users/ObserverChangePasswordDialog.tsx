"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema matching the backend DTO
const changePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم على الأقل"
    ),
  reason: z.string().optional(),
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

interface ObserverChangePasswordDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: string;
    name: string;
  } | null;
  onConfirm: (newPassword: string, reason?: string) => Promise<void>;
  isLoading: boolean;
}

export function ObserverChangePasswordDialog({
  isOpen,
  onOpenChange,
  user,
  onConfirm,
  isLoading,
}: ObserverChangePasswordDialogProps) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      reason: "",
    },
  });

  // Auto-reset when dialog closes
  useEffect(() => {
    if (!isOpen) {
      form.reset({
        newPassword: "",
        reason: "",
      });
      form.clearErrors();
      setShowPassword(false);
    }
  }, [isOpen, form]);

  if (!user) return null;

  const handleSubmit = async (data: ChangePasswordFormData) => {
    try {
      await onConfirm(data.newPassword, data.reason || undefined);
      handleClose();
    } catch {
      // Error handling is done in the parent component
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      form.reset({
        newPassword: "",
        reason: "",
      });
      form.clearErrors();
      setShowPassword(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0" dir="rtl">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-blue-500" />
              <div>
                <DialogTitle className="text-lg text-right">
                  تغيير كلمة المرور
                </DialogTitle>
                <DialogDescription className="text-right">
                  تغيير كلمة المرور للمستخدم &quot;{user.name}&quot;
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="px-6 pb-6 space-y-4">
              {/* New Password Field */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      كلمة المرور الجديدة *
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="أدخل كلمة المرور الجديدة"
                          {...field}
                          className="text-right pr-10"
                          dir="rtl"
                          disabled={isLoading}
                          autoComplete="new-password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
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
                      يجب أن تحتوي على حرف كبير وصغير ورقم على الأقل (6 أحرف كحد
                      أدنى)
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Reason Field */}
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="reason" className="text-right block">
                      سبب تغيير كلمة المرور (اختياري)
                    </Label>
                    <FormControl>
                      <Textarea
                        id="reason"
                        placeholder="اكتب سبب تغيير كلمة المرور (اختياري)..."
                        className="text-right resize-none"
                        dir="rtl"
                        rows={3}
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 min-w-[120px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      جاري التغيير...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      تغيير كلمة المرور
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
