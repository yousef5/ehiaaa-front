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
import { casesApi, type CaseData } from "@/lib/cases-api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle,
  FileText,
  Heart,
  Loader2,
  Upload,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Blood Types - Updated to match backend enum values
const BLOOD_TYPES = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "Unknown", label: "غير معروف" },
];

// Donation Types - Updated to match backend enum values
const DONATION_TYPES = [
  { value: "whole_blood", label: "دم كامل" },
  { value: "plasma", label: "بلازما" },
  { value: "platelets", label: "صفائح دموية" },
];

// Validation schema matching the DTO
const createCaseSchema = z.object({
  patientName: z.string().min(1, "اسم المريض مطلوب"),
  patientAge: z
    .number()
    .min(0, "العمر يجب أن يكون أكبر من 0")
    .max(150, "العمر يجب أن يكون أقل من 150"),
  bloodType: z.string().min(1, "فصيلة الدم مطلوبة"),
  donationType: z.string().min(1, "نوع التبرع مطلوب"),
  bagsNeeded: z.number().min(1, "عدد الأكياس يجب أن يكون أكبر من 0"),
  description: z.string().optional(),
  reportDocument: z
    .instanceof(File)
    .refine(
      (file) => file.type === "application/pdf",
      "يجب أن يكون الملف بصيغة PDF"
    ),
});

type CreateCaseForm = z.infer<typeof createCaseSchema>;

interface CreateCaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateCaseDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateCaseDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const form = useForm<CreateCaseForm>({
    resolver: zodResolver(createCaseSchema),
    defaultValues: {
      patientName: "",
      patientAge: 0,
      bloodType: "",
      donationType: "",
      bagsNeeded: 1,
      description: "",
    },
  });

  // Auto-reset when dialog closes
  useEffect(() => {
    if (!open) {
      form.reset({
        patientName: "",
        patientAge: 0,
        bloodType: "",
        donationType: "",
        bagsNeeded: 1,
        description: "",
        reportDocument: undefined,
      });
      form.clearErrors();
      setUploadedFile(null);
      // Reset the file input
      const fileInput = document.getElementById(
        "report-document"
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    }
  }, [open, form]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("يجب أن يكون الملف بصيغة PDF");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("حجم الملف يجب أن يكون أقل من 10 ميجابايت");
        return;
      }
      setUploadedFile(file);
      form.setValue("reportDocument", file);
      form.clearErrors("reportDocument");
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    form.setValue("reportDocument", null as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    // Reset the file input
    const fileInput = document.getElementById(
      "report-document"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (data: CreateCaseForm) => {
    if (!uploadedFile) {
      toast.error("يرجى رفع التقرير الطبي");
      return;
    }

    setIsLoading(true);

    try {
      const caseData: CaseData = {
        patientName: data.patientName,
        patientAge: data.patientAge,
        bloodType: data.bloodType,
        donationType: data.donationType,
        bagsNeeded: data.bagsNeeded,
        description: data.description,
        reportDocument: uploadedFile,
      };

      const response = await casesApi.createCase(caseData);

      toast.success("تم إنشاء الحالة بنجاح", {
        description: response.message,
      });

      // Reset form and close dialog
      form.reset();
      setUploadedFile(null);
      onOpenChange(false);
      onSuccess?.();
    } catch (error: unknown) {
      console.error("Error creating case:", error);

      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "حدث خطأ أثناء إنشاء الحالة";
      toast.error("فشل في إنشاء الحالة", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      form.reset({
        patientName: "",
        patientAge: 0,
        bloodType: "",
        donationType: "",
        bagsNeeded: 1,
        description: "",
        reportDocument: undefined,
      });
      form.clearErrors();
      setUploadedFile(null);
      // Reset the file input
      const fileInput = document.getElementById(
        "report-document"
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-6 w-6 text-red-600" />
            إنشاء حالة طبية جديدة
          </DialogTitle>
          <DialogDescription>
            قم بإنشاء حالة طبية جديدة تحتاج للتبرع بالدم. يرجى ملء جميع البيانات
            المطلوبة ورفع التقرير الطبي.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Patient Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">بيانات المريض</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Patient Name */}
                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المريض *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل اسم المريض"
                          {...field}
                          className="text-right"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Patient Age */}
                <FormField
                  control={form.control}
                  name="patientAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عمر المريض *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="150"
                          placeholder="أدخل عمر المريض"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                          className="text-right"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Blood Type */}
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>فصيلة الدم *</FormLabel>
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
                          {BLOOD_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Donation Type */}
                <FormField
                  control={form.control}
                  name="donationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نوع التبرع المطلوب *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نوع التبرع" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DONATION_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bags Needed - Full Width */}
              <FormField
                control={form.control}
                name="bagsNeeded"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عدد الأكياس المطلوبة *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="أدخل عدد الأكياس"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 1)
                        }
                        className="text-right max-w-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف الحالة (اختياري)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="أدخل تفاصيل إضافية عن الحالة..."
                        rows={3}
                        {...field}
                        className="text-right resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Document Upload Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">التقرير الطبي</h3>
              </div>

              <div className="space-y-4">
                {!uploadedFile ? (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <Label htmlFor="report-document" className="cursor-pointer">
                      <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        اضغط لرفع التقرير الطبي
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        ملف PDF فقط، حد أقصى 10 ميجابايت
                      </p>
                    </Label>
                    <Input
                      id="report-document"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-300">
                          {uploadedFile.name}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)}{" "}
                          ميجابايت
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {form.formState.errors.reportDocument && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{form.formState.errors.reportDocument.message}</span>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="gap-2 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                إلغاء
              </Button>
              <Button type="submit" disabled={isLoading || !uploadedFile}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin ml-2" />
                    جاري الإنشاء...
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 ml-2" />
                    إنشاء الحالة
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
