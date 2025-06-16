import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type UserFilters } from "@/lib/api";
import { Search } from "lucide-react";

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
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث بالاسم أو البريد أو الهاتف..."
              value={filters.search}
              onChange={(e) => onSearch(e.target.value)}
              className="pr-10"
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
