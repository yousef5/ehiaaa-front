"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2, User, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import axiosInstance from "@/lib/axios";

import type {
  CreateObserverRequest,
  CreateObserverResponse,
} from "@/types/observer";
import { useObserverDialog } from "./hooks/useObserverDialog";
import { createObserverSchema, type CreateObserverFormData } from "./schema";
import { AdditionalInfoSection } from "./sections/AdditionalInfoSection";
import { AuthSection } from "./sections/AuthSection";
import { LocationSection } from "./sections/LocationSection";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { errorMessages } from "./utils/helpers";

interface CreateObserverDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (data: CreateObserverResponse) => void;
}

export default function CreateObserverDialog({
  isOpen,
  onOpenChange,
  onSuccess,
}: CreateObserverDialogProps) {
  const [selectedGovernorateId, setSelectedGovernorateId] =
    useState<string>("");

  const { governorates, isLoadingGovernorates } = useObserverDialog(isOpen);

  const form = useForm<CreateObserverFormData>({
    resolver: zodResolver(createObserverSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      identityNumber: "",
      governorateId: "",
      cityId: "",
      birthDate: "",
      bloodType: "A+",
    },
  });

  const createObserverMutation = useMutation({
    mutationFn: async (
      data: CreateObserverRequest
    ): Promise<CreateObserverResponse> => {
      const response = await axiosInstance.post("/observers", data);
      return response.data;
    },
    onSuccess: (data) => {
      // Reset form
      form.reset();

      // Show success message
      toast.success("تم إنشاء المراجع بنجاح", {
        description: "تم إضافة المراجع الجديد إلى النظام",
        duration: 5000,
      });

      // Close dialog
      onOpenChange(false);

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: unknown) => {
      // Type guard for AxiosError
      const axiosError = error as AxiosError<{ message?: string }>;

      // Extract error details
      const statusCode = axiosError.response?.status || 0;
      const errorData =
        (axiosError.response?.data as { message?: string }) || {};
      const errorMessage =
        errorData.message || axiosError.message || "حدث خطأ غير متوقع";

      // Translate error message if translation exists
      const translatedMessage =
        errorMessages[errorMessage as keyof typeof errorMessages] ||
        errorMessage;

      console.log("Error details:", {
        statusCode,
        errorMessage,
        translatedMessage,
        errorData,
        fullError: axiosError,
      });

      // Handle specific error codes
      if (statusCode === 409) {
        toast.error("تعارض في البيانات", {
          description: translatedMessage,
          duration: 5000,
        });
      } else if (statusCode === 400) {
        toast.error("بيانات غير صالحة", {
          description: translatedMessage,
          duration: 5000,
        });
      } else if (statusCode === 401) {
        toast.error("غير مصرح", {
          description: translatedMessage || "يرجى تسجيل الدخول مرة أخرى",
          duration: 5000,
        });
      } else if (statusCode === 403) {
        toast.error("غير مسموح", {
          description: translatedMessage || "ليس لديك صلاحية لإنشاء مراجع جديد",
          duration: 5000,
        });
      } else if (statusCode >= 500) {
        toast.error("خطأ في الخادم", {
          description: translatedMessage || "يرجى المحاولة مرة أخرى لاحقاً",
          duration: 5000,
        });
      } else {
        // Fallback error message
        toast.error("خطأ في إنشاء المراجع", {
          description: translatedMessage,
          duration: 5000,
        });
      }
    },
  });

  const onSubmit = useCallback(
    (data: CreateObserverFormData) => {
      const submitData: CreateObserverRequest = {
        ...data,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      };

      // Remove governorateId if the API doesn't expect it
      // Keep only cityId for location
      delete submitData.governorateId;

      createObserverMutation.mutate(submitData);
    },
    [createObserverMutation]
  );

  const handleClose = useCallback(() => {
    form.reset();
    setSelectedGovernorateId("");
    onOpenChange(false);
  }, [form, onOpenChange]);

  const handleGovernorateChange = useCallback(
    (value: string) => {
      setSelectedGovernorateId(value);
      form.setValue("governorateId", value);
      form.setValue("cityId", ""); // Reset city when governorate changes
    },
    [form]
  );

  const selectedGovernorate = governorates?.find(
    (gov) => gov.id === selectedGovernorateId
  );

  const isLoading = createObserverMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent size="xl" className=" p-0 ">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              <div>
                <DialogTitle className="text-lg">إضافة مراجع جديد</DialogTitle>
                <DialogDescription>
                  إنشاء حساب مراجع جديد للنظام
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

        <ScrollArea className="max-h-[calc(90vh-140px)] px-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pb-6"
            >
              <PersonalInfoSection form={form} />
              <AuthSection form={form} />
              <LocationSection
                form={form}
                governorates={governorates}
                selectedGovernorate={selectedGovernorate}
                isLoadingGovernorates={isLoadingGovernorates}
                onGovernorateChange={handleGovernorateChange}
              />
              <AdditionalInfoSection form={form} />

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="min-w-[120px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin ml-2" />
                      جاري الإنشاء...
                    </>
                  ) : (
                    <>
                      <User className="h-4 w-4 ml-2" />
                      إنشاء المراجع
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
