"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Loader2,
  ShieldCheck,
  ShieldX,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState } from "react";

interface ObserverUserStatusDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: string;
    name: string;
    isActive: boolean;
  } | null;
  onConfirm: (
    action: "activate" | "deactivate",
    reason?: string
  ) => Promise<void>;
  isLoading: boolean;
}

export function ObserverUserStatusDialog({
  isOpen,
  onOpenChange,
  user,
  onConfirm,
  isLoading,
}: ObserverUserStatusDialogProps) {
  const [reason, setReason] = useState("");

  if (!user) return null;

  const isDeactivating = user.isActive;
  const action = isDeactivating ? "deactivate" : "activate";
  const actionText = isDeactivating ? "إيقاف" : "تفعيل";
  const actionDescription = isDeactivating
    ? "إيقاف تفعيل المستخدم"
    : "تفعيل المستخدم";

  const handleConfirm = async () => {
    if (isDeactivating && !reason.trim()) {
      return; // Prevent submission without reason for deactivation
    }

    try {
      await onConfirm(action, reason.trim() || undefined);
      handleClose();
    } catch {
      // Error handling is done in the parent component
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setReason("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isDeactivating ? (
              <UserX className="h-5 w-5 text-red-600" />
            ) : (
              <UserCheck className="h-5 w-5 text-green-600" />
            )}
            {actionDescription}
          </DialogTitle>
          <DialogDescription>
            {isDeactivating ? (
              <span className="text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                هل أنت متأكد من إيقاف تفعيل المستخدم &quot;{user.name}&quot;؟
              </span>
            ) : (
              <span>
                هل أنت متأكد من تفعيل المستخدم &quot;{user.name}&quot;؟
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-right">
              {isDeactivating ? "سبب الإيقاف (مطلوب)" : "سبب التفعيل (اختياري)"}
            </Label>
            <Textarea
              id="reason"
              placeholder={
                isDeactivating
                  ? "يرجى إدخال سبب إيقاف المستخدم..."
                  : "يمكنك إدخال سبب تفعيل المستخدم (اختياري)..."
              }
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px] resize-none"
              disabled={isLoading}
            />
            {isDeactivating && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                سبب الإيقاف مطلوب ولا يمكن أن يكون فارغاً
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex-row-reverse gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            إلغاء
          </Button>
          <Button
            type="button"
            variant={isDeactivating ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={isLoading || (isDeactivating && !reason.trim())}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                جاري {actionText}...
              </>
            ) : (
              <>
                {isDeactivating ? (
                  <ShieldX className="h-4 w-4 ml-2" />
                ) : (
                  <ShieldCheck className="h-4 w-4 ml-2" />
                )}
                تأكيد {actionText}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
