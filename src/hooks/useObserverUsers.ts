import {
  observerUsersApi,
  usersApi,
  type ObserverUsersFilters,
} from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Custom hook for managing observer users data and operations
 */
export function useObserverUsers(filters: ObserverUsersFilters) {
  const queryClient = useQueryClient();

  // Query for fetching observer area users
  const query = useQuery({
    queryKey: ["observer-users", filters],
    queryFn: () => observerUsersApi.getObserverAreaUsers(filters),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2,
  });

  // Function to invalidate all related queries
  const invalidateObserverUsersQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["observer-users"] });
    queryClient.invalidateQueries({ queryKey: ["observer-user-detail"] });
  };

  // Force refetch current data
  const refetchObserverUsers = () => {
    invalidateObserverUsersQueries();
    query.refetch();
  };

  // Mutation for updating user avatar
  const updateUserAvatarMutation = useMutation({
    mutationFn: ({
      userId,
      avatarFile,
    }: {
      userId: string;
      avatarFile: File;
    }) => usersApi.updateUserAvatar(userId, avatarFile),
    onSuccess: () => {
      invalidateObserverUsersQueries();
      toast.success("تم تحديث الصورة الشخصية بنجاح");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message
          : "حدث خطأ أثناء تحديث الصورة";
      toast.error(errorMessage || "حدث خطأ أثناء تحديث الصورة");
    },
  });

  // Mutation for uploading user avatar
  const uploadUserAvatarMutation = useMutation({
    mutationFn: ({
      userId,
      avatarFile,
    }: {
      userId: string;
      avatarFile: File;
    }) => usersApi.uploadUserAvatar(userId, avatarFile),
    onSuccess: () => {
      invalidateObserverUsersQueries();
      toast.success("تم رفع الصورة الشخصية بنجاح");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message
          : "حدث خطأ أثناء رفع الصورة";
      toast.error(errorMessage || "حدث خطأ أثناء رفع الصورة");
    },
  });

  // Mutation for removing user avatar
  const removeUserAvatarMutation = useMutation({
    mutationFn: (userId: string) => usersApi.removeUserAvatar(userId),
    onSuccess: () => {
      invalidateObserverUsersQueries();
      toast.success("تم حذف الصورة الشخصية بنجاح");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message
          : "حدث خطأ أثناء حذف الصورة";
      toast.error(errorMessage || "حدث خطأ أثناء حذف الصورة");
    },
  });

  // Mutation for activating user
  const activateUserMutation = useMutation({
    mutationFn: ({ userId, reason }: { userId: string; reason?: string }) =>
      usersApi.activateUser(userId, reason),
    onSuccess: () => {
      invalidateObserverUsersQueries();
      toast.success("تم تفعيل المستخدم بنجاح");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message
          : "حدث خطأ أثناء تفعيل المستخدم";
      toast.error(errorMessage || "حدث خطأ أثناء تفعيل المستخدم");
    },
  });

  // Mutation for deactivating user
  const deactivateUserMutation = useMutation({
    mutationFn: ({ userId, reason }: { userId: string; reason: string }) =>
      usersApi.deactivateUser(userId, reason),
    onSuccess: () => {
      invalidateObserverUsersQueries();
      toast.success("تم إيقاف المستخدم بنجاح");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message
          : "حدث خطأ أثناء إيقاف المستخدم";
      toast.error(errorMessage || "حدث خطأ أثناء إيقاف المستخدم");
    },
  });

  return {
    // Query data
    users: query.data?.data || [],
    pagination: {
      page: query.data?.page || 1,
      limit: query.data?.limit || 12,
      total: query.data?.total || 0,
      pages: query.data?.total
        ? Math.ceil(query.data.total / (query.data.limit || 12))
        : 0,
    },
    isLoading: query.isLoading,
    error: query.error,
    isFetching: query.isFetching,

    // Refetch functions
    refetch: query.refetch,
    refetchObserverUsers,
    invalidateObserverUsersQueries,

    // Mutations
    updateUserAvatarMutation,
    uploadUserAvatarMutation,
    removeUserAvatarMutation,
    activateUserMutation,
    deactivateUserMutation,
  };
}

/**
 * Custom hook for managing a single observer user
 */
export function useObserverUser(userId: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["observer-user-detail", userId],
    queryFn: () => observerUsersApi.getUserById(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!userId,
  });

  // Function to invalidate related queries
  const invalidateUserQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["observer-users"] });
    queryClient.invalidateQueries({
      queryKey: ["observer-user-detail", userId],
    });
  };

  return {
    user: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    invalidateUserQueries,
  };
}
