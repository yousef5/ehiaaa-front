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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Scan, User, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BarcodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (donorId: string) => void;
  title?: string;
  description?: string;
}

export function BarcodeScanner({
  isOpen,
  onClose,
  onScanSuccess,
  title = "مسح QR كود المتبرع",
  description = "استخدم جهاز QR Scanner الخاص بالمستشفى ثم أدخل معرف المتبرع",
}: BarcodeScannerProps) {
  const [manualInput, setManualInput] = useState("");

  // Handle manual input submission
  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      onScanSuccess(manualInput.trim());
      handleClose();
    } else {
      toast.error("يرجى إدخال معرف المتبرع");
    }
  };

  // Handle dialog close
  const handleClose = () => {
    setManualInput("");
    onClose();
  };

  // Reset data when dialog opens/closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setManualInput("");
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 shadow-2xl rounded-2xl"
        dir="rtl"
      >
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg">
              <Scan className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {title}
              </DialogTitle>
              <DialogDescription className="text-slate-600 dark:text-slate-400 mt-1">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* QR Scanner Instructions */}
          <div className="p-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
            <div className="text-center space-y-4">
              <div className="p-4 bg-blue-500 text-white rounded-full mx-auto w-fit">
                <Scan className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 text-lg">
                  استخدم جهاز QR Scanner
                </h3>
                <p className="text-blue-600/80 dark:text-blue-400/80 text-sm leading-relaxed">
                  قم بمسح QR كود المتبرع باستخدام جهاز QR Scanner الخاص
                  بالمستشفى، ثم أدخل معرف المتبرع الذي ظهر في الجهاز في الحقل
                  أدناه
                </p>
              </div>
            </div>
          </div>

          {/* Manual Input Section */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              معرف المتبرع من QR Scanner
            </Label>
            <div className="space-y-3">
              <Input
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value.toUpperCase())}
                placeholder="أدخل معرف المتبرع (مثال: DNR123456789)"
                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-300 dark:border-slate-600 rounded-xl h-12 text-center font-mono text-lg tracking-wider"
                onKeyPress={(e) => e.key === "Enter" && handleManualSubmit()}
                autoFocus
              />
              <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span>أدخل معرف المتبرع كما ظهر في جهاز QR Scanner بدقة</span>
              </div>
            </div>
          </div>

          {/* Quick Access Buttons for Testing */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setManualInput("DNR123456789")}
              className="text-xs py-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
            >
              مثال متبرع #1
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setManualInput("DNR987654321")}
              className="text-xs py-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
            >
              مثال متبرع #2
            </Button>
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button
            onClick={handleClose}
            variant="outline"
            className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
          >
            <X className="h-4 w-4 mr-2" />
            إلغاء
          </Button>
          <Button
            onClick={handleManualSubmit}
            disabled={!manualInput.trim()}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg rounded-xl disabled:opacity-50"
          >
            <User className="h-4 w-4 mr-2" />
            تأكيد المتبرع
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
