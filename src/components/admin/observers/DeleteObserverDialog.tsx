"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Observer } from "@/types/observer";
import { AlertTriangle, Loader2, X } from "lucide-react";

interface DeleteObserverDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  observer: Observer | null;
  onConfirm: () => void;
  isDeleting: boolean;
}

export default function DeleteObserverDialog({
  isOpen,
  onOpenChange,
  observer,
  onConfirm,
  isDeleting,
}: DeleteObserverDialogProps) {
  if (!observer) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleClose = () => {
    if (!isDeleting) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <DialogTitle className="text-lg text-right">
                  تأكيد حذف المراجع
                </DialogTitle>
                <DialogDescription className="text-right">
                  هذا الإجراء لا يمكن التراجع عنه
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
              disabled={isDeleting}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
          <div className="text-right mb-6">
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              هل أنت متأكد من حذف المراجع{" "}
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {observer.name}
              </span>
              ؟
            </p>
            <p className="text-red-600 dark:text-red-400 font-medium text-sm">
              تحذير: سيتم حذف جميع البيانات المرتبطة بهذا المراجع نهائياً.
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isDeleting}
            >
              إلغاء
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={isDeleting}
              className="flex items-center gap-2 min-w-[120px]"
            >
              {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isDeleting ? "جاري الحذف..." : "حذف نهائياً"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
