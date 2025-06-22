import { observerApi } from "@/lib/api";
import { useQuickToast } from "@/stores/uiStore";
import { Observer } from "@/types/observer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ObserverStatus } from "../types";

export function useObserversData() {
  const toast = useQuickToast();
  const queryClient = useQueryClient();

  // State
  const [status, setStatus] = useState<ObserverStatus>("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>("all");
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
  const { data: rawData, isLoading } = useQuery({
    queryKey: ["observers", { status, page: 1, limit: 1000 }], // Fetch all data for client-side filtering
    queryFn: async () => {
      const response = await observerApi.getAllObservers(status, 1, 1000);
      return {
        observers: response.observers || [],
        total: response.pagination?.totalItems || 0,
        totalPages: response.pagination?.totalPages || 1,
      };
    },
  });

  // Client-side filtering
  const filteredObservers = useMemo(() => {
    if (!rawData?.observers) return [];

    return rawData.observers.filter((observer) => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesName = observer.name?.toLowerCase().includes(searchLower);
        const matchesEmail = observer.email
          ?.toLowerCase()
          .includes(searchLower);
        const matchesPhone = observer.phone
          ?.toLowerCase()
          .includes(searchLower);
        const matchesAddress = observer.address
          ?.toLowerCase()
          .includes(searchLower);

        if (!matchesName && !matchesEmail && !matchesPhone && !matchesAddress) {
          return false;
        }
      }

      // City filter
      if (selectedCity !== "all") {
        if (!observer.city || observer.city.id !== selectedCity) {
          return false;
        }
      }

      // Governorate filter
      if (selectedGovernorate !== "all") {
        if (
          !observer.city?.governorate ||
          observer.city.governorate.id !== selectedGovernorate
        ) {
          return false;
        }
      }

      return true;
    });
  }, [rawData?.observers, searchQuery, selectedCity, selectedGovernorate]);

  // Pagination for filtered results
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const observers = filteredObservers.slice(startIndex, endIndex);
    const total = filteredObservers.length;
    const totalPages = Math.ceil(total / limit);

    return {
      observers,
      total,
      totalPages,
    };
  }, [filteredObservers, page, limit]);

  // Get unique cities and governorates for filter options (not needed since we get them from observers)

  const filterOptions = useMemo(() => {
    const citiesMap = new Map<
      string,
      {
        id: string;
        nameAr: string;
        governorateId: string;
      }
    >();
    const governoratesMap = new Map<string, { id: string; nameAr: string }>();

    rawData?.observers.forEach((observer) => {
      if (observer.city) {
        // Use city ID as key to ensure uniqueness
        citiesMap.set(observer.city.id, {
          id: observer.city.id,
          nameAr: observer.city.nameAr,
          governorateId: observer.city.governorateId,
        });

        if (observer.city.governorate) {
          // Use governorate ID as key to ensure uniqueness
          governoratesMap.set(observer.city.governorate.id, {
            id: observer.city.governorate.id,
            nameAr: observer.city.governorate.nameAr,
          });
        }
      }
    });

    return {
      cities: Array.from(citiesMap.values()).sort((a, b) =>
        a.nameAr.localeCompare(b.nameAr)
      ),
      governorates: Array.from(governoratesMap.values()).sort((a, b) =>
        a.nameAr.localeCompare(b.nameAr)
      ),
    };
  }, [rawData?.observers]);

  // Filter cities based on selected governorate
  const filteredCities = useMemo(() => {
    if (selectedGovernorate === "all") {
      return filterOptions.cities;
    }
    return filterOptions.cities.filter(
      (city) => city.governorateId === selectedGovernorate
    );
  }, [filterOptions.cities, selectedGovernorate]);

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
    const observer = paginatedData?.observers.find(
      (obs) => obs.id === observerId
    );
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
    const observer = paginatedData?.observers.find(
      (obs) => obs.id === observerId
    );
    if (observer) {
      setSelectedObserver(observer);
      setIsToggleStatusDialogOpen(true);
    }
  };

  const handleUpdateAvatar = (observerId: string) => {
    const observer = paginatedData?.observers.find(
      (obs) => obs.id === observerId
    );
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
    if (page < (paginatedData?.totalPages || 1)) {
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

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    setPage(1);
  };

  const handleGovernorateChange = (value: string) => {
    setSelectedGovernorate(value);
    if (value === "all") {
      setSelectedCity("all"); // Reset city when governorate changes to "all"
    } else {
      // Reset city selection when governorate changes
      const citiesInGovernorate = filterOptions.cities.filter(
        (city) => city.governorateId === value
      );
      if (citiesInGovernorate.length > 0 && selectedCity !== "all") {
        const cityExists = citiesInGovernorate.some(
          (city) => city.id === selectedCity
        );
        if (!cityExists) {
          setSelectedCity("all");
        }
      }
    }
    setPage(1);
  };

  const isDeleting = deleteMutation.isPending;
  const isTogglingStatus =
    activateMutation.isPending || deactivateMutation.isPending;
  const isUpdatingAvatar = updateAvatarMutation.isPending;

  return {
    // Data
    observers: paginatedData?.observers || [],
    total: paginatedData?.total || 0,
    totalPages: paginatedData?.totalPages || 1,
    isLoading,
    status,
    page,
    limit,

    // Search and filter state
    searchQuery,
    selectedCity,
    selectedGovernorate,
    filterOptions,
    filteredCities,

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
    handleSearchChange,
    handleCityChange,
    handleGovernorateChange,
    handleObserverCreated,
    handleObserverUpdated,
  };
}
