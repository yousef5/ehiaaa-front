import { Button } from "@/components/ui/button";
import { usersApi, type UserFilters } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  RefreshCw,
  ShieldAlert,
  UserCheck,
  UserPlus,
  Users,
  UserX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
// Import components from index file
import {
  DeleteUserDialog,
  UsersFilters,
  UsersPagination,
  UsersTable,
} from "@/components/admin/users/list";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function UsersList() {
  const router = useRouter();

  // State for filters
  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    limit: 10,
    status: "all",
    approval: "all",
    userType: "all",
    search: "",
    cityId: undefined,
    governorateId: undefined,
  });

  // State for delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch users data with React Query
  const {
    data: usersData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["users", filters],
    queryFn: () => usersApi.getAllUsersWithFilters(filters),
    staleTime: 30 * 1000, // Cache for 30 seconds
    retry: 2,
  });

  const handleFilterChange = (key: keyof UserFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filtering
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearch = (searchTerm: string) => {
    setFilters((prev) => ({
      ...prev,
      search: searchTerm,
      page: 1,
    }));
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    setUserToDelete({ id: userId, name: userName });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      setIsDeleting(true);
      await usersApi.deleteUser(userToDelete.id);
      toast.success("تم حذف المستخدم");
      refetch();
    } catch {
      toast.error("حدث خطأ أثناء حذف المستخدم");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleUserAction = async (
    action: "approve" | "reject" | "toggle" | "delete",
    userId: string,
    reason?: string
  ) => {
    try {
      switch (action) {
        case "approve":
          await usersApi.approveUser(userId);
          toast.success("تم اعتماد المستخدم بنجاح");
          break;
        case "reject":
          if (!reason) return;
          await usersApi.rejectUser(userId, reason);
          toast.success("تم رفض المستخدم");
          break;
        case "toggle":
          const user = usersData?.users.find((u) => u.id === userId);
          if (user) {
            await usersApi.toggleUserStatus(userId, user.isActive);
            toast.success(
              user.isActive ? "تم إيقاف المستخدم" : "تم تفعيل المستخدم"
            );
          }
          break;
        case "delete":
          // Instead of deleting directly, find the user and open the dialog
          const userToDelete = usersData?.users.find((u) => u.id === userId);
          if (userToDelete) {
            handleDeleteUser(userId, userToDelete.name);
          }
          return; // Return early to prevent refetch
      }
      refetch();
    } catch {
      toast.error("حدث خطأ أثناء تنفيذ العملية");
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="relative bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl border border-red-200 dark:border-red-800 text-center max-w-md w-full overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-100 dark:bg-red-800/20 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-100 dark:bg-red-800/20 rounded-full"></div>
          <div className="relative z-10">
            <ShieldAlert className="h-12 w-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
            <div className="text-red-600 dark:text-red-400 text-xl font-bold mb-3">
              حدث خطأ في تحميل البيانات
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              لم نتمكن من الوصول إلى بيانات المستخدمين. يرجى المحاولة مرة أخرى.
            </p>
            <Button
              onClick={() => refetch()}
              variant="destructive"
              className="w-full relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-500 group-hover:opacity-90 transition-opacity"></span>
              <span className="relative flex items-center justify-center">
                <RefreshCw className="h-4 w-4 ml-2" />
                إعادة المحاولة
              </span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-10 px-4 sm:px-6 py-6" dir="rtl">
      {/* Page Header with enhanced gradient background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-800">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
        <div className="relative p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-2">
              <Users className="h-3.5 w-3.5" />
              لوحة إدارة المستخدمين
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              إدارة المستخدمين
            </h1>
            <p className="text-blue-100 max-w-md text-lg">
              إدارة المتبرعين والمستشفيات وبنوك الدم وتنظيم الوصول إلى النظام
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 self-stretch sm:self-auto">
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
              onClick={() => router.push("/admin/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة للوحة التحكم
            </Button>
            <Button
              onClick={() => refetch()}
              disabled={isLoading || isFetching}
              className="relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white to-blue-50 group-hover:opacity-90 transition-opacity"></span>
              <span className="relative flex items-center justify-center text-blue-700">
                <RefreshCw
                  className={cn("h-4 w-4 ml-2", isFetching && "animate-spin")}
                />
                {isFetching ? "جاري التحديث..." : "تحديث البيانات"}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards with special design */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="relative overflow-hidden bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 border border-gray-100/50 dark:border-gray-700/50 backdrop-blur-sm"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"></div>
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-10 w-20 mb-2" />
              <Skeleton className="h-3 w-32 mt-3" />
            </div>
          ))}
        </div>
      ) : (
        usersData?.summary && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-xl p-6 border border-blue-100/50 dark:border-blue-800/30 backdrop-blur-sm group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-200/30 dark:bg-blue-700/20 rounded-full transform group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-blue-700 dark:text-blue-300 font-medium">
                    إجمالي المستخدمين
                  </h3>
                  <div className="p-2 bg-blue-100 dark:bg-blue-800/40 rounded-full">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">
                  {usersData.summary.total}
                </p>
                <p className="text-sm text-blue-600/70 dark:text-blue-300/70">
                  إجمالي المستخدمين المسجلين في النظام
                </p>
              </div>
            </div>

            {/* Active Users Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-xl p-6 border border-green-100/50 dark:border-green-800/30 backdrop-blur-sm group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-green-200/30 dark:bg-green-700/20 rounded-full transform group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-green-700 dark:text-green-300 font-medium">
                    المستخدمون النشطون
                  </h3>
                  <div className="p-2 bg-green-100 dark:bg-green-800/40 rounded-full">
                    <UserCheck className="h-5 w-5 text-green-600 dark:text-green-300" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100 mb-1">
                  {usersData.summary.active}
                </p>
                <p className="text-sm text-green-600/70 dark:text-green-300/70">
                  المستخدمون النشطون حالياً
                </p>
              </div>
            </div>

            {/* Pending Users Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl shadow-xl p-6 border border-amber-100/50 dark:border-amber-800/30 backdrop-blur-sm group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-200/30 dark:bg-amber-700/20 rounded-full transform group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-amber-700 dark:text-amber-300 font-medium">
                    في انتظار الموافقة
                  </h3>
                  <div className="p-2 bg-amber-100 dark:bg-amber-800/40 rounded-full">
                    <UserPlus className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-1">
                  {usersData.summary.pending}
                </p>
                <p className="text-sm text-amber-600/70 dark:text-amber-300/70">
                  المستخدمون في انتظار الموافقة
                </p>
              </div>
            </div>

            {/* Rejected Users Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl shadow-xl p-6 border border-red-100/50 dark:border-red-800/30 backdrop-blur-sm group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-rose-500"></div>
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-red-200/30 dark:bg-red-700/20 rounded-full transform group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-red-700 dark:text-red-300 font-medium">
                    المستخدمون المرفوضون
                  </h3>
                  <div className="p-2 bg-red-100 dark:bg-red-800/40 rounded-full">
                    <UserX className="h-5 w-5 text-red-600 dark:text-red-300" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-red-900 dark:text-red-100 mb-1">
                  {usersData.summary.rejected}
                </p>
                <p className="text-sm text-red-600/70 dark:text-red-300/70">
                  المستخدمون الذين تم رفضهم
                </p>
              </div>
            </div>
          </div>
        )
      )}

      {/* Main Content */}
      <div className="space-y-8">
        {/* Filters Card */}
        <div className="relative overflow-hidden bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl border-0 backdrop-blur-sm">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"></div>
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <span className=" w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  1
                </span>
              </span>
              تصفية وبحث
            </h2>
            <UsersFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
            />
          </div>
        </div>

        {/* Users Table Card */}
        <div className="relative overflow-hidden bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl border-0 backdrop-blur-sm">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-300 to-blue-400 dark:from-indigo-700 dark:to-blue-600"></div>
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <span className=" w-8 h-8 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center mr-3">
                <span className="text-indigo-700 dark:text-indigo-300 text-sm">
                  2
                </span>
              </span>
              قائمة المستخدمين
            </h2>
            <UsersTable
              users={usersData?.users || []}
              isLoading={isLoading}
              onUserAction={handleUserAction}
              router={router}
            />

            {/* Pagination */}
            {usersData?.pagination && (
              <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6">
                <UsersPagination
                  pagination={usersData.pagination}
                  currentPage={filters.page}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete User Dialog */}
      <DeleteUserDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        user={userToDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
