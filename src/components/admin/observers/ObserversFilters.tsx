import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

interface ObserversFiltersProps {
  status: "active" | "inactive" | "all";
  limit: number;
  onStatusChange: (value: "active" | "inactive" | "all") => void;
  onLimitChange: (value: string) => void;
}

export default function ObserversFilters({
  status,
  limit,
  onStatusChange,
  onLimitChange,
}: ObserversFiltersProps) {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-emerald-500 to-teal-600 dark:from-blue-600 dark:via-emerald-600 dark:to-teal-700"></div>
      <div className="pt-1 p-5 flex flex-wrap gap-6 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30">
            <Filter className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            تصفية النتائج
          </h3>
        </div>

        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              الحالة:
            </span>
            <Select
              value={status}
              onValueChange={(value: "active" | "inactive" | "all") =>
                onStatusChange(value)
              }
            >
              <SelectTrigger className="w-[180px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              عدد العناصر:
            </span>
            <Select value={limit.toString()} onValueChange={onLimitChange}>
              <SelectTrigger className="w-[100px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
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
        </div>
      </div>
    </div>
  );
}
