"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { hospitalApi } from "@/lib/api";
import axiosInstance from "@/lib/axios";
import type {
  HospitalRegistrationData,
  HospitalRegistrationResponse,
  HospitalType,
} from "@/types/hospital";
import type { Governorate } from "@/types/observer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  Building2,
  CheckCircle,
  Eye,
  EyeOff,
  Hospital,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Upload,
} from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// =======================================================================================
// 🎯 FORM VALIDATION SCHEMA
// =======================================================================================
const registrationSchema = z
  .object({
    type: z.enum(["hospital", "bloodbank"], {
      required_error: "يرجى اختيار نوع المؤسسة",
    }),
    name: z.string().min(2, "اسم المؤسسة يجب أن يكون حرفين على الأقل"),
    email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
    password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    confirmPassword: z.string(),
    phone: z
      .string()
      .min(1, "رقم الهاتف مطلوب")
      .regex(/^\+?[0-9\s]{10,15}$/, {
        message: "رقم الهاتف يجب أن يكون صحيحاً (10-15 رقم، يمكن أن يبدأ بـ +)",
      }),
    address: z.string().min(10, "العنوان يجب أن يكون 10 أحرف على الأقل"),
    governorateId: z.string().min(1, "المحافظة مطلوبة"),
    cityId: z.string().min(1, "المدينة مطلوبة"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof registrationSchema>;

interface HospitalRegistrationFormProps {
  onSuccess: (data: HospitalRegistrationResponse) => void;
}

// =======================================================================================
// 🎯 MAIN REGISTRATION FORM COMPONENT
// =======================================================================================
export default function HospitalRegistrationForm({
  onSuccess,
}: HospitalRegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGovernorateId, setSelectedGovernorateId] =
    useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      type: undefined,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      governorateId: "",
      cityId: "",
    },
  });

  // Watch for type changes
  const selectedType = form.watch("type");

  // Fetch governorates with cities using React Query
  const {
    data: governorates,
    isLoading: isLoadingGovernorates,
    error: governoratesError,
  } = useQuery({
    queryKey: ["governorates-with-cities"],
    queryFn: async (): Promise<Governorate[]> => {
      const response = await axiosInstance.get("/governorates?withCities=true");

      // Validate response data
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid governorates data format");
      }

      // Sort governorates alphabetically by Arabic name
      return response.data.sort((a, b) =>
        a.nameAr.localeCompare(b.nameAr, "ar")
      );
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Watch governorate changes to update selectedGovernorateId
  const governorateId = form.watch("governorateId");

  // Update selectedGovernorateId when form value changes
  React.useEffect(() => {
    if (governorateId && governorateId !== selectedGovernorateId) {
      setSelectedGovernorateId(governorateId);
    }
  }, [governorateId, selectedGovernorateId]);

  const handleGovernorateChange = (governorateId: string) => {
    form.setValue("governorateId", governorateId);
    form.setValue("cityId", ""); // Reset city selection
    setSelectedGovernorateId(governorateId);
  };

  const selectedGovernorate = governorates?.find(
    (gov) => gov.id === selectedGovernorateId
  );

  // Handle governorates error
  React.useEffect(() => {
    if (governoratesError) {
      setError("فشل في تحميل المحافظات. يرجى المحاولة مرة أخرى.");
    }
  }, [governoratesError]);

  const handleFileSelect = useCallback((file: File) => {
    // Validate file type
    if (file.type !== "application/pdf") {
      setError("يرجى اختيار ملف PDF فقط");
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError("حجم الملف يجب أن يكون أقل من 10 ميجابايت");
      return;
    }

    setSelectedFile(file);
    setError(null);
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

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const registrationData: HospitalRegistrationData = {
        type: data.type as HospitalType,
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
        cityId: data.cityId,
        identityPapers: selectedFile || undefined,
      };

      const response = await hospitalApi.registerHospital(registrationData);
      onSuccess(response);
    } catch (error: unknown) {
      const errorMessage =
        (
          error as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.response?.data?.message ||
        (error as { message?: string })?.message ||
        "حدث خطأ أثناء التسجيل";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeLabel = () => {
    if (selectedType === "hospital") return "المستشفى";
    if (selectedType === "bloodbank") return "بنك الدم";
    return "المؤسسة";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/50 dark:border-red-800 text-red-700 dark:text-red-300 flex items-center gap-3">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Institution Type Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
            نوع المؤسسة
          </h3>

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  اختر نوع المؤسسة
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع المؤسسة" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hospital">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <span>مستشفى</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="bloodbank">
                      <div className="flex items-center gap-2">
                        <Hospital className="h-4 w-4" />
                        <span>بنك دم</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Institution Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
            معلومات {getTypeLabel()}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Institution Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    اسم {getTypeLabel()}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      {selectedType === "bloodbank" ? (
                        <Hospital className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      ) : (
                        <Building2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      )}
                      <Input
                        placeholder={`أدخل اسم ${getTypeLabel()}`}
                        className="pr-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    البريد الإلكتروني
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder={`admin@${
                          selectedType === "bloodbank"
                            ? "bloodbank"
                            : "hospital"
                        }.com`}
                        type="email"
                        className="pr-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    رقم الهاتف
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="+966 50 123 4567 أو 0501234567"
                        type="tel"
                        className="pr-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  العنوان
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Textarea
                      placeholder={`أدخل عنوان ${getTypeLabel()} الكامل`}
                      className="pr-10 min-h-[80px]"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Location Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
            الموقع
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Governorate */}
            <FormField
              control={form.control}
              name="governorateId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    المحافظة
                  </FormLabel>
                  <Select
                    onValueChange={handleGovernorateChange}
                    defaultValue={field.value}
                    disabled={isLoadingGovernorates}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isLoadingGovernorates
                              ? "جاري التحميل..."
                              : "اختر المحافظة"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {governorates?.map((governorate) => (
                        <SelectItem key={governorate.id} value={governorate.id}>
                          {governorate.nameAr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City */}
            {selectedGovernorate && (
              <FormField
                control={form.control}
                name="cityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      المدينة
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المدينة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectedGovernorate.cities?.map((city) => (
                          <SelectItem key={city.id} value={city.id}>
                            {city.nameAr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        {/* Password Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
            كلمة المرور
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    كلمة المرور
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        className="pl-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    تأكيد كلمة المرور
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="••••••••"
                        type={showConfirmPassword ? "text" : "password"}
                        className="pl-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Optional Document Upload Section */}
        <div className="space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex-1">
              رفع الوثائق (اختياري تماماً)
            </h3>
            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full font-medium">
              يمكن التخطي والمتابعة
            </span>
          </div>

          <div className="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                  ✓
                </span>
              </div>
              <div>
                <p className="text-sm text-green-800 dark:text-green-200 font-medium mb-1">
                  يمكنك إنشاء الحساب الآن بدون أي وثائق
                </p>
                <p className="text-xs text-green-700 dark:text-green-300">
                  سيتم إنشاء حسابك فوراً ويمكنك رفع الوثائق لاحقاً من خلال لوحة
                  التحكم عند الحاجة
                </p>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
              إذا كنت تريد رفع الوثائق الآن (PDF) - اختياري
            </Label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              مثل: الشهادة الضريبية، السجل التجاري، تراخيص التشغيل - يمكنك تخطي
              هذا والمتابعة
            </p>

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
              {selectedFile ? (
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-green-100 dark:bg-green-800 p-3">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} ميجابايت
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBrowseClick}
                    type="button"
                  >
                    اختيار ملف آخر
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3">
                      <Upload className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      اسحب وأفلت ملف PDF هنا (اختياري)
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      أو{" "}
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-500 underline"
                        onClick={handleBrowseClick}
                      >
                        تصفح للاختيار
                      </button>{" "}
                      - يمكنك تخطي هذا والمتابعة
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                      ✓ يمكنك إنشاء الحساب بدون رفع أي ملفات
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF فقط (حد أقصى 10 ميجابايت)
                    </p>
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>جاري التسجيل...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {selectedType === "bloodbank" ? (
                <Hospital className="h-5 w-5" />
              ) : (
                <Building2 className="h-5 w-5" />
              )}
              <span>تسجيل {getTypeLabel()}</span>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
