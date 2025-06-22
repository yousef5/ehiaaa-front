"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CompatibilityResponse, donationsApi } from "@/lib/cases-api";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Check,
  CheckCircle,
  Clock,
  Droplets,
  Plus,
  Scan,
  User,
  XCircle,
} from "lucide-react";
import { BarcodeScanner } from "./BarcodeScanner";

// DonationStatus enum matching the backend
export enum DonationStatus {
  COMPLETED = "completed",
  REFUSED = "refused",
}

const donorIdSchema = z.object({
  donorId: z.string().min(1, "معرف المتبرع مطلوب"),
});

const addDonationSchema = z.object({
  quantity: z
    .number()
    .min(1, "الحد الأدنى هو كيس واحد")
    .max(10, "الحد الأقصى هو 10 أكياس"),
  notes: z.string().optional(),
  status: z.nativeEnum(DonationStatus).optional(),
  statusNotes: z.string().optional(),
});

type DonorIdForm = z.infer<typeof donorIdSchema>;
type AddDonationForm = z.infer<typeof addDonationSchema>;

interface AddDonationDialogProps {
  caseId: string;
  bloodType: string;
  children?: React.ReactNode;
}

// Status labels in Arabic
const statusLabels: Record<DonationStatus, string> = {
  [DonationStatus.COMPLETED]: "مكتمل",
  [DonationStatus.REFUSED]: "مرفوض",
};

type DialogStage = "donor-check" | "donation-form";

