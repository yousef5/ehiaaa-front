import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>;
}

export class ObserverDialogErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Observer Dialog Error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent error={this.state.error} retry={this.handleRetry} />
      );
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({
  error,
  retry,
}: {
  error?: Error;
  retry: () => void;
}) {
  return (
    <div className="p-6 text-center" dir="rtl">
      <Alert className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-right">
          <strong>حدث خطأ غير متوقع</strong>
          <br />
          {error?.message || "نعتذر، حدث خطأ أثناء تحميل النموذج"}
        </AlertDescription>
      </Alert>

      <Button onClick={retry} variant="outline" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        إعادة المحاولة
      </Button>
    </div>
  );
}
