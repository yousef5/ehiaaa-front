import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { City, Governorate } from "@/types/observer";
import { Building2, MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateObserverFormData } from "../schema";

interface LocationSectionProps {
  form: UseFormReturn<CreateObserverFormData>;
  governorates?: Governorate[];
  selectedGovernorate?: Governorate;
  isLoadingGovernorates: boolean;
  onGovernorateChange: (value: string) => void;
  onCityChange?: () => void;
}

// Extend Governorate type for local use if needed
interface ExtendedGovernorate extends Governorate {
  cities?: City[];
}

export function LocationSection({
  form,
  governorates,
  selectedGovernorate,
  isLoadingGovernorates,
  onGovernorateChange,
  onCityChange,
}: LocationSectionProps) {
  const [governorateSearchTerm, setGovernorateSearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");

  // Filter governorates based on search term
  const filteredGovernorates =
    governorates?.filter((gov) =>
      gov.nameAr.toLowerCase().includes(governorateSearchTerm.toLowerCase())
    ) || [];

  // Filter cities based on search term
  const filteredCities =
    (selectedGovernorate as ExtendedGovernorate)?.cities
      ?.filter((city) =>
        city.nameAr.toLowerCase().includes(citySearchTerm.toLowerCase())
      )
      .sort((a, b) => a.nameAr.localeCompare(b.nameAr, "ar")) || [];

  // Reset city search when governorate changes
  useEffect(() => {
    setCitySearchTerm("");
  }, [selectedGovernorate]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <MapPin className="h-4 w-4 text-orange-500" />
        <h3 className="font-medium">معلومات الموقع</h3>
      </div>

      {/* Governorate Field */}
      <FormField
        control={form.control}
        name="governorateId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              المحافظة *sdfasdf
            </FormLabel>
            <div className="space-y-2">
              {/* Search input */}
              <div className="relative">
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="ابحث عن المحافظة..."
                  value={governorateSearchTerm}
                  onChange={(e) => setGovernorateSearchTerm(e.target.value)}
                  className="pr-8 text-right"
                  dir="rtl"
                />
              </div>

              {/* Governorates list */}
              <div className="max-h-48 overflow-y-auto border rounded-md bg-white dark:bg-gray-950 shadow-sm">
                {isLoadingGovernorates ? (
                  <div className="p-3 text-center text-gray-500">
                    جاري التحميل...
                  </div>
                ) : filteredGovernorates.length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {filteredGovernorates.map((governorate) => (
                      <div
                        key={governorate.id}
                        className={`p-2.5 cursor-pointer text-right hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                          field.value === governorate.id
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                            : ""
                        }`}
                        onClick={() => {
                          onGovernorateChange(governorate.id);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {(governorate as ExtendedGovernorate).cities
                              ?.length || 0}{" "}
                            مدينة
                          </span>
                          <span>{governorate.nameAr}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-gray-500">
                    لا توجد محافظات مطابقة للبحث
                  </div>
                )}
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* City Field */}
      {selectedGovernorate && (
        <FormField
          control={form.control}
          name="cityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-500" />
                المدينة *
              </FormLabel>
              <div className="space-y-2">
                {/* Search input */}
                <div className="relative">
                  <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="ابحث عن المدينة..."
                    value={citySearchTerm}
                    onChange={(e) => setCitySearchTerm(e.target.value)}
                    className="pr-8 text-right"
                    dir="rtl"
                  />
                </div>

                {/* Cities list */}
                <div className="max-h-48 overflow-y-auto border rounded-md bg-white dark:bg-gray-950 shadow-sm">
                  {filteredCities.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                      {filteredCities.map((city) => (
                        <div
                          key={city.id}
                          className={`p-2.5 cursor-pointer text-right hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                            field.value === city.id
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                              : ""
                          }`}
                          onClick={() => {
                            // Update form value
                            field.onChange(city.id);

                            // Force form to recognize the change
                            form.setValue("cityId", city.id, {
                              shouldValidate: true,
                              shouldDirty: true,
                              shouldTouch: true,
                            });

                            if (onCityChange) {
                              onCityChange();
                            }
                          }}
                        >
                          {city.nameAr}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 text-center text-gray-500">
                      لا توجد مدن مطابقة للبحث
                    </div>
                  )}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Address Field */}
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              العنوان التفصيلي *
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="أدخل العنوان التفصيلي (الشارع، رقم المبنى، معالم مميزة...)"
                {...field}
                className="text-right resize-none bg-gradient-to-r from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900 border-gray-200 dark:border-gray-700"
                dir="rtl"
                rows={3}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Show selected location summary if both governorate and city are selected */}
      {selectedGovernorate && form.getValues("cityId") && (
        <div className="mt-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
              الموقع المحدد:
            </span>
          </div>
          <div className="mt-1 text-sm text-blue-600 dark:text-blue-300 pr-6">
            {selectedGovernorate.nameAr} -{" "}
            {
              (selectedGovernorate as ExtendedGovernorate).cities?.find(
                (city: City) => city.id === form.getValues("cityId")
              )?.nameAr
            }
          </div>
        </div>
      )}
    </div>
  );
}
