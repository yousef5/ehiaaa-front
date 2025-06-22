"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePublishCaseToFacebook } from "@/hooks/useCases";
import type { PublishCaseToFacebookDto } from "@/lib/cases-api";
import { AlertCircle, Facebook, Send } from "lucide-react";
import { useState } from "react";

interface PublishFacebookDialogProps {
  caseId: string;
  caseTitle: string;
  disabled?: boolean;
}

export function PublishFacebookDialog({
  caseId,
  caseTitle,
  disabled = false,
}: PublishFacebookDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<PublishCaseToFacebookDto>({
    accessToken: "",
    pageId: "",
    websiteUrl: "",
    includeHospitalContact: true,
    customMessage: "",
  });

  const { mutate: publishToFacebook, isPending } = usePublishCaseToFacebook();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Remove empty fields
    const cleanData = Object.fromEntries(
      Object.entries(formData).filter(([, value]) => value !== "")
    );

    publishToFacebook(
      { caseId, publishOptions: cleanData },
      {
        onSuccess: () => {
          setOpen(false);
          setFormData({
            accessToken: "",
            pageId: "",
            websiteUrl: "",
            includeHospitalContact: true,
            customMessage: "",
          });
        },
      }
    );
  };

  const handleInputChange =
    (field: keyof PublishCaseToFacebookDto) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      includeHospitalContact: checked,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20"
        >
          <Facebook className="h-4 w-4" />
          نشر على فيسبوك
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Facebook className="h-5 w-5 text-blue-600" />
            نشر الحالة على فيسبوك
          </DialogTitle>
          <DialogDescription className="text-right">
            نشر الحالة &quot;{caseTitle}&quot; على صفحة فيسبوك لزيادة الوعي وجذب
            المتبرعين
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Info Card */}
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                معلومات مهمة
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
              <p>
                • يمكنك ترك الحقول فارغة لاستخدام الإعدادات الافتراضية من النظام
              </p>
              <p>• تأكد من أن لديك الصلاحيات اللازمة لنشر المحتوى على الصفحة</p>
              <p>• سيتم تنسيق المحتوى تلقائياً ليناسب منصة فيسبوك</p>
            </CardContent>
          </Card>

          {/* Facebook Credentials */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">إعدادات فيسبوك</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accessToken">رمز الوصول (Access Token)</Label>
                <Input
                  id="accessToken"
                  type="password"
                  placeholder="اختياري - سيستخدم الافتراضي إذا لم يتم التحديد"
                  value={formData.accessToken}
                  onChange={handleInputChange("accessToken")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pageId">معرف الصفحة (Page ID)</Label>
                <Input
                  id="pageId"
                  placeholder="اختياري - سيستخدم الافتراضي إذا لم يتم التحديد"
                  value={formData.pageId}
                  onChange={handleInputChange("pageId")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteUrl">رابط الموقع</Label>
              <Input
                id="websiteUrl"
                type="url"
                placeholder="https://example.com (اختياري)"
                value={formData.websiteUrl}
                onChange={handleInputChange("websiteUrl")}
              />
            </div>
          </div>

          {/* Publish Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">خيارات النشر</h3>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="includeContact"
                checked={formData.includeHospitalContact}
                onCheckedChange={handleCheckboxChange}
              />
              <Label
                htmlFor="includeContact"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                تضمين معلومات الاتصال بالمستشفى
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customMessage">رسالة مخصصة (اختياري)</Label>
              <Textarea
                id="customMessage"
                placeholder="أضف رسالة شخصية للمنشور..."
                value={formData.customMessage}
                onChange={handleInputChange("customMessage")}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  جاري النشر...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  نشر على فيسبوك
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
