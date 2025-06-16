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
import type { Observer } from "@/types/observer";
import { Camera, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";

interface UpdateAvatarDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  observer: Observer | null;
  onConfirm: (avatarFile: File) => void;
  isLoading: boolean;
}

export default function UpdateAvatarDialog({
  isOpen,
  onOpenChange,
  observer,
  onConfirm,
  isLoading,
}: UpdateAvatarDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getBackendUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  };

  const getCurrentAvatarUrl = () => {
    if (observer?.avatar) {
      return `${getBackendUrl()}/public/${observer.avatar}`;
    }
    return `${getBackendUrl()}/public/avatars/emp.jpg`;
  };

  const handleFileSelect = useCallback((file: File) => {
    // Validate file type
    if (!file.type.match(/^image\/(jpg|jpeg|png|gif)$/)) {
      alert("يرجى اختيار ملف صورة صالح (JPG, JPEG, PNG, GIF)");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("حجم الملف يجب أن يكون أقل من 5 ميجابايت");
      return;
    }

    setSelectedFile(file);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(false);

      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleConfirm = () => {
    if (selectedFile) {
      onConfirm(selectedFile);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setDragActive(false);
      onOpenChange(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  // Cleanup preview URL on unmount
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!observer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0" dir="rtl">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-blue-500" />
              <div>
                <DialogTitle className="text-lg text-right">
                  تحديث صورة المراجع
                </DialogTitle>
                <DialogDescription className="text-right">
                  اختر صورة جديدة للمراجع {observer.name}
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
          {/* Current Avatar */}
          <div className="text-center mb-4">
            <Label className="text-sm font-medium text-right block mb-2">
              الصورة الحالية
            </Label>
            <div className="flex justify-center">
              <Image
                src={getCurrentAvatarUrl()}
                alt={observer.name}
                width={80}
                height={80}
                className="rounded-full border-2 border-gray-200 dark:border-gray-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `${getBackendUrl()}/public/avatars/emp.jpg`;
                }}
              />
            </div>
          </div>

          {/* File Upload Area */}
          <div className="mb-4">
            <Label className="text-sm font-medium text-right block mb-2">
              اختر صورة جديدة
            </Label>

            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive
                  ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {previewUrl ? (
                <div className="space-y-3">
                  <Image
                    src={previewUrl}
                    alt="معاينة"
                    width={100}
                    height={100}
                    className="rounded-full mx-auto border-2 border-gray-200 dark:border-gray-700"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedFile?.name}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBrowseClick}
                    disabled={isLoading}
                  >
                    اختيار صورة أخرى
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3">
                      <Upload className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      اسحب وأفلت الصورة هنا
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      أو{" "}
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-500"
                        onClick={handleBrowseClick}
                        disabled={isLoading}
                      >
                        تصفح للاختيار
                      </button>
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">
                    JPG, JPEG, PNG, GIF (حد أقصى 5 ميجابايت)
                  </p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpg,image/jpeg,image/png,image/gif"
              onChange={handleFileInputChange}
              className="hidden"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isLoading || !selectedFile}
              className="flex items-center gap-2 min-w-[120px]"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? "جاري التحديث..." : "تحديث الصورة"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
