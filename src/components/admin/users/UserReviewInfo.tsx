import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

interface ReviewInfo {
  canApprove: boolean;
  canReject: boolean;
  requiredFields?: string[];
  reviewedAt: string;
}

interface UserReviewInfoProps {
  reviewInfo: ReviewInfo;
}

export function UserReviewInfo({ reviewInfo }: UserReviewInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          معلومات المراجعة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
              يمكن الاعتماد
            </label>
            <p className="font-medium">
              {reviewInfo.canApprove ? "نعم" : "لا"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
              يمكن الرفض
            </label>
            <p className="font-medium">{reviewInfo.canReject ? "نعم" : "لا"}</p>
          </div>
        </div>

        {reviewInfo.requiredFields && reviewInfo.requiredFields.length > 0 && (
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
              الحقول المطلوبة
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {reviewInfo.requiredFields.map((field, index) => (
                <Badge key={index} variant="outline">
                  {field}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 pt-2 border-t">
          تمت المراجعة في:{" "}
          {new Date(reviewInfo.reviewedAt).toLocaleString("ar-SA")}
        </div>
      </CardContent>
    </Card>
  );
}