export function AddDonationDialog({
  caseId,
  bloodType,
  children,
}: AddDonationDialogProps) {
  const [open, setOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [stage, setStage] = useState<DialogStage>("donor-check");
  const [compatibilityData, setCompatibilityData] =
    useState<CompatibilityResponse | null>(null);
  const queryClient = useQueryClient();

  // Helper function to get standardized avatar URL
  const getAvatarUrl = (avatar?: string | null) => {
    if (avatar) {
      const backendUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      return `${backendUrl}/public/${avatar}`;
    }
    return `/avatars/avatar1.png`; // Default local avatar
  };

  const donorForm = useForm<DonorIdForm>({
    resolver: zodResolver(donorIdSchema),
    defaultValues: {
      donorId: "",
    },
  });

  const donationForm = useForm<AddDonationForm>({
    resolver: zodResolver(addDonationSchema),
    defaultValues: {
      quantity: 1,
      notes: "",
      status: DonationStatus.COMPLETED,
    },
  });

  // Auto-reset when dialog closes
  useEffect(() => {
    if (!open) {
      // Reset all state when dialog is closed
      setScannerOpen(false);
      setStage("donor-check");
      setCompatibilityData(null);
      donorForm.reset({
        donorId: "",
      });
      donorForm.clearErrors();
      donationForm.reset({
        quantity: 1,
        notes: "",
        status: DonationStatus.COMPLETED,
        statusNotes: "",
      });
      donationForm.clearErrors();
    }
  }, [open, donorForm, donationForm]);

  // Check compatibility when donor form is submitted
  const checkCompatibilityMutation = useMutation({
    mutationFn: async (data: DonorIdForm) => {
      console.log("Starting compatibility check for:", {
        caseId,
        donorId: data.donorId,
      });
      const response = await donationsApi.checkCompatibility(
        caseId,
        data.donorId
      );
      console.log("API function returned:", response);
      return response;
    },
    onSuccess: (data) => {
      console.log("Mutation onSuccess received:", data);
      console.log("Data type:", typeof data);
      console.log(
        "Data keys:",
        data ? Object.keys(data) : "No keys (data is null/undefined)"
      );

      // Check if data exists and has the expected structure
      if (data && typeof data === "object") {
        // Check if data has the expected structure of ApiResponse<CompatibilityResponse>
        if ("data" in data && data.data && typeof data.data === "object") {
          // The response is wrapped in ApiResponse, use data.data
          console.log("Using nested data structure:", data.data);
          setCompatibilityData(data.data as CompatibilityResponse);
        } else if (
          "success" in data &&
          "compatibility" in data &&
          "donorInfo" in data &&
          "donationEligibility" in data
        ) {
          // The response is already unwrapped CompatibilityResponse
          console.log("Using direct data structure:", data);
          setCompatibilityData(data as CompatibilityResponse);
        } else {
          console.error(
            "Unexpected data structure - missing expected fields:",
            data
          );
          setCompatibilityData({
            success: false,
            message: "خطأ في هيكل البيانات المستلمة",
            compatibility: {
              isCompatible: false,
              reason: "خطأ في هيكل البيانات",
              donorType: "",
              recipientType: "",
              compatibleDonorTypes: [],
            },
            donationEligibility: {
              isEligible: false,
              reason: "خطأ في هيكل البيانات",
            },
            donorInfo: {
              id: "",
              name: "غير متوفر",
              avatar: null,
              bloodType: "",
            },
          });
        }
      } else {
        console.error("Data is null, undefined, or not an object:", data);
        setCompatibilityData({
          success: false,
          message: "لم يتم استلام بيانات من الخادم",
          compatibility: {
            isCompatible: false,
            reason: "لم يتم استلام بيانات",
            donorType: "",
            recipientType: "",
            compatibleDonorTypes: [],
          },
          donationEligibility: {
            isEligible: false,
            reason: "لم يتم استلام بيانات",
          },
          donorInfo: {
            id: "",
            name: "غير متوفر",
            avatar: null,
            bloodType: "",
          },
        });
      }
    },
    onError: (error: Error | AxiosError) => {
      console.error("Mutation onError:", error);
      console.error("Error type:", typeof error);

      let errorMessage = "فشل في التحقق من التوافق";

      if ("response" in error && error.response) {
        console.error("Error response:", error.response);
        errorMessage =
          (error.response.data as { message?: string })?.message ||
          errorMessage;
      } else if ("message" in error) {
        console.error("Error message:", error.message);
      }

      // Set error state to display in dialog
      setCompatibilityData({
        success: false,
        message: errorMessage,
        compatibility: {
          isCompatible: false,
          reason: errorMessage,
          donorType: "",
          recipientType: "",
          compatibleDonorTypes: [],
        },
        donationEligibility: {
          isEligible: false,
          reason: errorMessage,
        },
        donorInfo: {
          id: "",
          name: "غير متوفر",
          avatar: null,
          bloodType: "",
        },
      });
    },
  });

  // Create donation mutation
  const addDonationMutation = useMutation({
    mutationFn: async (data: AddDonationForm) => {
      if (!compatibilityData?.donorInfo) {
        throw new Error("بيانات المتبرع غير متوفرة");
      }

      // Prepare donation data according to CreateDonationDto structure
      const createDonationDto = {
        caseId,
        donorId: compatibilityData.donorInfo.id,
        quantity: data.quantity * 450, // Convert bags to ml
        notes: data.notes,
        status: data.status,
        statusNotes: data.statusNotes,
      };

      // Use the correct endpoint structure: POST /case/:caseId/donor/:donorId
      return donationsApi.createDonationForCase(
        caseId,
        compatibilityData.donorInfo.id,
        createDonationDto
      );
    },
    onSuccess: (response) => {
      // Handle the response based on success flag
      if (response.success) {
        toast.success("تم إضافة التبرع بنجاح", {
          description: response.message,
        });
      } else {
        toast.warning("لم يتم إنشاء التبرع", {
          description: response.message,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["case", caseId] });
      queryClient.invalidateQueries({ queryKey: ["hospital-cases"] });
      handleClose();
    },
    onError: (error: unknown) => {
      console.error("Donation creation error:", error);

      let errorMessage = "حدث خطأ أثناء إضافة التبرع";

      // Handle different error types
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        }
      } else if (error && typeof error === "object" && "message" in error) {
        const genericError = error as { message: string };
        errorMessage = genericError.message;
      }

      toast.error("فشل في إضافة التبرع", {
        description: errorMessage,
      });
    },
  });

  const onCheckCompatibility = (data: DonorIdForm) => {
    checkCompatibilityMutation.mutate(data);
  };

  const onSubmitDonation = (data: AddDonationForm) => {
    addDonationMutation.mutate(data);
  };

  const handleScanSuccess = (donorId: string) => {
    donorForm.setValue("donorId", donorId);
    setScannerOpen(false);
    // Clear previous compatibility data when new donor is selected
    setCompatibilityData(null);
  };

  const handleClose = () => {
    setOpen(false);
    setScannerOpen(false);
    setStage("donor-check");
    setCompatibilityData(null);
    donorForm.reset({
      donorId: "",
    });
    donorForm.clearErrors();
    donationForm.reset({
      quantity: 1,
      notes: "",
      status: DonationStatus.COMPLETED,
      statusNotes: "",
    });
    donationForm.clearErrors();
  };

  const handleBackToStage1 = () => {
    setStage("donor-check");
  };

  const renderStageIndicator = () => (
    <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mb-4">
      <div className="flex items-center">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
            stage === "donor-check"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-600"
          )}
        >
          1
        </div>
        <span
          className={cn(
            "mr-2 text-sm font-medium",
            stage === "donor-check" ? "text-blue-600" : "text-slate-500"
          )}
        >
          التحقق من المتبرع
        </span>
      </div>
      <div className="w-12 h-px bg-slate-300"></div>
      <div className="flex items-center">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
            stage === "donation-form"
              ? "bg-blue-600 text-white"
              : "bg-slate-200 text-slate-500"
          )}
        >
          2
        </div>
        <span
          className={cn(
            "mr-2 text-sm font-medium",
            stage === "donation-form" ? "text-blue-600" : "text-slate-500"
          )}
        >
          تفاصيل التبرع
        </span>
      </div>
    </div>
  );

  const renderCompatibilityResult = () => {
    if (!compatibilityData) return null;

    const { compatibility, donationEligibility, donorInfo } = compatibilityData;

    return (
      <div className="space-y-2">
        {/* Donor Information Card */}
        {donorInfo.id && (
          <div className="p-3 bg-gradient-to-r from-slate-50/80 to-zinc-50/80 dark:from-slate-700/30 dark:to-zinc-700/30 rounded-lg border border-slate-200/50 dark:border-slate-600/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center">
                {donorInfo.avatar ? (
                  <Image
                    src={getAvatarUrl(donorInfo.avatar)}
                    alt={donorInfo.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-900 dark:text-slate-100 text-sm truncate">
                  {donorInfo.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {donorInfo.id}
                  </p>
                  {donorInfo.bloodType && (
                    <Badge variant="outline" className="text-xs h-5 px-2">
                      <Droplets className="w-2.5 h-2.5 mr-1" />
                      {donorInfo.bloodType}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Compatibility Information */}
        <div className="space-y-2">
          {/* Blood Compatibility Details */}
          <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              {compatibility.isCompatible ? (
                <CheckCircle className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <XCircle className="h-3.5 w-3.5 text-red-500" />
              )}
              <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                توافق فصائل الدم
              </h4>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  المتبرع:
                </span>
                <Badge variant="outline" className="text-xs h-5 px-2">
                  <Droplets className="w-2.5 h-2.5 mr-1" />
                  {compatibility.donorType}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  المريض:
                </span>
                <Badge variant="outline" className="text-xs h-5 px-2">
                  <Droplets className="w-2.5 h-2.5 mr-1" />
                  {compatibility.recipientType}
                </Badge>
              </div>

              {!compatibility.isCompatible && (
                <>
                  <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/10 rounded text-xs">
                    <p className="text-red-700 dark:text-red-300">
                      {compatibility.reason}
                    </p>
                  </div>

                  {compatibility.compatibleDonorTypes &&
                    compatibility.compatibleDonorTypes.length > 0 && (
                      <div className="mt-2">
                        <p className="text-slate-600 dark:text-slate-400 text-xs mb-1">
                          فصائل الدم المتوافقة:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {compatibility.compatibleDonorTypes.map(
                            (bloodType) => (
                              <Badge
                                key={bloodType}
                                variant="secondary"
                                className="text-xs h-5 px-2"
                              >
                                <Droplets className="w-2.5 h-2.5 mr-1" />
                                {bloodType}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </>
              )}
            </div>
          </div>

          {/* Donation Eligibility Details */}
          <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              {donationEligibility.isEligible ? (
                <CheckCircle className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Clock className="h-3.5 w-3.5 text-orange-500" />
              )}
              <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                أهلية التبرع
              </h4>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  الحالة:
                </span>
                <Badge
                  variant={
                    donationEligibility.isEligible ? "default" : "secondary"
                  }
                  className={cn(
                    "text-xs h-5 px-2",
                    donationEligibility.isEligible
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  )}
                >
                  {donationEligibility.isEligible ? "مؤهل" : "غير مؤهل"}
                </Badge>
              </div>

              {donationEligibility.daysSinceLastDonation !== null &&
                donationEligibility.daysSinceLastDonation !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      آخر تبرع:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {donationEligibility.daysSinceLastDonation} يوم
                    </span>
                  </div>
                )}

              {donationEligibility.minimumWaitDays && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    فترة الانتظار:
                  </span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {donationEligibility.minimumWaitDays} يوم
                  </span>
                </div>
              )}

              {donationEligibility.nextEligibleDate && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    التاريخ المتاح:
                  </span>
                  <span className="font-medium text-orange-600 dark:text-orange-400">
                    {new Date(
                      donationEligibility.nextEligibleDate
                    ).toLocaleDateString("ar-EG")}
                  </span>
                </div>
              )}

              <div className="mt-2 p-2 bg-slate-50 dark:bg-slate-700/30 rounded text-xs">
                <p
                  className={cn(
                    donationEligibility.isEligible
                      ? "text-slate-700 dark:text-slate-300"
                      : "text-orange-700 dark:text-orange-300"
                  )}
                >
                  {donationEligibility.reason}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStage1 = () => (
    <ScrollArea className="h-[calc(60vh)] pr-4">
      <div className="space-y-3">
        {/* Stage Indicator */}
        {renderStageIndicator()}

        {/* Donor ID Form */}
        <div className="space-y-3">
          <Form {...donorForm}>
            <form
              onSubmit={donorForm.handleSubmit(onCheckCompatibility)}
              className="space-y-3"
            >
              <FormField
                control={donorForm.control}
                name="donorId"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      معرف المتبرع
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="أدخل معرف المتبرع"
                          {...field}
                          className="h-9 text-sm"
                          onChange={(e) =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setScannerOpen(true)}
                        className="h-9 px-3 shrink-0"
                      >
                        <Scan className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={checkCompatibilityMutation.isPending}
                className="w-full h-9 text-sm"
              >
                {checkCompatibilityMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    جاري التحقق...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    التحقق من المتبرع
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Compatibility Results */}
        {compatibilityData && (
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
            {renderCompatibilityResult()}
          </div>
        )}

        {/* Action Buttons */}
        {compatibilityData && (
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleClose}
              variant="outline"
              size="sm"
              className="flex-1 h-9 text-sm"
            >
              إلغاء
            </Button>
            <Button
              onClick={() => setStage("donation-form")}
              disabled={
                !compatibilityData.success ||
                !compatibilityData.compatibility.isCompatible ||
                !compatibilityData.donationEligibility.isEligible
              }
              size="sm"
              className="flex-1 h-9 text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              <ArrowLeft className="h-4 w-4 ml-1" />
              متابعة التبرع
            </Button>
          </div>
        )}
      </div>
    </ScrollArea>
  );

  const renderStage2 = () => (
    <div className="space-y-4">
      {/* Donor Summary */}
      {compatibilityData?.donorInfo && (
        <div className="p-3 bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200/50 dark:border-green-800/30">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium text-green-800 dark:text-green-200">
                المتبرع: {compatibilityData.donorInfo.name}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                فصيلة الدم: {compatibilityData.donorInfo.bloodType} →{" "}
                {bloodType}
              </p>
            </div>
          </div>
        </div>
      )}

      <Separator />

      <Form {...donationForm}>
        <form
          onSubmit={donationForm.handleSubmit(onSubmitDonation)}
          className="space-y-4"
        >
          {/* Quantity and Status */}
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={donationForm.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    عدد الأكياس *
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="1"
                        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-300 dark:border-slate-600 rounded-lg h-10 text-center text-lg font-bold pr-8"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <Droplets className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                  </FormControl>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    كيس = 450 مل
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={donationForm.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    الحالة
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-300 dark:border-slate-600 rounded-lg h-10">
                        <SelectValue placeholder="اختر الحالة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Notes */}
          <FormField
            control={donationForm.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  ملاحظات
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="ملاحظات حول التبرع..."
                    className="min-h-[60px] bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-300 dark:border-slate-600 rounded-lg resize-none text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status Notes (Conditional) */}
          {donationForm.watch("status") &&
            [DonationStatus.REFUSED, DonationStatus.REFUSED].includes(
              donationForm.watch("status") as DonationStatus
            ) && (
              <FormField
                control={donationForm.control}
                name="statusNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      سبب الرفض/الإلغاء
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="اذكر السبب..."
                        className="min-h-[60px] bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-300 dark:border-slate-600 rounded-lg resize-none text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleBackToStage1}
              className="flex-1 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              العودة
            </Button>
            <Button
              type="submit"
              disabled={addDonationMutation.isPending}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {addDonationMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  جاري الإضافة...
                </div>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  إضافة التبرع
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children || (
            <Button className="gap-2" variant="outline">
              <Plus className="h-4 w-4" />
              إضافة تبرع
            </Button>
          )}
        </DialogTrigger>

        <DialogContent size="xl" className="" dir="rtl">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-rose-500 text-white rounded-lg shadow-lg">
                <Droplets className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  إضافة تبرع جديد
                </DialogTitle>
                <DialogDescription className="text-slate-600 dark:text-slate-400 text-sm">
                  {stage === "donor-check"
                    ? "التحقق من توافق المتبرع"
                    : "إدخال تفاصيل التبرع"}
                </DialogDescription>
              </div>
            </div>

            {/* Blood Type Badge */}
            <div className="flex items-center justify-center">
              <Badge
                variant="outline"
                className="text-sm font-semibold px-4 py-2 bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200/50 dark:from-red-900/10 dark:to-rose-900/10 dark:text-red-300 dark:border-red-700/30 shadow-sm backdrop-blur-sm"
              >
                <Droplets className="w-4 h-4 mr-2" />
                فصيلة دم المريض: {bloodType}
              </Badge>
            </div>

            {/* Stage Content */}
            {stage === "donor-check" ? renderStage1() : renderStage2()}

            {/* Cancel Footer */}
            <DialogFooter className="gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all duration-300"
              >
                إلغاء
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* QR Scanner Modal */}
      <BarcodeScanner
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />
    </>
  );
}
