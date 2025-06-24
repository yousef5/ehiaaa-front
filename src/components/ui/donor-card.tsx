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
import html2canvas from "html2canvas";
import { Download, Heart, User, X } from "lucide-react";
import Image from "next/image";
import QRCode from "qrcode";
import { forwardRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface DonorCardProps {
  userId: string;
  userName: string;
  userAvatar?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DonorCardDisplayProps {
  userId: string;
  userName: string;
  userAvatar?: string;
}

// QR Code component with real QR code generation
const QRCodeDisplay = ({ value }: { value: string }) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL(value, {
          width: 128,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
        setQrCodeDataUrl(url);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    if (value) {
      generateQRCode();
    }
  }, [value]);

  return (
    <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center p-2">
      {qrCodeDataUrl ? (
        <Image
          src={qrCodeDataUrl}
          alt={`QR Code for user ${value}`}
          width={120}
          height={120}
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="text-center text-xs text-gray-600">
          <div className="w-24 h-24 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center mb-1">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
          </div>
          <span className="font-mono text-[8px]">جاري التحميل...</span>
        </div>
      )}
    </div>
  );
};

// The actual card display component
const DonorCardDisplay = forwardRef<HTMLDivElement, DonorCardDisplayProps>(
  ({ userId, userName, userAvatar }, ref) => {
    const getAvatarUrl = (avatar?: string) => {
      if (!avatar) return "/avatars/avatar1.png";
      if (avatar.startsWith("http")) return avatar;
      // For local public folder images, ensure path starts with /
      return avatar.startsWith("/") ? avatar : `/${avatar}`;
    };

    return (
      <div
        ref={ref}
        className="w-80 h-96 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 border border-white rounded-full transform -translate-y-1/2"></div>
        </div>

        {/* Card Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-between">
          {/* Header Section */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
              <Heart className="h-4 w-4 fill-current" />
              <span>بطاقة متبرع</span>
            </div>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-20 h-20 rounded-full bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                {userAvatar ? (
                  <Image
                    src={getAvatarUrl(userAvatar)}
                    alt={`صورة ${userName}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.classList.remove("hidden");
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full flex items-center justify-center bg-gray-100 rounded-full ${
                    userAvatar ? "hidden" : ""
                  }`}
                >
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Name */}
            <h2 className="text-xl font-bold text-white text-center leading-tight">
              {userName}
            </h2>
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center space-y-2">
            <QRCodeDisplay value={userId} />
            <p className="text-white/80 text-xs text-center">
              امسح الكود للتحقق من الهوية
            </p>
          </div>

          {/* Footer Branding */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-red-500 fill-current" />
              </div>
              <span className="text-white font-bold text-lg">إحياء</span>
            </div>
            <p className="text-white/80 text-xs">منصة التبرع بالدم والأعضاء</p>
          </div>
        </div>
      </div>
    );
  }
);

DonorCardDisplay.displayName = "DonorCardDisplay";

export function DonorCard({
  userId,
  userName,
  userAvatar,
  isOpen,
  onOpenChange,
}: DonorCardProps) {
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!cardRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // Higher quality
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
      });

      // Convert to blob and download
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = `donor-card-${userName.replace(/\s+/g, "-")}.png`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          toast.success("تم تحميل بطاقة المتبرع بنجاح");
        }
      }, "image/png");
    } catch (error) {
      console.error("Error exporting donor card:", error);
      toast.error("حدث خطأ أثناء تصدير البطاقة");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md p-0 bg-transparent border-none shadow-none"
        dir="rtl"
      >
        <DialogHeader className="px-6 pt-6 pb-4 bg-white dark:bg-gray-900 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
                <Heart className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold">
                  بطاقة المتبرع
                </DialogTitle>
                <DialogDescription>
                  بطاقة تعريف المتبرع {userName}
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Card Display */}
        <div className="p-6 bg-white dark:bg-gray-900 flex justify-center">
          <DonorCardDisplay
            ref={cardRef}
            userId={userId}
            userName={userName}
            userAvatar={userAvatar}
          />
        </div>

        <DialogFooter className="px-6 pb-6 bg-white dark:bg-gray-900 rounded-b-lg">
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              إغلاق
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2" />
                  جاري التصدير...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 ml-2" />
                  تحميل البطاقة
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
