import { Card, CardContent } from "@/components/ui/card";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type UserFilters } from "@/lib/api";
import { axiosInstance } from "@/lib/axios";
import type { Governorate } from "@/types/observer";
import { useQuery } from "@tanstack/react-query";
import { Building2, MapPin, Search } from "lucide-react";
import { useMemo } from "react";

interface UsersFiltersProps {
  filters: UserFilters;
  onFilterChange: (key: keyof UserFilters, value: string) => void;
  onSearch: (searchTerm: string) => void;
}

export function UsersFilters({
  filters,
  onFilterChange,
  onSearch,
}: UsersFiltersProps) {
  // Fetch governorates with cities
  const { data: governorates, isLoading: isLoadingGovernorates } = useQuery({
    queryKey: ["governorates-with-cities"],
    queryFn: async (): Promise<Governorate[]> => {
      const response = await axiosInstance.get("/governorates?withCities=true");
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid governorates data format");
      }
      return response.data;
    },
  });

  // Create options for dropdowns
  const governorateOptions: ComboboxOption[] = useMemo(() => {
    if (!governorates) return [];

    return [
      {
        value: "",
        label: "جميع المحافظات",
        searchTerms: ["جميع", "كل", "المحافظات", "all"],
      },
      ...governorates.map((gov) => ({
        value: gov.id,
        label: gov.nameAr,
        searchTerms: [
          gov.nameAr,
          gov.nameAr.replace(/محافظة\s*/, ""),
          ...gov.nameAr.split(" "),
        ],
      })),
    ];
  }, [governorates]);

  // Filter cities based on selected governorate
  const filteredCities = useMemo(() => {
    if (!governorates || !filters.governorateId) {
      // Return all cities from all governorates
      return (
        governorates?.flatMap(
          (gov) =>
            gov.cities?.map((city) => ({
              id: city.id,
              nameAr: city.nameAr,
              governorateId: gov.id,
            })) || []
        ) || []
      );
    }

    const selectedGovernorate = governorates.find(
      (gov) => gov.id === filters.governorateId
    );
    return (
      selectedGovernorate?.cities?.map((city) => ({
        id: city.id,
        nameAr: city.nameAr,
        governorateId: selectedGovernorate.id,
      })) || []
    );
  }, [governorates, filters.governorateId]);

  const cityOptions: ComboboxOption[] = useMemo(
    () => [
      {
        value: "",
        label: "جميع المدن",
        searchTerms: ["جميع", "كل", "المدن", "all"],
      },
      ...filteredCities.map((city) => ({
        value: city.id,
        label: city.nameAr,
        searchTerms: [
          city.nameAr,
          city.nameAr.replace(/مدينة\s*/, ""),
          ...city.nameAr.split(" "),
        ],
      })),
    ],
    [filteredCities]
  );

  const handleGovernorateChange = (value: string) => {
    onFilterChange("governorateId", value === "" ? "" : value);
    // Reset city when governorate changes
    onFilterChange("cityId", "");
  };

  const handleCityChange = (value: string) => {
    onFilterChange("cityId", value === "" ? "" : value);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث بالاسم أو البريد أو الهاتف..."
              value={filters.search || ""}
              onChange={(e) => onSearch(e.target.value)}
              className="pr-10"
            />
          </div>

          {/* Governorate Filter */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              المحافظة
            </label>
            <Combobox
              value={filters.governorateId || ""}
              onValueChange={handleGovernorateChange}
              options={governorateOptions}
              placeholder="اختر المحافظة"
              searchPlaceholder="البحث في المحافظات..."
              emptyText="لا توجد محافظات"
              allowClear={false}
              disabled={isLoadingGovernorates}
            />
          </div>

          {/* City Filter */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              المدينة
            </label>
            <Combobox
              value={filters.cityId || ""}
              onValueChange={handleCityChange}
              options={cityOptions}
              placeholder="اختر المدينة"
              searchPlaceholder="البحث في المدن..."
              emptyText="لا توجد مدن"
              disabled={
                isLoadingGovernorates ||
                (!!filters.governorateId && filteredCities.length === 0)
              }
              allowClear={false}
            />
          </div>

          {/* Status Filter */}
          <Select
            value={filters.status}
            onValueChange={(value: "active" | "inactive" | "all") =>
              onFilterChange("status", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="حالة التفعيل" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="active">مفعل</SelectItem>
              <SelectItem value="inactive">غير مفعل</SelectItem>
            </SelectContent>
          </Select>

          {/* Approval Filter */}
          <Select
            value={filters.approval}
            onValueChange={(
              value: "pending" | "approved" | "rejected" | "all"
            ) => onFilterChange("approval", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="حالة الموافقة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="pending">في انتظار الموافقة</SelectItem>
              <SelectItem value="approved">تم الاعتماد</SelectItem>
              <SelectItem value="rejected">مرفوض</SelectItem>
            </SelectContent>
          </Select>

          {/* User Type Filter */}
          <Select
            value={filters.userType}
            onValueChange={(value: "user" | "hospital" | "bloodbank" | "all") =>
              onFilterChange("userType", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="نوع المستخدم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              <SelectItem value="user">متبرع</SelectItem>
              <SelectItem value="hospital">مستشفى</SelectItem>
              <SelectItem value="bloodbank">بنك دم</SelectItem>
            </SelectContent>
          </Select>

          {/* Items per page */}
          <Select
            value={filters.limit.toString()}
            onValueChange={(value) => onFilterChange("limit", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="عدد العناصر" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 عناصر</SelectItem>
              <SelectItem value="25">25 عنصر</SelectItem>
              <SelectItem value="50">50 عنصر</SelectItem>
              <SelectItem value="100">100 عنصر</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
