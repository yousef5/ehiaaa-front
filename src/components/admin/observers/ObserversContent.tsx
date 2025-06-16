import { Observer } from "@/types/observer";
import { ObserverStatus } from "./types";

// Import components
import ObserversFilters from "./ObserversFilters";
import ObserversHeader from "./ObserversHeader";
import ObserversPagination from "./ObserversPagination";
import ObserversStats from "./ObserversStats";
import ObserversTable from "./ObserversTable";

interface ObserversContentProps {
  observers: Observer[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  status: ObserverStatus;
  page: number;
  limit: number;
  handleCreateObserver: () => void;
  handleUpdateObserver: (observerId: string) => void;
  handleDeleteObserver: (observerId: string) => void;
  handleToggleObserverStatus: (observerId: string) => void;
  handleUpdateAvatar: (observerId: string) => void;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handleLimitChange: (value: string) => void;
  handleStatusChange: (value: ObserverStatus) => void;
}

export function ObserversContent({
  observers,
  total,
  totalPages,
  isLoading,
  status,
  page,
  limit,
  handleCreateObserver,
  handleUpdateObserver,
  handleDeleteObserver,
  handleToggleObserverStatus,
  handleUpdateAvatar,
  handleNextPage,
  handlePrevPage,
  handleLimitChange,
  handleStatusChange,
}: ObserversContentProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            جاري تحميل بيانات المراجعين...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
      <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        {/* Page Header */}
        <ObserversHeader onCreateObserver={handleCreateObserver} />

        {/* Statistics Cards */}
        <div className="mt-6">
          <ObserversStats observers={observers} total={total} />
        </div>

        {/* Filters */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <ObserversFilters
            status={status}
            limit={limit}
            onStatusChange={handleStatusChange}
            onLimitChange={handleLimitChange}
          />
        </div>

        {/* Observers Table */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 p-1">
            <div className="bg-white dark:bg-gray-800 rounded-t-lg overflow-hidden">
              <ObserversTable
                observers={observers}
                onUpdateObserver={handleUpdateObserver}
                onDeleteObserver={handleDeleteObserver}
                onToggleStatus={handleToggleObserverStatus}
                onUpdateAvatar={handleUpdateAvatar}
              />
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <ObserversPagination
            page={page}
            limit={limit}
            total={total}
            totalPages={totalPages}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
        </div>
      </div>
    </div>
  );
}
