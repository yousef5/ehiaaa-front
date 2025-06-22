"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { casesApi, CaseStatus } from "@/lib/cases-api";
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Edit3,
  Shield,
  XCircle,
} from "lucide-react";

const updateStatusSchema = z.object({
  status: z.enum([
    CaseStatus.PENDING,
    CaseStatus.ACTIVE,
    CaseStatus.CLOSED,
    CaseStatus.REJECTED,
  ]),
  description: z
    .string()
    .min(10, "يجب أن يكون الوصف 10 أحرف على الأقل")
    .max(500, "يجب ألا يزيد الوصف عن 500 حرف"),
});

type UpdateStatusForm = z.infer<typeof updateStatusSchema>;

interface UpdateCaseStatusDialogProps {
  caseId: string;
  currentStatus: string;
  children?: React.ReactNode;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case CaseStatus.ACTIVE:
      return <Activity className="h-4 w-4" />;
    case CaseStatus.CLOSED:
      return <CheckCircle className="h-4 w-4" />;
    case CaseStatus.REJECTED:
      return <XCircle className="h-4 w-4" />;
    case CaseStatus.PENDING:
      return <Clock className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getStatusLabel = (status: string) => {
  const statusMap: Record<string, string> = {
    [CaseStatus.PENDING]: "معلق",
    [CaseStatus.ACTIVE]: "نشط",
    [CaseStatus.CLOSED]: "مغلق",
    [CaseStatus.REJECTED]: "مرفوض",
  };
  return statusMap[status] || status;
};

const getStatusBadgeClass = (status: string) => {
  const classMap: Record<string, string> = {
    [CaseStatus.PENDING]:
      "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border-amber-200/50 dark:from-amber-900/10 dark:to-orange-900/10 dark:text-amber-300 dark:border-amber-700/30",
    [CaseStatus.ACTIVE]:
      "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200/50 dark:from-emerald-900/10 dark:to-teal-900/10 dark:text-emerald-300 dark:border-emerald-700/30",
    [CaseStatus.CLOSED]:
      "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200/50 dark:from-blue-900/10 dark:to-indigo-900/10 dark:text-blue-300 dark:border-blue-700/30",
    [CaseStatus.REJECTED]:
      "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200/50 dark:from-red-900/10 dark:to-rose-900/10 dark:text-red-300 dark:border-red-700/30",
  };
  return (
    classMap[status] ||
    "bg-gradient-to-r from-slate-50 to-zinc-50 text-slate-700 border-slate-200/50 dark:from-slate-900/10 dark:to-zinc-900/10 dark:text-slate-300 dark:border-slate-700/30"
  );
};

export function UpdateCaseStatusDialog({
  caseId,
  currentStatus,
  children,
}: UpdateCaseStatusDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<UpdateStatusForm>({
    resolver: zodResolver(updateStatusSchema),
    defaultValues: {
      status: currentStatus as CaseStatus,
      description: "",
    },
  });

  // Auto-reset when dialog closes
  useEffect(() => {
    if (!open) {
      form.reset({
        status: currentStatus as CaseStatus,
        description: "",
      });
      form.clearErrors();
    }
  }, [open, form, currentStatus]);

  const updateStatusMutation = useMutation({
    mutationFn: async (data: UpdateStatusForm) => {
      return casesApi.updateCaseStatusByObserver(
        caseId,
        data.status,
        data.description
      );
    },
    onSuccess: () => {
      toast.success("تم تحديث حالة الطلب بنجاح");
      queryClient.invalidateQueries({ queryKey: ["case", caseId] });
      queryClient.invalidateQueries({ queryKey: ["observer-cases"] });
      setOpen(false);
      form.reset({
        status: currentStatus as CaseStatus,
        description: "",
      });
      form.clearErrors();
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "حدث خطأ أثناء تحديث حالة الطلب";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: UpdateStatusForm) => {
    updateStatusMutation.mutate(data);
  };

  const handleClose = () => {
    setOpen(false);
    form.reset({
      status: currentStatus as CaseStatus,
      description: "",
    });
    form.clearErrors();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105 rounded-xl shadow-md"
          >
            <Edit3 className="h-4 w-4" />
            تحديث الحالة
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 shadow-2xl rounded-2xl"
        dir="rtl"
      >
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                تحديث حالة الطلب
              </DialogTitle>
              <DialogDescription className="text-slate-600 dark:text-slate-400 mt-1">
                قم بتحديث حالة الطلب وإضافة وصف للتغيير
              </DialogDescription>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-slate-50/80 to-zinc-50/80 dark:from-slate-700/30 dark:to-zinc-700/30 rounded-xl border border-slate-200/50 dark:border-slate-600/30">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                الحالة الحالية:
              </span>
              <Badge
                variant="outline"
                className={`text-sm font-semibold px-3 py-1 shadow-sm backdrop-blur-sm ${getStatusBadgeClass(
                  currentStatus
                )}`}
              >
                {getStatusIcon(currentStatus)}
                <span className="mr-2">{getStatusLabel(currentStatus)}</span>
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    الحالة الجديدة
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-300 dark:border-slate-600 rounded-xl h-12">
                        <SelectValue placeholder="اختر الحالة الجديدة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-xl">
                      {Object.values(CaseStatus).map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                          className="focus:bg-slate-50 dark:focus:bg-slate-800 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {getStatusIcon(status)}
                            <span>{getStatusLabel(status)}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    وصف التغيير
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="اشرح سبب تغيير حالة الطلب..."
                      className="min-h-[120px] bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-300 dark:border-slate-600 rounded-xl resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300"
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={updateStatusMutation.isPending}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg rounded-xl transition-all duration-300 hover:scale-105"
              >
                {updateStatusMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    جاري التحديث...
                  </div>
                ) : (
                  "تحديث الحالة"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
