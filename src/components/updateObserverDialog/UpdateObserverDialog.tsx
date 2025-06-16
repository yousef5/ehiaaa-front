"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2, UserCog, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
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
import { observerApi } from "@/lib/api";

import type { City, Governorate, Observer } from "@/types/observer";
import { CreateObserverFormData } from "../createObserverDialog/schema";
import { AdditionalInfoSection } from "../createObserverDialog/sections/AdditionalInfoSection";
import { AuthSection } from "../createObserverDialog/sections/AuthSection";
import { LocationSection } from "../createObserverDialog/sections/LocationSection";
import { PersonalInfoSection } from "../createObserverDialog/sections/PersonalInfoSection";
import { errorMessages } from "../createObserverDialog/utils/helpers";
import { updateObserverSchema, type UpdateObserverFormData } from "./schema";

interface UpdateObserverDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  observerId: string;
  onSuccess?: (data: {
    message: string;
    observer: Observer;
    updatedBy: string;
    updatedAt: string;
  }) => void;
}

// Extend Governorate type for local use if needed
interface ExtendedGovernorate extends Governorate {
  cities?: City[];
}

export default function UpdateObserverDialog({
  isOpen,
  onOpenChange,
  observerId,
  onSuccess,
}: UpdateObserverDialogProps) {
  const queryClient = useQueryClient();
  const [selectedGovernorateId, setSelectedGovernorateId] =
    useState<string>("");
  const [isFormReady, setIsFormReady] = useState(false);
  const [initialData, setInitialData] = useState<UpdateObserverFormData | null>(
    null
  );

  // Fetch all governorates with cities
  const { data: governorates, isLoading: isLoadingGovernorates } = useQuery({
    queryKey: ["governorates-with-cities"],
    queryFn: async (): Promise<Governorate[]> => {
      return observerApi.getGovernorates();
    },
    enabled: isOpen,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const form = useForm<UpdateObserverFormData>({
    resolver: zodResolver(updateObserverSchema),
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
      bloodType: "A+" as const,
    },
  });

  // Fetch observer data
  const { data: observer, isLoading: isLoadingObserver } = useQuery({
    queryKey: ["observer", observerId],
    queryFn: () => observerApi.getObserverById(observerId),
    enabled: isOpen && !!observerId,
    staleTime: 1000 * 60 * 5,
  });

  // Update form values when observer data is loaded
  useEffect(() => {
    if (observer && isOpen && governorates && governorates.length > 0) {
      console.log("Loading observer data:", observer);

      const formattedBirthDate = observer.birthDate
        ? new Date(observer.birthDate).toISOString().split("T")[0]
        : "";

      let governorateId = "";
      let cityId = "";

      // Smart detection of governorate and city IDs
      if (observer.city?.governorate?.id) {
        // If we have the complete nested data
        governorateId = observer.city.governorate.id;
        cityId = observer.city.id;
      } else if (observer.city?.governorateId && observer.city?.id) {
        // If we have partial nested data
        governorateId = observer.city.governorateId;
        cityId = observer.city.id;
      } else if (observer.cityId) {
        // If we only have the cityId, find the corresponding governorate
        cityId = observer.cityId;

        // Search through all governorates to find which one contains this city
        for (const gov of governorates) {
          const extendedGov = gov as ExtendedGovernorate;
          const foundCity = extendedGov.cities?.find(
            (city) => city.id === cityId
          );
          if (foundCity) {
            governorateId = gov.id;
            break;
          }
        }
      }

      const formData: UpdateObserverFormData = {
        name: observer.name,
        email: observer.email,
        password: "",
        phone: observer.phone,
        address: observer.address || "",
        identityNumber: observer.identityNumber || "",
        governorateId: governorateId,
        cityId: cityId,
        birthDate: formattedBirthDate,
        bloodType:
          (observer.bloodType as
            | "A+"
            | "A-"
            | "B+"
            | "B-"
            | "AB+"
            | "AB-"
            | "O+"
            | "O-") || "A+",
      };

      form.reset(formData);
      setInitialData(formData);
      setSelectedGovernorateId(governorateId);

      // Log the detected location data for debugging
      console.log("Location data detected:", {
        governorateId,
        cityId,
        governorateName: governorates.find((g) => g.id === governorateId)
          ?.nameAr,
        cityName: (
          governorates.find(
            (g) => g.id === governorateId
          ) as ExtendedGovernorate
        )?.cities?.find((c) => c.id === cityId)?.nameAr,
      });

      setTimeout(() => {
        setIsFormReady(true);
      }, 200);
    }
  }, [observer, form, isOpen, governorates]);

  // Reset form when dialog is closed
  useEffect(() => {
    if (!isOpen) {
      form.reset({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        identityNumber: "",
        governorateId: "",
        cityId: "",
        birthDate: "",
        bloodType: "A+" as const,
      });
      setSelectedGovernorateId("");
      setIsFormReady(false);
      setInitialData(null);
      form.clearErrors();
    }
  }, [isOpen, form]);

  const updateObserverMutation = useMutation({
    mutationFn: async (data: Partial<Observer> & { password?: string }) => {
      const finalData = { ...data };
      delete (finalData as { governorateId?: string }).governorateId;
      return observerApi.updateObserver(observerId, finalData);
    },
    onSuccess: (data) => {
      toast.success("تم تحديث بيانات المراجع بنجاح", {
        description: "تم تحديث بيانات المراجع في النظام",
        duration: 5000,
      });

      onOpenChange(false);

      if (onSuccess) {
        onSuccess(data);
      }

      queryClient.invalidateQueries({
        queryKey: ["observer", observerId],
      });
      queryClient.invalidateQueries({
        queryKey: ["observers"],
      });
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const statusCode = axiosError.response?.status || 0;
      const errorData =
        (axiosError.response?.data as { message?: string }) || {};
      const errorMessage =
        errorData.message || axiosError.message || "حدث خطأ غير متوقع";
      const translatedMessage =
        errorMessages[errorMessage as keyof typeof errorMessages] ||
        errorMessage;

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
          description:
            translatedMessage || "ليس لديك صلاحية لتحديث بيانات المراجع",
          duration: 5000,
        });
      } else if (statusCode >= 500) {
        toast.error("خطأ في الخادم", {
          description: translatedMessage || "يرجى المحاولة مرة أخرى لاحقاً",
          duration: 5000,
        });
      } else {
        toast.error("خطأ في تحديث بيانات المراجع", {
          description: translatedMessage,
          duration: 5000,
        });
      }
    },
  });

  const onSubmit = useCallback(
    (data: UpdateObserverFormData) => {
      console.log("🚀 Submitting form data:", data);

      if (!data.cityId) {
        toast.error("خطأ في البيانات", {
          description: "يجب اختيار المدينة",
          duration: 5000,
        });
        return;
      }

      // Check what actually changed
      const changedFields: Partial<Observer> & { password?: string } = {};

      if (initialData) {
        if (data.name !== initialData.name) changedFields.name = data.name;
        if (data.email !== initialData.email) changedFields.email = data.email;
        if (data.phone !== initialData.phone) changedFields.phone = data.phone;
        if (data.address !== initialData.address)
          changedFields.address = data.address;
        if (data.identityNumber !== initialData.identityNumber)
          changedFields.identityNumber = data.identityNumber;
        if (data.cityId !== initialData.cityId)
          changedFields.cityId = data.cityId;
        if (data.bloodType !== initialData.bloodType)
          changedFields.bloodType = data.bloodType;
        if (data.birthDate !== initialData.birthDate) {
          changedFields.birthDate = data.birthDate
            ? new Date(data.birthDate).toISOString()
            : undefined;
        }
        if (data.password && data.password.trim().length > 0) {
          changedFields.password = data.password;
        }
      }

      // If nothing changed, just close the dialog
      if (Object.keys(changedFields).length === 0) {
        toast.info("لم يتم تغيير أي بيانات");
        onOpenChange(false);
        return;
      }

      console.log("✅ Changed fields:", changedFields);

      updateObserverMutation.mutate(changedFields);
    },
    [updateObserverMutation, initialData, onOpenChange]
  );

  const handleClose = useCallback(() => {
    form.reset({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      identityNumber: "",
      governorateId: "",
      cityId: "",
      birthDate: "",
      bloodType: "A+" as const,
    });

    setSelectedGovernorateId("");
    setIsFormReady(false);
    setInitialData(null);
    form.clearErrors();
    onOpenChange(false);
  }, [form, onOpenChange]);

  const handleGovernorateChange = useCallback(
    (value: string) => {
      console.log("Governorate changed to:", value);
      setSelectedGovernorateId(value);
      form.setValue("governorateId", value, {
        shouldValidate: true,
        shouldDirty: true,
      });
      form.setValue("cityId", "", { shouldValidate: false, shouldDirty: true });
      form.clearErrors("cityId");
    },
    [form]
  );

  const handleCityChange = useCallback(() => {
    console.log("City changed");
    console.log(form.getValues("cityId"));

    console.log(initialData?.cityId);
    // Force form to recognize changes
    const currentCity = form.getValues("cityId");
    if (currentCity && initialData && currentCity !== initialData.cityId) {
      form.setValue("cityId", currentCity, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [form, initialData]);

  const selectedGovernorate = governorates?.find(
    (gov) => gov.id === selectedGovernorateId
  ) as ExtendedGovernorate | undefined;

  const isLoading =
    updateObserverMutation.isPending || isLoadingObserver || !isFormReady;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0" dir="rtl">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCog className="h-5 w-5 text-blue-500" />
              <div>
                <DialogTitle className="text-lg text-right">
                  تعديل بيانات المراجع
                </DialogTitle>
                <DialogDescription className="text-right">
                  تحديث بيانات المراجع في النظام
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

        {isLoadingObserver || isLoadingGovernorates ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 ml-2" />
            <span>جاري تحميل بيانات المراجع...</span>
          </div>
        ) : (
          <ScrollArea className="max-h-[calc(90vh-140px)] px-6" dir="rtl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 pb-6"
                dir="rtl"
              >
                <PersonalInfoSection
                  form={
                    form as unknown as UseFormReturn<CreateObserverFormData>
                  }
                />
                <AuthSection
                  form={
                    form as unknown as UseFormReturn<CreateObserverFormData>
                  }
                  isUpdate={true}
                />
                <LocationSection
                  form={
                    form as unknown as UseFormReturn<CreateObserverFormData>
                  }
                  governorates={governorates}
                  selectedGovernorate={selectedGovernorate}
                  isLoadingGovernorates={isLoadingGovernorates}
                  onGovernorateChange={handleGovernorateChange}
                  onCityChange={handleCityChange}
                />
                <AdditionalInfoSection
                  form={
                    form as unknown as UseFormReturn<CreateObserverFormData>
                  }
                />

                <div className="flex gap-3 pt-4" dir="rtl">
                  <Button
                    type="submit"
                    disabled={isLoading || !form.formState.isDirty}
                    className="min-w-[120px]"
                  >
                    {updateObserverMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin ml-2" />
                        جاري التحديث...
                      </>
                    ) : (
                      <>
                        <UserCog className="h-4 w-4 ml-2" />
                        تحديث البيانات
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
        )}
      </DialogContent>
    </Dialog>
  );
}
