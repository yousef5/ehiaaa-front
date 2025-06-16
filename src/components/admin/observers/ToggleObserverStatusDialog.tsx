"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Observer } from "@/types/observer";
import { AlertTriangle, Loader2, UserCheck, UserX, X } from "lucide-react";
import { useState } from "react";

interface ToggleObserverStatusDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  observer: Observer | null;
  onConfirm: (reason?: string) => void;
  isLoading: boolean;
}

export default function ToggleObserverStatusDialog({
  isOpen,
  onOpenChange,
  observer,
  onConfirm,
  isLoading,
}: ToggleObserverStatusDialogProps) {
  const [reason, setReason] = useState("");

  if (!observer) return null;

  const isDeactivating = observer.isActive;
  const action = isDeactivating ? "إلغاء تفعيل" : "تفعيل";
  const actionColor = isDeactivating ? "text-red-600" : "text-green-600";
  const actionIcon = isDeactivating ? UserX : UserCheck;
  const ActionIcon = actionIcon;

  const handleConfirm = () => {
    if (isDeactivating && !reason.trim()) {
      return; // Prevent submission without reason for deactivation
    }
    onConfirm(isDeactivating ? reason : undefined);
  };

  const handleClose = () => {
    if (!isLoading) {
      setReason("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0" dir="rtl">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ActionIcon className={`h-5 w-5 ${actionColor}`} />
              <div>
                <DialogTitle className="text-lg text-right">
                  {action} المراجع
                </DialogTitle>
                <DialogDescription className="text-right">
                  {isDeactivating
                    ? "سيتم إيقاف جميع صلاحيات المراجع"
                    : "سيتم إعادة تفعيل صلاحيات المراجع"}
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

        <div className="px-6 pb-6">
          <div className="text-right mb-4">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              هل أنت متأكد من {action} المراجع{" "}
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {observer.name}
              </span>
              ؟
            </p>

            {isDeactivating && (
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm mb-4">
                <AlertTriangle className="h-4 w-4" />
                <span>سيفقد المراجع القدرة على الوصول للنظام</span>
              </div>
            )}
          </div>

          {isDeactivating && (
            <div className="mb-6">
              <Label htmlFor="reason" className="text-right block mb-2">
                سبب إلغاء التفعيل <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="اكتب سبب إلغاء تفعيل المراجع..."
                className="text-right resize-none"
                dir="rtl"
                rows={3}
                disabled={isLoading}
              />
              {isDeactivating && !reason.trim() && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  سبب إلغاء التفعيل مطلوب
                </p>
              )}
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              إلغاء
            </Button>
            <Button
              variant={isDeactivating ? "destructive" : "default"}
              onClick={handleConfirm}
              disabled={isLoading || (isDeactivating && !reason.trim())}
              className={`flex items-center gap-2 min-w-[120px] ${
                !isDeactivating ? "bg-green-600 hover:bg-green-700" : ""
              }`}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? `جاري ${action}...` : `${action} المراجع`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
