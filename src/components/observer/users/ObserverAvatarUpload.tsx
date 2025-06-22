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
import { usersApi } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { Camera, Loader2, Trash2, Upload, User } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface ObserverAvatarUploadProps {
  userId: string;
  currentAvatar?: string;
  userName: string;
  onAvatarUpdate: () => void;
  className?: string;
}

export function ObserverAvatarUpload({
  userId,
  currentAvatar,
  userName,
  onAvatarUpdate,
  className = "",
}: ObserverAvatarUploadProps) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getBackendUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  };

  const getAvatarUrl = (avatar?: string) => {
    if (avatar) {
      const avatarPath = `${avatar}`;
      return `${getBackendUrl()}/public/${avatarPath}`;
    }
    return `/avatars/avatar1.png`; // Default local avatar
  };

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("يرجى اختيار ملف صورة صالح");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الملف يجب أن يكون أقل من 5 ميجابايت");
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleUploadOrUpdate = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      if (currentAvatar) {
        await usersApi.updateUserAvatar(userId, selectedFile);
        toast.success("تم تحديث الصورة الشخصية بنجاح");
      } else {
        await usersApi.uploadUserAvatar(userId, selectedFile);
        toast.success("تم رفع الصورة الشخصية بنجاح");
      }

      // Invalidate observer users queries to update the main list
      queryClient.invalidateQueries({ queryKey: ["observer-users"] });
      queryClient.invalidateQueries({
        queryKey: ["observer-user-detail", userId],
      });

      onAvatarUpdate();
      handleCloseDialog();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message
          : "حدث خطأ أثناء رفع الصورة";
      toast.error(errorMessage || "حدث خطأ أثناء رفع الصورة");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    setIsLoading(true);
    try {
      await usersApi.removeUserAvatar(userId);
      toast.success("تم حذف الصورة الشخصية بنجاح");

      // Invalidate observer users queries to update the main list
      queryClient.invalidateQueries({ queryKey: ["observer-users"] });
      queryClient.invalidateQueries({
        queryKey: ["observer-user-detail", userId],
      });

      onAvatarUpdate();
      handleCloseDialog();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message
          : "حدث خطأ أثناء حذف الصورة";
      toast.error(errorMessage || "حدث خطأ أثناء حذف الصورة");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    if (!isLoading) {
      setShowDialog(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setDragActive(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className={`relative ${className}`}>
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 p-0.5 shadow-lg">
          <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
            {currentAvatar ? (
              <Image
                src={getAvatarUrl(currentAvatar) || ""}
                alt={`صورة ${userName}`}
                width={80}
                height={80}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
                <User className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
            )}
          </div>

          {/* Single action button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute -bottom-1 -right-1 rounded-full w-8 h-8 p-0 bg-white dark:bg-gray-800 border-2 border-teal-500 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg"
            onClick={() => setShowDialog(true)}
            disabled={isLoading}
          >
            <Camera className="w-4 h-4" />
          </Button>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {/* Comprehensive Avatar Management Dialog */}
      <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[500px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-teal-600" />
              إدارة الصورة الشخصية
            </DialogTitle>
            <DialogDescription>
              إدارة الصورة الشخصية للمستخدم &quot;{userName}&quot;
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Current Avatar Section */}
            {currentAvatar && (
              <div className="text-center">
                <Label className="text-sm font-medium block mb-3">
                  الصورة الحالية
                </Label>
                <div className="flex justify-center mb-4">
                  <Image
                    src={getAvatarUrl(currentAvatar) || ""}
                    alt={`صورة ${userName}`}
                    width={100}
                    height={100}
                    className="rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-md"
                  />
                </div>
              </div>
            )}

            {/* Upload/Update Section */}
            <div>
              <Label className="text-sm font-medium block mb-3">
                {currentAvatar ? "تحديث الصورة" : "رفع صورة جديدة"}
              </Label>

              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive
                    ? "border-teal-400 bg-teal-50 dark:bg-teal-900/20"
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
                          className="text-teal-600 hover:text-teal-500"
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
            </div>
          </div>

          <DialogFooter className="flex-row-reverse gap-2">
            <Button
              variant="outline"
              onClick={handleCloseDialog}
              disabled={isLoading}
            >
              إلغاء
            </Button>

            {/* Delete button - only show if avatar exists */}
            {currentAvatar && (
              <Button
                variant="destructive"
                onClick={handleDeleteAvatar}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                    جاري الحذف...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 ml-2" />
                    حذف الصورة
                  </>
                )}
              </Button>
            )}

            {/* Upload/Update button - only show if file is selected */}
            {selectedFile && (
              <Button onClick={handleUploadOrUpdate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                    {currentAvatar ? "جاري التحديث..." : "جاري الرفع..."}
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4 ml-2" />
                    {currentAvatar ? "تحديث الصورة" : "رفع الصورة"}
                  </>
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
