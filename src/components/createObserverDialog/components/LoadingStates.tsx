import { Loader2, MapPin, Droplets } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function GovernorateLoadingSkeleton() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-9 w-full" />
    </div>
  );
}

export function FormLoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex items-center gap-3 text-muted-foreground" dir="rtl">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>جاري التحميل...</span>
      </div>
    </div>
  );
}

export function BloodTypeLoadingSkeleton() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Droplets className="h-4 w-4 text-muted-foreground" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-9 w-full" />
    </div>
  );
}

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({
  message = "جاري التحميل...",
  size = "md",
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div
      className="flex items-center justify-center gap-2 text-muted-foreground"
      dir="rtl"
    >
      <Loader2 className={`${sizeClasses[size]} animate-spin`} />
      <span className="text-sm">{message}</span>
    </div>
  );
}
