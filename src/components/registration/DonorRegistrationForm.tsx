/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFieldValidation } from "@/hooks/use-field-validation";
import { extractErrorMessage } from "@/lib/api/donor-api";
import axiosInstance from "@/lib/axios";
import {
  DonorRegistrationFormData,
  donorRegistrationSchema,
} from "@/lib/validations/donor-registration";
import { BloodType, type DonorRegistrationResponse } from "@/types/donor";
import type { Governorate } from "@/types/observer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  Calendar,
  CheckCircle,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DocumentUpload } from "./DocumentUpload";
import { FormSection } from "./FormSection";

// Real API validation functions
const apiValidation = {
  checkEmailExists: async (email: string): Promise<boolean> => {
    try {
      await axiosInstance.post("/registration/check-email-post", { email });
      return false; // Email is available
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        return true; // Email already exists
      }
      // For other errors, we'll assume the email is valid to prevent blocking the user
      console.error("Error checking email:", error);
      return false;
    }
  },

  checkPhoneExists: async (phone: string): Promise<boolean> => {
    try {
      await axiosInstance.get(
        `/registration/check-phone?phone=${encodeURIComponent(phone)}`
      );
      return false; // Phone is available
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        return true; // Phone already exists
      }
      // For other errors, we'll assume the phone is valid to prevent blocking the user
      console.error("Error checking phone:", error);
      return false;
    }
  },

  checkIdentityNumberExists: async (
    identityNumber: string
  ): Promise<boolean> => {
    try {
      await axiosInstance.get(
        `/registration/check-identity?identityNumber=${encodeURIComponent(
          identityNumber
        )}`
      );
      return false; // Identity number is available
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        return true; // Identity number already exists
      }
      // For other errors, we'll assume the identity number is valid to prevent blocking the user
      console.error("Error checking identity number:", error);
      return false;
    }
  },
};

interface DonorRegistrationFormProps {
  onSuccess: (data: DonorRegistrationResponse) => void;
}

