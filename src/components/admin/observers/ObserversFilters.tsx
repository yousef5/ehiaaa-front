import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Filter, MapPin, Search } from "lucide-react";

interface ObserversFiltersProps {
  status: "active" | "inactive" | "all";
  limit: number;
  searchQuery: string;
  selectedCity: string;
  selectedGovernorate: string;
  filterOptions: {
    cities: { id: string; nameAr: string; governorateId: string }[];
    governorates: { id: string; nameAr: string }[];
  };
  filteredCities: { id: string; nameAr: string; governorateId: string }[];
  onStatusChange: (value: "active" | "inactive" | "all") => void;
  onLimitChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onGovernorateChange: (value: string) => void;
}

export default function ObserversFilters({
  status,
  limit,
  searchQuery,
  selectedCity,
  selectedGovernorate,
  filterOptions,
  filteredCities,
  onStatusChange,
  onLimitChange,
  onSearchChange,
  onCityChange,
  onGovernorateChange,
}: ObserversFiltersProps) {
  // Prepare options for Combobox with enhanced search terms
  const governorateOptions: ComboboxOption[] = [
    {
      value: "all",
      label: "جميع المحافظات",
      searchTerms: ["جميع", "كل", "المحافظات", "all"],
    },
    ...filterOptions.governorates.map((gov) => ({
      value: gov.id,
      label: gov.nameAr,
      searchTerms: [
        gov.nameAr,
        gov.nameAr.replace(/محافظة\s*/, ""), // Remove "محافظة" prefix for better search
        ...gov.nameAr.split(" "), // Split by spaces for individual words
      ],
    })),
  ];

  const cityOptions: ComboboxOption[] = [
    {
      value: "all",
      label: "جميع المدن",
      searchTerms: ["جميع", "كل", "المدن", "all"],
    },
    ...filteredCities.map((city) => ({
      value: city.id,
      label: city.nameAr,
      searchTerms: [
        city.nameAr,
        city.nameAr.replace(/مدينة\s*/, ""), // Remove "مدينة" prefix for better search
        ...city.nameAr.split(" "), // Split by spaces for individual words
      ],
    })),
  ];

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-emerald-500 to-teal-600 dark:from-blue-600 dark:via-emerald-600 dark:to-teal-700"></div>
      <div className="pt-1 p-5 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30">
            <Filter className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            تصفية النتائج
          </h3>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="البحث بالاسم أو البريد الإلكتروني أو الهاتف أو العنوان..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-10 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
          {/* Governorate Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              المحافظة:
            </label>
            <Combobox
              value={selectedGovernorate}
              onValueChange={onGovernorateChange}
              options={governorateOptions}
              placeholder="اختر المحافظة"
              searchPlaceholder="البحث في المحافظات..."
              emptyText="لا توجد محافظات"
              allowClear={false}
              className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            />
          </div>

          {/* City Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              المدينة:
            </label>
            <Combobox
              value={selectedCity}
              onValueChange={onCityChange}
              options={cityOptions}
              placeholder="اختر المدينة"
              searchPlaceholder="البحث في المدن..."
              emptyText="لا توجد مدن"
              disabled={
                selectedGovernorate !== "all" && filteredCities.length === 0
              }
              allowClear={false}
              className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
              الحالة:
            </label>
            <Select
              value={status}
              onValueChange={(value: "active" | "inactive" | "all") =>
                onStatusChange(value)
              }
            >
              <SelectTrigger className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Items per page */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
              عدد العناصر:
            </label>
            <Select value={limit.toString()} onValueChange={onLimitChange}>
              <SelectTrigger className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-transparent">.</label>
            <button
              onClick={() => {
                onSearchChange("");
                onCityChange("all");
                onGovernorateChange("all");
                onStatusChange("all");
              }}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors border border-gray-200 dark:border-gray-700"
            >
              مسح الفلاتر
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
