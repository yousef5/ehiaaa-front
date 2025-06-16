import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Building2, Users } from "lucide-react";

interface UserTypeSelectionProps {
  onSelectUserType: (type: "donor" | "hospital") => void;
  onBackToLogin: () => void;
}

export function UserTypeSelection({
  onSelectUserType,
  onBackToLogin,
}: UserTypeSelectionProps) {
  return (
    <CardContent className="px-8 pb-8">
      <div className="space-y-4">
        {/* Donor Registration Option */}
        <Card
          className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-red-200 dark:hover:border-red-800"
          onClick={() => onSelectUserType("donor")}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  متبرع بالدم
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  انضم كمتبرع وساهم في إنقاذ الأرواح من خلال التبرع بالدم
                </p>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        {/* Hospital Registration Option */}
        <Card
          className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-blue-200 dark:hover:border-blue-800"
          onClick={() => onSelectUserType("hospital")}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  مستشفى أو مركز طبي
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  سجل مؤسستك الطبية للحصول على الدم والمنتجات الطبية
                </p>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Back to Login */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          لديك حساب بالفعل؟{" "}
          <Button
            variant="link"
            className="p-0 h-auto text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
            onClick={onBackToLogin}
          >
            <ArrowLeft className="h-4 w-4 ml-1" />
            تسجيل الدخول
          </Button>
        </p>
      </div>
    </CardContent>
  );
}
