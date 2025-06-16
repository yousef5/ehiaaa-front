import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface ObserversHeaderProps {
  onCreateObserver: () => void;
}

export default function ObserversHeader({
  onCreateObserver,
}: ObserversHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-8">
      {/* Top section with breadcrumb and actions */}
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/admin/dashboard")}
              className="relative overflow-hidden group border-gray-200 dark:border-gray-700"
            >
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300 ease-out group-hover:w-full opacity-20"></span>
              <ArrowRight className="h-4 w-4 ml-1" />
              <span className="text-sm">لوحة التحكم</span>
            </Button>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              مراجعين النظام
            </span>
          </div>
        </div>

        {/* Main header with title and search */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800 shadow-lg shadow-blue-500/20 dark:shadow-blue-700/20">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                مراجعين النظام
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                إدارة وتتبع مراجعين النظام والمشرفين
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              onClick={onCreateObserver}
              className="relative overflow-hidden group bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 hover:from-emerald-600 hover:to-teal-700 dark:hover:from-emerald-700 dark:hover:to-teal-800 transition-all duration-300 shadow-md shadow-emerald-500/20 dark:shadow-emerald-700/20"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <Plus className="h-4 w-4 mr-2" />
              إضافة مراجع جديد
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
