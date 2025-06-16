import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ObserversPaginationProps {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export default function ObserversPagination({
  page,
  limit,
  total,
  totalPages,
  onPrevPage,
  onNextPage,
}: ObserversPaginationProps) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <div className="flex-1 flex justify-between sm:hidden">
        <Button
          onClick={onPrevPage}
          disabled={page === 1}
          className="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-300 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          <ChevronRight className="h-4 w-4 mr-1" />
          السابق
        </Button>
        <Button
          onClick={onNextPage}
          disabled={page === totalPages}
          className="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-300 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          التالي
          <ChevronLeft className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            عرض{" "}
            <span className="font-medium text-blue-600 dark:text-blue-400">
              {(page - 1) * limit + 1}
            </span>{" "}
            إلى{" "}
            <span className="font-medium text-blue-600 dark:text-blue-400">
              {Math.min(page * limit, total)}
            </span>{" "}
            من{" "}
            <span className="font-medium text-blue-600 dark:text-blue-400">
              {total}
            </span>{" "}
            مراجع
          </p>
        </div>

        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button
            onClick={onPrevPage}
            disabled={page === 1}
            variant="outline"
            size="icon"
            className="relative overflow-hidden group border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 transition-all duration-300 ease-out group-hover:w-full opacity-10"></span>
            <span className="sr-only">السابق</span>
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </Button>

          <div className="relative overflow-hidden rounded-md">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 opacity-20 dark:opacity-30"></div>
            <div className="relative px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200">
              {page} من {totalPages}
            </div>
          </div>

          <Button
            onClick={onNextPage}
            disabled={page === totalPages}
            variant="outline"
            size="icon"
            className="relative overflow-hidden group border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 transition-all duration-300 ease-out group-hover:w-full opacity-10"></span>
            <span className="sr-only">التالي</span>
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </Button>
        </div>
      </div>
    </div>
  );
}
