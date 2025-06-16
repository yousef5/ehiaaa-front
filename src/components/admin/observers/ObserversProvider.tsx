import { observerApi } from "@/lib/api";
import { useQuickToast } from "@/stores/uiStore";
import type { Observer } from "@/types/observer";
import { ReactNode, createContext, useContext, useState } from "react";
import { ObserverStatus } from "./hooks/useObservers";

interface ObserversContextType {
  observers: Observer[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  status: ObserverStatus;
  page: number;
  limit: number;
  selectedObserver: Observer | null;
  isCreateDialogOpen: boolean;
  isUpdateDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  isToggleStatusDialogOpen: boolean;
  isUpdateAvatarDialogOpen: boolean;
  isDeleting: boolean;
  isTogglingStatus: boolean;
  isUpdatingAvatar: boolean;
  selectedObserverId: string;
  setStatus: (status: ObserverStatus) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSelectedObserver: (observer: Observer | null) => void;
  setIsCreateDialogOpen: (isOpen: boolean) => void;
  setIsUpdateDialogOpen: (isOpen: boolean) => void;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  setIsToggleStatusDialogOpen: (isOpen: boolean) => void;
  setIsUpdateAvatarDialogOpen: (isOpen: boolean) => void;
  setSelectedObserverId: (id: string) => void;
  fetchObservers: () => Promise<void>;
  handleCreateObserver: () => void;
  handleUpdateObserver: (observerId: string) => void;
  handleDeleteObserver: (observerId: string) => void;
  handleToggleObserverStatus: (observerId: string) => void;
  handleUpdateAvatar: (observerId: string) => void;
  handleConfirmDelete: () => Promise<void>;
  handleConfirmToggleStatus: (reason?: string) => Promise<void>;
  handleConfirmAvatarUpdate: (avatarFile: File) => Promise<void>;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handleLimitChange: (value: string) => void;
  handleStatusChange: (value: ObserverStatus) => void;
  handleObserverCreated: () => void;
  handleObserverUpdated: () => void;
}

const ObserversContext = createContext<ObserversContextType | null>(null);

export function useObserversContext() {
  const context = useContext(ObserversContext);
  if (!context) {
    throw new Error(
      "useObserversContext must be used within an ObserversProvider"
    );
  }
  return context;
}

interface ObserversProviderProps {
  children: ReactNode;
}

export function ObserversProvider({ children }: ObserversProviderProps) {
  const toast = useQuickToast();

  // State
  const [observers, setObservers] = useState<Observer[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
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
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [selectedObserverId, setSelectedObserverId] = useState("");

  // Fetch observers data from API
  const fetchObservers = async () => {
    setIsLoading(true);
    try {
      const response = await observerApi.getAllObservers(status, page, limit);
      setObservers(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch observers:", error);
      toast.error(
        "فشل في تحميل البيانات",
        "حدث خطأ أثناء تحميل بيانات المراجعين"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateObserver = () => {
    setIsCreateDialogOpen(true);
  };

  const handleUpdateObserver = (observerId: string) => {
    setSelectedObserverId(observerId);
    setIsUpdateDialogOpen(true);
  };

  const handleObserverCreated = () => {
    fetchObservers();
    toast.success("تم إضافة مراجع جديد", "تمت إضافة المراجع بنجاح");
  };

  const handleObserverUpdated = () => {
    fetchObservers();
    toast.success("تم تحديث بيانات المراجع", "تمت تحديث بيانات المراجع بنجاح");
  };

  const handleDeleteObserver = (observerId: string) => {
    const observer = observers.find((obs) => obs.id === observerId);
    if (observer) {
      setSelectedObserver(observer);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedObserver) return;

    setIsDeleting(true);
    try {
      await observerApi.deleteObserver(selectedObserver.id);

      setIsDeleteDialogOpen(false);
      setSelectedObserver(null);
      fetchObservers();
      toast.success("تم حذف المراجع", "تم حذف المراجع بنجاح من النظام");
    } catch (error) {
      console.error("Failed to delete observer:", error);
      toast.error("فشل في حذف المراجع", "حدث خطأ أثناء حذف المراجع");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleObserverStatus = (observerId: string) => {
    const observer = observers.find((obs) => obs.id === observerId);
    if (observer) {
      setSelectedObserver(observer);
      setIsToggleStatusDialogOpen(true);
    }
  };

  const handleUpdateAvatar = (observerId: string) => {
    const observer = observers.find((obs) => obs.id === observerId);
    if (observer) {
      setSelectedObserver(observer);
      setIsUpdateAvatarDialogOpen(true);
    }
  };

  const handleConfirmToggleStatus = async (reason?: string) => {
    if (!selectedObserver) return;

    setIsTogglingStatus(true);
    try {
      if (selectedObserver.isActive) {
        if (!reason) {
          toast.error("خطأ", "سبب إلغاء التفعيل مطلوب");
          return;
        }
        await observerApi.deactivateObserver(selectedObserver.id, reason);
        toast.success("تم إيقاف المراجع", "تم إيقاف المراجع بنجاح");
      } else {
        await observerApi.activateObserver(selectedObserver.id);
        toast.success("تم تفعيل المراجع", "تم تفعيل المراجع بنجاح");
      }

      setIsToggleStatusDialogOpen(false);
      setSelectedObserver(null);
      fetchObservers();
    } catch (error) {
      console.error("Failed to toggle observer status:", error);
      toast.error(
        "فشل في تغيير حالة المراجع",
        "حدث خطأ أثناء تغيير حالة المراجع"
      );
    } finally {
      setIsTogglingStatus(false);
    }
  };

  const handleConfirmAvatarUpdate = async (avatarFile: File) => {
    if (!selectedObserver) return;

    setIsUpdatingAvatar(true);
    try {
      await observerApi.updateObserverAvatar(selectedObserver.id, avatarFile);

      setIsUpdateAvatarDialogOpen(false);
      setSelectedObserver(null);
      fetchObservers();
      toast.success("تم تحديث صورة المراجع", "تم تحديث صورة المراجع بنجاح");
    } catch (error) {
      console.error("Failed to update avatar:", error);
      toast.error("فشل في تحديث الصورة", "حدث خطأ أثناء تحديث صورة المراجع");
    } finally {
      setIsUpdatingAvatar(false);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
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

  const value: ObserversContextType = {
    observers,
    total,
    totalPages,
    isLoading,
    status,
    page,
    limit,
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
    setStatus,
    setPage,
    setLimit,
    setSelectedObserver,
    setIsCreateDialogOpen,
    setIsUpdateDialogOpen,
    setIsDeleteDialogOpen,
    setIsToggleStatusDialogOpen,
    setIsUpdateAvatarDialogOpen,
    setSelectedObserverId,
    fetchObservers,
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

  return (
    <ObserversContext.Provider value={value}>
      {children}
    </ObserversContext.Provider>
  );
}
