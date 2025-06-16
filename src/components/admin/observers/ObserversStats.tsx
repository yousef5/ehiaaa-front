import type { Observer } from "@/types/observer";
import { Eye, EyeOff, Users } from "lucide-react";

interface ObserversStatsProps {
  observers: Observer[];
  total: number;
}

export default function ObserversStats({
  observers,
  total,
}: ObserversStatsProps) {
  const activeObservers = observers.filter((obs) => obs.isActive).length;
  const inactiveObservers = observers.filter((obs) => !obs.isActive).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="relative overflow-hidden rounded-xl shadow-lg group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 dark:from-blue-600 dark:to-indigo-800 opacity-90"></div>
        <div className="absolute inset-0 bg-white dark:bg-gray-900 opacity-90 group-hover:opacity-75 transition-opacity duration-300"></div>
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              إجمالي المراجعين
            </h3>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-right text-gray-900 dark:text-white mb-1">
            {total}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-right">
            مراجع مسجل في النظام
          </p>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-600 dark:from-blue-500 dark:to-indigo-700"></div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl shadow-lg group">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-600 dark:from-emerald-600 dark:to-green-800 opacity-90"></div>
        <div className="absolute inset-0 bg-white dark:bg-gray-900 opacity-90 group-hover:opacity-75 transition-opacity duration-300"></div>
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              المراجعين النشطين
            </h3>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Eye className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-right text-green-600 dark:text-green-400 mb-1">
            {activeObservers}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-right">
            مراجع نشط حالياً
          </p>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-600 dark:from-emerald-500 dark:to-green-700"></div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl shadow-lg group">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-red-600 dark:from-rose-600 dark:to-red-800 opacity-90"></div>
        <div className="absolute inset-0 bg-white dark:bg-gray-900 opacity-90 group-hover:opacity-75 transition-opacity duration-300"></div>
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              المراجعين غير النشطين
            </h3>
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <EyeOff className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-right text-red-600 dark:text-red-400 mb-1">
            {inactiveObservers}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-right">
            مراجع غير نشط حالياً
          </p>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-red-600 dark:from-rose-500 dark:to-red-700"></div>
        </div>
      </div>
    </div>
  );
}
