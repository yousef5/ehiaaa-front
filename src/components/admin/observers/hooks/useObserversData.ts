import { observerApi } from "@/lib/api";
import { useQuickToast } from "@/stores/uiStore";
import { Observer } from "@/types/observer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ObserverStatus } from "../types";

export function useObserversData() {
  const toast = useQuickToast();
  const queryClient = useQueryClient();

  // State
  const [status, setStatus] = useState<ObserverStatus>("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedObserver, setSelectedObserver] = useState<Observer | null>(
    null
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isToggleStatusDialogOpen, setIsToggleStatusDialogOpen] =
    useState(false);
  const [isUpdateAvatarDialogOpen, setIsUpdateAvatarDialogOpen] =
    useState(false);
  const [selectedObserverId, setSelectedObserverId] = useState("");

  // Query for fetching observers
  const { data, isLoading } = useQuery({
    queryKey: ["observers", { status, page, limit }],
    queryFn: async () => {
      const response = await observerApi.getAllObservers(status, page, limit);
      return {
        observers: response.observers || [],
        total: response.pagination?.totalItems || 0,
        totalPages: response.pagination?.totalPages || 1,
      };
    },
  });

  // Mutation for deleting an observer
  const deleteMutation = useMutation({
    mutationFn: (id: string) => observerApi.deleteObserver(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["observers"] });
      toast.success("تم حذف المراجع", "تم حذف المراجع بنجاح من النظام");
    },
    onError: (error) => {
      console.error("Failed to delete observer:", error);
      toast.error("فشل في حذف المراجع", "حدث خطأ أثناء حذف المراجع");
    },
  });

  // Mutation for activating an observer
  const activateMutation = useMutation({
    mutationFn: (id: string) => observerApi.activateObserver(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["observers"] });
      toast.success("تم تفعيل المراجع", "تم تفعيل المراجع بنجاح");
    },
    onError: (error) => {
      console.error("Failed to activate observer:", error);
      toast.error("فشل في تفعيل المراجع", "حدث خطأ أثناء تفعيل المراجع");
    },
  });

  // Mutation for deactivating an observer
  const deactivateMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      observerApi.deactivateObserver(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["observers"] });
      toast.success("تم إيقاف المراجع", "تم إيقاف المراجع بنجاح");
    },
    onError: (error) => {
      console.error("Failed to deactivate observer:", error);
      toast.error("فشل في إيقاف المراجع", "حدث خطأ أثناء إيقاف المراجع");
    },
  });

  // Mutation for updating observer avatar
  const updateAvatarMutation = useMutation({
    mutationFn: ({ id, avatarFile }: { id: string; avatarFile: File }) =>
      observerApi.updateObserverAvatar(id, avatarFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["observers"] });
      toast.success("تم تحديث صورة المراجع", "تم تحديث صورة المراجع بنجاح");
    },
    onError: (error) => {
      console.error("Failed to update avatar:", error);
      toast.error("فشل في تحديث الصورة", "حدث خطأ أثناء تحديث صورة المراجع");
    },
  });

  // Handlers
  const handleCreateObserver = () => {
    setIsCreateDialogOpen(true);
  };

  const handleUpdateObserver = (observerId: string) => {
    setSelectedObserverId(observerId);
    setIsUpdateDialogOpen(true);
  };

  const handleObserverCreated = () => {
    queryClient.invalidateQueries({ queryKey: ["observers"] });
    toast.success("تم إضافة مراجع جديد", "تمت إضافة المراجع بنجاح");
  };

  const handleObserverUpdated = () => {
    queryClient.invalidateQueries({ queryKey: ["observers"] });
    toast.success("تم تحديث بيانات المراجع", "تمت تحديث بيانات المراجع بنجاح");
  };

  const handleDeleteObserver = (observerId: string) => {
    const observer = data?.observers.find((obs) => obs.id === observerId);
    if (observer) {
      setSelectedObserver(observer);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedObserver) return;
    deleteMutation.mutate(selectedObserver.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        setSelectedObserver(null);
      },
    });
  };

  const handleToggleObserverStatus = (observerId: string) => {
    const observer = data?.observers.find((obs) => obs.id === observerId);
    if (observer) {
      setSelectedObserver(observer);
      setIsToggleStatusDialogOpen(true);
    }
  };

  const handleUpdateAvatar = (observerId: string) => {
    const observer = data?.observers.find((obs) => obs.id === observerId);
    if (observer) {
      setSelectedObserver(observer);
      setIsUpdateAvatarDialogOpen(true);
    }
  };

  const handleConfirmToggleStatus = async (reason?: string) => {
    if (!selectedObserver) return;

    if (selectedObserver.isActive) {
      if (!reason) {
        toast.error("خطأ", "سبب إلغاء التفعيل مطلوب");
        return;
      }
      deactivateMutation.mutate(
        { id: selectedObserver.id, reason },
        {
          onSuccess: () => {
            setIsToggleStatusDialogOpen(false);
            setSelectedObserver(null);
          },
        }
      );
    } else {
      activateMutation.mutate(selectedObserver.id, {
        onSuccess: () => {
          setIsToggleStatusDialogOpen(false);
          setSelectedObserver(null);
        },
      });
    }
  };

  const handleConfirmAvatarUpdate = async (avatarFile: File) => {
    if (!selectedObserver) return;

    updateAvatarMutation.mutate(
      { id: selectedObserver.id, avatarFile },
      {
        onSuccess: () => {
          setIsUpdateAvatarDialogOpen(false);
          setSelectedObserver(null);
        },
      }
    );
  };

  const handleNextPage = () => {
    if (page < (data?.totalPages || 1)) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleLimitChange = (value: string) => {
    setLimit(parseInt(value));
    setPage(1);
  };

  const handleStatusChange = (value: ObserverStatus) => {
    setStatus(value);
    setPage(1);
  };

  const isDeleting = deleteMutation.isPending;
  const isTogglingStatus =
    activateMutation.isPending || deactivateMutation.isPending;
  const isUpdatingAvatar = updateAvatarMutation.isPending;

  return {
    // Data
    observers: data?.observers || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 1,
    isLoading,
    status,
    page,
    limit,

    // State
    selectedObserver,
    isCreateDialogOpen,
    isUpdateDialogOpen,
    isDeleteDialogOpen,
    isToggleStatusDialogOpen,
    isUpdateAvatarDialogOpen,
    isDeleting,
    isTogglingStatus,
    isUpdatingAvatar,
    selectedObserverId,

    // Setters
    setIsCreateDialogOpen,
    setIsUpdateDialogOpen,
    setIsDeleteDialogOpen,
    setIsToggleStatusDialogOpen,
    setIsUpdateAvatarDialogOpen,

    // Handlers
    handleCreateObserver,
    handleUpdateObserver,
    handleDeleteObserver,
    handleToggleObserverStatus,
    handleUpdateAvatar,
    handleConfirmDelete,
    handleConfirmToggleStatus,
    handleConfirmAvatarUpdate,
    handleNextPage,
    handlePrevPage,
    handleLimitChange,
    handleStatusChange,
    handleObserverCreated,
    handleObserverUpdated,
  };
}
