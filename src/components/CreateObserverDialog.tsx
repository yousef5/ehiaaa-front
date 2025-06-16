"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Droplets,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { observerApi } from "@/lib/api";
import axiosInstance from "@/lib/axios";
import { useIsAuthenticated } from "@/stores/authStore";
import { useQuickToast } from "@/stores/uiStore";

import type {
  CreateObserverRequest,
  CreateObserverResponse,
  Governorate,
} from "@/types/observer";

// Zod schema for form validation - all fields required
const createObserverSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون على الأقل حرفين"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
  phone: z.string().regex(/^\+?[0-9\s]{10,15}$/, "رقم الهاتف غير صحيح"),
  address: z.string().min(1, "العنوان مطلوب"),
  identityNumber: z.string().min(1, "رقم الهوية مطلوب"),
  governorateId: z.string().min(1, "المحافظة مطلوبة"),
  cityId: z.string().min(1, "المدينة مطلوبة"),
  birthDate: z.string().min(1, "تاريخ الميلاد مطلوب"),
  bloodType: z.string().min(1, "فصيلة الدم مطلوبة"),
});

type CreateObserverFormData = z.infer<typeof createObserverSchema>;

interface CreateObserverDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function CreateObserverDialog({
  isOpen,
  onOpenChange,
  onSuccess,
}: CreateObserverDialogProps) {
  const toast = useQuickToast();
  const isAuthenticated = useIsAuthenticated();
  const [selectedGovernorateId, setSelectedGovernorateId] =
    useState<string>("");

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
      bloodType: "",
    },
  });

  // Fetch governorates with cities
  const {
    data: governorates,
    isLoading: isLoadingGovernorates,
    error,
    isError,
    isFetching,
    status,
    refetch,
  } = useQuery({
    queryKey: ["governorates-with-cities"],
    queryFn: async (): Promise<Governorate[]> => {
      console.log("🔍 Fetching governorates...");
      try {
        return await observerApi.getGovernorates();
      } catch (error) {
        console.error("❌ Governorates fetch failed:", error);
        throw error;
      }
    },
    // Force the query to run
    enabled: true,
    retry: 1, // Only retry once to avoid infinite loops
    staleTime: 0, // Always refetch
    gcTime: 0, // Don't cache
  });

  console.log("🔍 Query Debug Info:", {
    governorates,
    isLoadingGovernorates,
    error,
    isError,
    isFetching,
    status,
    isAuthenticated,
    isOpen,
    queryEnabled: isOpen && isAuthenticated,
  });

  // Debug: Show authentication and token status
  useEffect(() => {
    if (isOpen) {
      console.log("🔍 Dialog opened - checking auth status:");
      console.log("- Is authenticated:", isAuthenticated);
      console.log(
        "- Auth storage:",
        localStorage.getItem("ehiaaa-auth-storage")
      );
      console.log("- Access token:", localStorage.getItem("h_a"));
      console.log("- Refresh token:", localStorage.getItem("h_aa"));
    }
  }, [isOpen, isAuthenticated]);

  // Create observer mutation
  const createObserverMutation = useMutation({
    mutationFn: async (
      data: CreateObserverRequest
    ): Promise<CreateObserverResponse> => {
      const response = await axiosInstance.post("/observers", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(
        "تم إنشاء المراجع بنجاح",
        `تم إضافة ${data.observer.name} كمراجع جديد`
      );
      form.reset();
      setSelectedGovernorateId("");
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error("خطأ في إنشاء المراجع", error.message);
    },
  });

  const onSubmit = (data: CreateObserverFormData) => {
    const submitData: CreateObserverRequest = {
      ...data,
      birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
    };
    createObserverMutation.mutate(submitData);
  };

  const handleClose = () => {
    form.reset();
    setSelectedGovernorateId("");
    onOpenChange(false);
  };

  // Handle dialog state changes for proper accessibility
  useEffect(() => {
    if (!isOpen) {
      // Reset form state when dialog closes
      form.reset();
      setSelectedGovernorateId("");
    }
  }, [isOpen, form]);

  // Watch governorate changes to update selectedGovernorateId
  const governorateId = form.watch("governorateId");

  // Update selectedGovernorateId when form value changes
  useEffect(() => {
    if (governorateId && governorateId !== selectedGovernorateId) {
      setSelectedGovernorateId(governorateId);
    }
  }, [governorateId, selectedGovernorateId]);

  const selectedGovernorate = governorates?.find(
    (gov) => gov.id === selectedGovernorateId
  );

  const bloodTypes = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[90vh]"
        dir="rtl"
        onOpenAutoFocus={(e) => {
          // Prevent auto focus to avoid conflicts with Select components
          e.preventDefault();
        }}
      >
        <DialogHeader className="text-right">
          <div className="flex items-center justify-between flex-row-reverse">
            <div className="text-right">
              <DialogTitle className="flex items-center gap-2 text-lg flex-row-reverse">
                <User className="h-5 w-5 text-blue-500" />
                إضافة مراجع جديد
              </DialogTitle>
              <DialogDescription className="text-right">
                إنشاء حساب مراجع جديد للنظام
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Debug Section - Remove in production */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg mb-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
              Debug Info: Status = {status}, Data ={" "}
              {governorates ? "exists" : "undefined"}
            </p>
            <Button
              onClick={() => refetch()}
              size="sm"
              variant="outline"
              className="text-xs"
            >
              Force Refetch Governorates
            </Button>
          </div>
        )}

        <ScrollArea className="max-h-[calc(90vh-120px)] px-1">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
              dir="rtl"
            >
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 flex-row-reverse justify-end">
                      <User className="h-4 w-4" />
                      الاسم الكامل *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="أدخل الاسم الكامل"
                        {...field}
                        className="text-right"
                        dir="rtl"
                      />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 flex-row-reverse justify-end">
                      <Mail className="h-4 w-4" />
                      البريد الإلكتروني *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@ehiaaa.com"
                        {...field}
                        className="text-right"
                        dir="rtl"
                      />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 flex-row-reverse justify-end">
                      <Lock className="h-4 w-4" />
                      كلمة المرور *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="أدخل كلمة المرور"
                        {...field}
                        className="text-right"
                        dir="rtl"
                      />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 flex-row-reverse justify-end">
                      <Phone className="h-4 w-4" />
                      رقم الهاتف *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+20123456789"
                        {...field}
                        className="text-right"
                        dir="rtl"
                      />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              {/* Governorate Field */}
              <FormField
                control={form.control}
                name="governorateId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 flex-row-reverse justify-end">
                      <MapPin className="h-4 w-4" />
                      المحافظة *
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedGovernorateId(value);
                        form.setValue("cityId", ""); // Reset city when governorate changes
                      }}
                      value={field.value}
                      disabled={isLoadingGovernorates}
                    >
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="اختر المحافظة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {governorates?.map((governorate) => (
                          <SelectItem
                            key={governorate.id}
                            value={governorate.id}
                            className="text-right"
                          >
                            {governorate.nameAr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              {/* City Field */}
              {selectedGovernorate && (
                <FormField
                  control={form.control}
                  name="cityId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-right">المدينة *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-right">
                            <SelectValue placeholder="اختر المدينة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedGovernorate.cities?.map((city) => (
                            <SelectItem
                              key={city.id}
                              value={city.id}
                              className="text-right"
                            >
                              {city.nameAr}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />
              )}

              {/* Address Field */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">
                      العنوان التفصيلي *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="أدخل العنوان التفصيلي"
                        {...field}
                        className="text-right"
                        dir="rtl"
                      />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Birth Date Field */}
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 flex-row-reverse justify-end">
                        <Calendar className="h-4 w-4" />
                        تاريخ الميلاد *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="text-right"
                          dir="rtl"
                        />
                      </FormControl>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />

                {/* Blood Type Field */}
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 flex-row-reverse justify-end">
                        <Droplets className="h-4 w-4" />
                        فصيلة الدم *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-right">
                            <SelectValue placeholder="اختر فصيلة الدم" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bloodTypes.map((type) => (
                            <SelectItem
                              key={type.value}
                              value={type.value}
                              className="text-right"
                            >
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Identity Number Field */}
              <FormField
                control={form.control}
                name="identityNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">رقم الهوية *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="أدخل رقم الهوية"
                        {...field}
                        className="text-right"
                        dir="rtl"
                      />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-start gap-3 pt-4 flex-row-reverse">
                <Button
                  type="submit"
                  disabled={createObserverMutation.isPending}
                  className="min-w-[120px]"
                >
                  {createObserverMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      جاري الإنشاء...
                    </>
                  ) : (
                    <>
                      <User className="h-4 w-4 mr-2" />
                      إنشاء المراجع
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={createObserverMutation.isPending}
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
