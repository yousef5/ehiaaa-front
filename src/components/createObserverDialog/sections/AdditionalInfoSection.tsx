import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar, Droplets } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { AccessibleSelect } from "../components/AccessibleSelect";
import { BLOOD_TYPES, CreateObserverFormData } from "../schema";

interface AdditionalInfoSectionProps {
  form: UseFormReturn<CreateObserverFormData>;
}

// Convert BLOOD_TYPES to the format expected by AccessibleSelect
const bloodTypeOptions = BLOOD_TYPES.map((type) => ({
  value: type.value,
  label: type.label,
}));

export function AdditionalInfoSection({ form }: AdditionalInfoSectionProps) {
  // Calculate max date (18 years ago) and min date (65 years ago)
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];
  const minDate = new Date(
    today.getFullYear() - 65,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <Calendar className="h-4 w-4 text-purple-500" />
        <h3 className="font-medium">معلومات إضافية</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Birth Date Field */}
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                تاريخ الميلاد *
              </FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  className="text-right"
                  dir="rtl"
                  max={maxDate}
                  min={minDate}
                />
              </FormControl>
              <div className="text-xs text-muted-foreground">
                العمر المسموح: 18-65 سنة
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Blood Type Field */}
        <FormField
          control={form.control}
          name="bloodType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                فصيلة الدم *
              </FormLabel>
              <AccessibleSelect
                options={bloodTypeOptions}
                value={field.value}
                onValueChange={field.onChange}
                placeholder="اختر فصيلة الدم"
                className="text-right"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
