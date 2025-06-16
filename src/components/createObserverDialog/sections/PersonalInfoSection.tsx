import { User, Phone } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateObserverFormData } from "../schema";

interface PersonalInfoSectionProps {
  form: UseFormReturn<CreateObserverFormData>;
}

export function PersonalInfoSection({ form }: PersonalInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <User className="h-4 w-4 text-blue-500" />
        <h3 className="font-medium">المعلومات الشخصية</h3>
      </div>

      {/* Name Field */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <User className="h-4 w-4" />
              الاسم الكامل *
            </FormLabel>
            <FormControl>
              <Input
                placeholder="أدخل الاسم الكامل"
                {...field}
                className="text-right"
                dir="rtl"
                autoComplete="name"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Phone Field */}
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              رقم الهاتف *
            </FormLabel>
            <FormControl>
              <Input
                placeholder="+201234567890 أو 01234567890"
                {...field}
                className="text-right"
                dir="rtl"
                autoComplete="tel"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Identity Number Field */}
      <FormField
        control={form.control}
        name="identityNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>رقم الهوية *</FormLabel>
            <FormControl>
              <Input
                placeholder="أدخل رقم الهوية (14 رقم)"
                {...field}
                className="text-right"
                dir="rtl"
                maxLength={14}
                autoComplete="off"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
