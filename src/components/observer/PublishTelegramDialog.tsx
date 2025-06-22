"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePublishCaseToTelegram } from "@/hooks/useCases";
import type { PublishCaseToTelegramDto } from "@/lib/cases-api";
import { AlertCircle, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

interface PublishTelegramDialogProps {
  caseId: string;
  caseTitle: string;
  disabled?: boolean;
}

export function PublishTelegramDialog({
  caseId,
  caseTitle,
  disabled = false,
}: PublishTelegramDialogProps) {
  const [open, setOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const { mutate: publishToTelegram, isPending } = usePublishCaseToTelegram();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const publishOptions: PublishCaseToTelegramDto = {
      customMessage: customMessage || undefined,
      includeContactInfo: true,
      includeStatistics: true,
      includeCallToAction: true,
    };

    publishToTelegram(
      { caseId, publishOptions },
      {
        onSuccess: () => {
          setOpen(false);
          setCustomMessage("");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          className="gap-2 border-cyan-200 text-cyan-600 hover:bg-cyan-50 dark:border-cyan-800 dark:text-cyan-400 dark:hover:bg-cyan-900/20"
        >
          <MessageCircle className="h-4 w-4" />
          نشر على تليجرام
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MessageCircle className="h-5 w-5 text-cyan-600" />
            نشر على تليجرام
          </DialogTitle>
          <DialogDescription className="text-right">
            نشر الحالة &quot;{caseTitle}&quot; على قناة تليجرام
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Info Card */}
          <Card className="bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-cyan-600" />
                سيتم نشر الحالة بجميع التفاصيل على القناة
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Custom Message */}
          <div className="space-y-2">
            <Label htmlFor="customMessage">رسالة إضافية (اختياري)</Label>
            <Textarea
              id="customMessage"
              placeholder="🚨 حالة طارئة: نحتاج مساعدتكم لإنقاذ حياة!"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              الحد الأقصى: 500 حرف
            </p>
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
              className="gap-2 bg-cyan-600 hover:bg-cyan-700"
            >
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  جاري النشر...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  نشر على تليجرام
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
