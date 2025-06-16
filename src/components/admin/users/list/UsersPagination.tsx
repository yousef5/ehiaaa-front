import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface UsersPaginationProps {
  pagination: Pagination;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function UsersPagination({
  pagination,
  currentPage,
  onPageChange,
}: UsersPaginationProps) {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-600">
        عرض {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} إلى{" "}
        {Math.min(
          pagination.currentPage * pagination.itemsPerPage,
          pagination.totalItems
        )}{" "}
        من {pagination.totalItems} عنصر
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!pagination.hasPreviousPage}
        >
          <ChevronRight className="h-4 w-4" />
          السابق
        </Button>
        <span className="text-sm">
          صفحة {pagination.currentPage} من {pagination.totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!pagination.hasNextPage}
        >
          التالي
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
