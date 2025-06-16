import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ReactNode } from "react";

interface RegistrationLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function RegistrationLayout({
  children,
  showFooter = true,
}: RegistrationLayoutProps) {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 flex items-center justify-center p-4"
      dir="rtl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] [background-size:24px_24px]" />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-2xl relative z-10">
        <Card className="border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-blue-500/10 dark:shadow-blue-400/5 rounded-2xl overflow-hidden">
          {/* App Logo */}
          <div className="flex justify-center mt-8 mb-4">
            <div className="relative w-20 h-20 mb-2">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="إحياء"
                  width={44}
                  height={44}
                  className="w-16 h-16 object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {children}
        </Card>

        {/* Brand Footer */}
        {showFooter && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              كن جزءاً من مجتمع إنقاذ الأرواح
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
