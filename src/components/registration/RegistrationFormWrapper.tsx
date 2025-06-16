import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface RegistrationFormWrapperProps {
  children: ReactNode;
  onBackToSelection: () => void;
  onBackToLogin: () => void;
}

export function RegistrationFormWrapper({
  children,
  onBackToSelection,
  onBackToLogin,
}: RegistrationFormWrapperProps) {
  return (
    <CardContent className="px-8 pb-8">
      {children}

      {/* Navigation */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="outline"
          onClick={onBackToSelection}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          العودة لاختيار نوع الحساب
        </Button>

        <Button
          variant="link"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          onClick={onBackToLogin}
        >
          العودة لتسجيل الدخول
        </Button>
      </div>
    </CardContent>
  );
}