export default function DonorRegistrationForm({
  onSuccess,
}: DonorRegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [selectedGovernorateId, setSelectedGovernorateId] =
    useState<string>("");
  const fieldValidation = useFieldValidation();

  const form = useForm<DonorRegistrationFormData>({
    resolver: zodResolver(donorRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      identityNumber: "",
      birthDate: "",
      governorateId: "",
      cityId: "",
      bloodType: BloodType.O_POSITIVE,
    },
    mode: "onChange",
  });

  // Watch fields for validation
  const email = form.watch("email");
  const phone = form.watch("phone");
  const identityNumber = form.watch("identityNumber");

  // Validate unique fields on change
  useEffect(() => {
    // Only validate if email exists, has been touched, and passes basic validation
    if (
      !email ||
      !form.formState.dirtyFields.email ||
      form.getFieldState("email").invalid
    ) {
      return;
    }

    // Check if this value should be validated (not already validated)
    if (!fieldValidation.email.shouldCheck(email)) {
      return;
    }

    // Debounce the validation to avoid too many API calls
    const debounceTimeout = setTimeout(async () => {
      fieldValidation.email.startChecking(email);
      try {
        const exists = await apiValidation.checkEmailExists(email);
        if (exists) {
          fieldValidation.email.setValidation(
            false,
            "البريد الإلكتروني مستخدم بالفعل",
            email
          );
          form.setError("email", {
            type: "validate",
            message: "البريد الإلكتروني مستخدم بالفعل",
          });
        } else {
          fieldValidation.email.setValidation(true, null, email);
        }
      } catch {
        fieldValidation.email.setValidation(true, null, email);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [email, form.formState.dirtyFields.email, form]);

  // Validate phone on change
  useEffect(() => {
    // Only validate if phone exists, has been touched, and passes basic validation
    if (
      !phone ||
      !form.formState.dirtyFields.phone ||
      form.getFieldState("phone").invalid
    ) {
      return;
    }

    // Check if this value should be validated (not already validated)
    if (!fieldValidation.phone.shouldCheck(phone)) {
      return;
    }

    // Debounce the validation to avoid too many API calls
    const debounceTimeout = setTimeout(async () => {
      fieldValidation.phone.startChecking(phone);
      try {
        const exists = await apiValidation.checkPhoneExists(phone);
        if (exists) {
          fieldValidation.phone.setValidation(
            false,
            "رقم الهاتف مستخدم بالفعل",
            phone
          );
          form.setError("phone", {
            type: "validate",
            message: "رقم الهاتف مستخدم بالفعل",
          });
        } else {
          fieldValidation.phone.setValidation(true, null, phone);
        }
      } catch {
        fieldValidation.phone.setValidation(true, null, phone);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [phone, form.formState.dirtyFields.phone, form]);

  // Validate identity number on change
  useEffect(() => {
    // Only validate if identityNumber exists, has been touched, and passes basic validation
    if (
      !identityNumber ||
      !form.formState.dirtyFields.identityNumber ||
      form.getFieldState("identityNumber").invalid
    ) {
      return;
    }

    // Check if this value should be validated (not already validated)
    if (!fieldValidation.identityNumber.shouldCheck(identityNumber)) {
      return;
    }

    // Debounce the validation to avoid too many API calls
    const debounceTimeout = setTimeout(async () => {
      fieldValidation.identityNumber.startChecking(identityNumber);
      try {
        const exists = await apiValidation.checkIdentityNumberExists(
          identityNumber
        );
        if (exists) {
          fieldValidation.identityNumber.setValidation(
            false,
            "رقم الهوية مستخدم بالفعل",
            identityNumber
          );
          form.setError("identityNumber", {
            type: "validate",
            message: "رقم الهوية مستخدم بالفعل",
          });
        } else {
          fieldValidation.identityNumber.setValidation(
            true,
            null,
            identityNumber
          );
        }
      } catch {
        fieldValidation.identityNumber.setValidation(
          true,
          null,
          identityNumber
        );
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [identityNumber, form.formState.dirtyFields.identityNumber, form]);

  // Reset validation when component unmounts
  useEffect(() => {
    return () => {
      fieldValidation.resetValidation();
    };
  }, []);

  // Fetch governorates with cities using React Query
  const { data: governorates, isLoading: isLoadingGovernorates } = useQuery({
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
  useEffect(() => {
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

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setFileError(file ? null : "يرجى رفع ملف الهوية الشخصية");
  };

  const onSubmit = async (data: DonorRegistrationFormData) => {
    // Validate file upload
    if (!selectedFile) {
      setFileError("يرجى رفع ملف الهوية الشخصية");
      return;
    }

    // Check if any field is being validated
    if (fieldValidation.isAnyFieldChecking) {
      toast.error("يرجى الانتظار حتى اكتمال التحقق من البيانات");
      return;
    }

    // Check if all fields are valid
    if (!fieldValidation.areAllFieldsValid) {
      toast.error("يرجى تصحيح الأخطاء قبل إرسال النموذج");
      return;
    }

    setIsLoading(true);

    try {
      // Create form data for multipart/form-data request
      const formData = new FormData();

      // Map BloodType enum values to the expected string format
      const bloodTypeMapping: Record<BloodType, string> = {
        [BloodType.A_POSITIVE]: "A+",
        [BloodType.A_NEGATIVE]: "A-",
        [BloodType.B_POSITIVE]: "B+",
        [BloodType.B_NEGATIVE]: "B-",
        [BloodType.AB_POSITIVE]: "AB+",
        [BloodType.AB_NEGATIVE]: "AB-",
        [BloodType.O_POSITIVE]: "O+",
        [BloodType.O_NEGATIVE]: "O-",
      };

      // Format the data according to the DTO requirements
      const formattedData = {
        ...data,
        // Convert birthDate string to proper ISO format for Date type
        birthDate: data.birthDate
          ? new Date(data.birthDate).toISOString()
          : undefined,
        // Convert bloodType enum to expected string format
        bloodType: bloodTypeMapping[data.bloodType] || "Unknown",
      };

      console.log("Formatted data:", formattedData);

      // Add all form fields to formData
      Object.entries(formattedData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          // Don't include governorateId as it's not in the DTO
          if (key !== "governorateId" && key !== "confirmPassword") {
            formData.append(key, value.toString());
            console.log(`Appended ${key}: ${value}`);
          }
        }
      });

      // Add the ID document file - USING THE CORRECT FIELD NAME 'identityPapers'
      formData.append("identityPapers", selectedFile);
      console.log("Added file as identityPapers:", selectedFile.name);

      // Debug the FormData entries
      console.log("FormData entries:");
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      // Send registration request with increased timeout
      const response = await axiosInstance.post(
        "/registration/donor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000, // Increase timeout to 60 seconds for file upload
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            console.log(`Upload progress: ${percentCompleted}%`);
          },
        }
      );

      toast.success("تم التسجيل بنجاح");
      onSuccess(response.data);
    } catch (error) {
      console.error("Registration error:", error);

      // Handle specific error cases
      if (error instanceof AxiosError) {
        if (error.code === "ECONNABORTED") {
          toast.error(
            "انتهت مهلة الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى."
          );
          return;
        }

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);

          // Handle specific status codes
          if (error.response.status === 413) {
            toast.error("حجم الملف كبير جدًا. يرجى اختيار ملف أصغر.");
            return;
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
          toast.error(
            "لم يتم استلام استجابة من الخادم. يرجى المحاولة مرة أخرى لاحقًا."
          );
          return;
        }
      }

      // Default error message
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const bloodTypeOptions = [
    { value: BloodType.A_POSITIVE, label: "A+" },
    { value: BloodType.A_NEGATIVE, label: "A-" },
    { value: BloodType.B_POSITIVE, label: "B+" },
    { value: BloodType.B_NEGATIVE, label: "B-" },
    { value: BloodType.AB_POSITIVE, label: "AB+" },
    { value: BloodType.AB_NEGATIVE, label: "AB-" },
    { value: BloodType.O_POSITIVE, label: "O+" },
    { value: BloodType.O_NEGATIVE, label: "O-" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information Section */}
        <FormSection title="المعلومات الشخصية">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    الاسم الكامل
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="أدخل اسمك الكامل"
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
                        placeholder="example@email.com"
                        type="email"
                        className={`pr-10 ${
                          fieldValidation.email.isChecking ? "bg-amber-50" : ""
                        }`}
                        {...field}
                      />
                      {fieldValidation.email.isChecking && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                  {fieldValidation.email.errorMessage &&
                    !form.formState.errors.email && (
                      <p className="text-sm font-medium text-red-500 mt-1">
                        {fieldValidation.email.errorMessage}
                      </p>
                    )}
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    رقم الهاتف
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="01xxxxxxxxx"
                        type="tel"
                        className={`pr-10 ${
                          fieldValidation.phone.isChecking ? "bg-amber-50" : ""
                        }`}
                        {...field}
                      />
                      {fieldValidation.phone.isChecking && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                  {fieldValidation.phone.errorMessage &&
                    !form.formState.errors.phone && (
                      <p className="text-sm font-medium text-red-500 mt-1">
                        {fieldValidation.phone.errorMessage}
                      </p>
                    )}
                </FormItem>
              )}
            />

            {/* Identity Number */}
            <FormField
              control={form.control}
              name="identityNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    رقم الهوية
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FileText className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="14 رقم"
                        className={`pr-10 ${
                          fieldValidation.identityNumber.isChecking
                            ? "bg-amber-50"
                            : ""
                        }`}
                        {...field}
                      />
                      {fieldValidation.identityNumber.isChecking && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                  {fieldValidation.identityNumber.errorMessage &&
                    !form.formState.errors.identityNumber && (
                      <p className="text-sm font-medium text-red-500 mt-1">
                        {fieldValidation.identityNumber.errorMessage}
                      </p>
                    )}
                </FormItem>
              )}
            />

            {/* Birth Date */}
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    تاريخ الميلاد
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input type="date" className="pr-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Blood Type */}
            <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    فصيلة الدم
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر فصيلة الدم" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bloodTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      placeholder="أدخل عنوانك الكامل"
                      className="pr-10 min-h-[80px]"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        {/* Location Section */}
        <FormSection title="الموقع">
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
        </FormSection>

        {/* Password Section */}
        <FormSection title="كلمة المرور">
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
        </FormSection>

        {/* Document Upload Section */}
        <FormSection title="الوثائق المطلوبة">
          <DocumentUpload
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            error={fileError}
          />
        </FormSection>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || fieldValidation.isAnyFieldChecking}
          className="w-full h-12 font-semibold rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 shadow-lg shadow-red-500/25 hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>جاري التسجيل...</span>
            </div>
          ) : fieldValidation.isAnyFieldChecking ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>جاري التحقق من البيانات...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>إنشاء حساب جديد</span>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
