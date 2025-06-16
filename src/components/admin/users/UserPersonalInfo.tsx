import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Cake,
  Copy,
  Droplets,
  Eye,
  EyeOff,
  FileText,
  LucideIcon,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";

// Age calculation function
function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

// Format birthdate for display
function formatBirthDate(birthDate: string): string {
  return new Date(birthDate).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface UserPersonalInfoProps {
  user: {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    bloodType?: string;
    identityNumber?: string;
    taxNumber?: string;
    commercialRecord?: string;
    address: string;
    city?: {
      nameAr: string;
      governorate?: {
        nameAr: string;
      };
    };
  };
}

// Enhanced Info Field Component
const InfoField = ({
  label,
  value,
  icon: Icon,
  copyable = false,
  sensitive = false,
  iconColor = "text-gray-500 dark:text-gray-400",
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
  copyable?: boolean;
  sensitive?: boolean;
  iconColor?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(!sensitive);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="group relative">
      <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
        {label}
      </label>
      <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-800/30 border border-gray-200/40 dark:border-gray-700/40 transition-all duration-200 hover:shadow-sm hover:border-gray-300/60 dark:hover:border-gray-600/60">
        {Icon && <Icon className={`h-4 w-4 ${iconColor} flex-shrink-0`} />}

        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 dark:text-white truncate text-sm">
            {sensitive && !isVisible ? "••••••••••" : value}
          </p>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {sensitive && (
            <button
              onClick={toggleVisibility}
              className="p-1.5 rounded hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-200"
              title={isVisible ? "إخفاء" : "إظهار"}
            >
              {isVisible ? (
                <EyeOff className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
              ) : (
                <Eye className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          )}

          {copyable && (
            <button
              onClick={handleCopy}
              className="p-1.5 rounded hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-200"
              title="نسخ"
            >
              {copied ? (
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  ✓
                </span>
              ) : (
                <Copy className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export function UserPersonalInfo({ user }: UserPersonalInfoProps) {
  const age = calculateAge(user.birthDate);
  const formattedBirthDate = formatBirthDate(user.birthDate);

  return (
    <div className="max-w-4xl mx-auto p-2">
      <Card className="overflow-hidden shadow-xl border-0 bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-900/80 dark:to-gray-900 backdrop-blur-sm p-0">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-950/10 dark:via-transparent dark:to-purple-950/10 pointer-events-none" />

        <CardHeader className="relative z-10 pb-4 pt-5">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 shadow-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent font-bold">
              المعلومات الشخصية
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10 space-y-4 pb-5">
          {/* Main Information Grid */}
          <div className="grid grid-cols-2 gap-3">
            <InfoField
              label="الاسم الكامل"
              value={user.name}
              icon={User}
              copyable={true}
              iconColor="text-blue-500 dark:text-blue-400"
            />

            <InfoField
              label="البريد الإلكتروني"
              value={user.email}
              icon={Mail}
              copyable={true}
              iconColor="text-green-500 dark:text-green-400"
            />

            <InfoField
              label="رقم الهاتف"
              value={user.phone}
              icon={Phone}
              copyable={true}
              iconColor="text-orange-500 dark:text-orange-400"
            />

            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <InfoField
                        label="العمر"
                        value={`${age} سنة`}
                        icon={Cake}
                        iconColor="text-pink-500 dark:text-pink-400"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1.5 rounded-lg shadow-lg text-sm"
                  >
                    <p>تاريخ الميلاد: {formattedBirthDate}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {user.bloodType && (
              <InfoField
                label="فصيلة الدم"
                value={user.bloodType}
                icon={Droplets}
                iconColor="text-red-500 dark:text-red-400"
              />
            )}

            {user.identityNumber && (
              <InfoField
                label="رقم الهوية"
                value={user.identityNumber}
                icon={FileText}
                copyable={true}
                sensitive={true}
                iconColor="text-indigo-500 dark:text-indigo-400"
              />
            )}

            {user.taxNumber && (
              <InfoField
                label="الرقم الضريبي"
                value={user.taxNumber}
                icon={FileText}
                copyable={true}
                sensitive={true}
                iconColor="text-yellow-500 dark:text-yellow-400"
              />
            )}

            {user.commercialRecord && (
              <InfoField
                label="السجل التجاري"
                value={user.commercialRecord}
                icon={FileText}
                copyable={true}
                iconColor="text-teal-500 dark:text-teal-400"
              />
            )}
          </div>

          {/* Address Section */}
          <Separator className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-4" />

          <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-800/30 border border-gray-200/40 dark:border-gray-700/40">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 shadow-md">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  العنوان الكامل
                </label>
                <p className="font-medium text-gray-900 dark:text-white text-sm leading-relaxed">
                  {user.address}
                </p>
                {user.city && (
                  <div className="flex items-center gap-2 pt-1">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      {user.city.nameAr}
                      {user.city.governorate &&
                        ` - ${user.city.governorate.nameAr}`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
