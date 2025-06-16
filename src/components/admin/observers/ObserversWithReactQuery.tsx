"use client";

import { ObserversContent } from "./ObserversContent";
import { useObserversData } from "./hooks/useObserversData";

// Import components
import ObserverDialogWrapper from "@/components/createObserverDialog/ObserverDialogWrapper";
import UpdateObserverDialogWrapper from "@/components/updateObserverDialog/UpdateObserverDialogWrapper";
import DeleteObserverDialog from "./DeleteObserverDialog";
import ToggleObserverStatusDialog from "./ToggleObserverStatusDialog";
import UpdateAvatarDialog from "./UpdateAvatarDialog";

export function ObserversWithReactQuery() {
  const {
    // Data
    observers,
    total,
    totalPages,
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
  } = useObserversData();

  return (
    <>
      <ObserversContent
        observers={observers}
        total={total}
        totalPages={totalPages}
        isLoading={isLoading}
        status={status}
        page={page}
        limit={limit}
        handleCreateObserver={handleCreateObserver}
        handleUpdateObserver={handleUpdateObserver}
        handleDeleteObserver={handleDeleteObserver}
        handleToggleObserverStatus={handleToggleObserverStatus}
        handleUpdateAvatar={handleUpdateAvatar}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handleLimitChange={handleLimitChange}
        handleStatusChange={handleStatusChange}
      />

      {/* Create Observer Dialog */}
      <ObserverDialogWrapper
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={handleObserverCreated}
      />

      {/* Update Observer Dialog */}
      {selectedObserverId && isUpdateDialogOpen && (
        <UpdateObserverDialogWrapper
          isOpen={isUpdateDialogOpen}
          onOpenChange={setIsUpdateDialogOpen}
          observerId={selectedObserverId}
          onSuccess={handleObserverUpdated}
        />
      )}

      {/* Delete Observer Dialog */}
      {selectedObserver && isDeleteDialogOpen && (
        <DeleteObserverDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          observer={selectedObserver}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      )}

      {/* Toggle Observer Status Dialog */}
      {selectedObserver && isToggleStatusDialogOpen && (
        <ToggleObserverStatusDialog
          isOpen={isToggleStatusDialogOpen}
          onOpenChange={setIsToggleStatusDialogOpen}
          observer={selectedObserver}
          onConfirm={handleConfirmToggleStatus}
          isLoading={isTogglingStatus}
        />
      )}

      {/* Update Avatar Dialog */}
      {selectedObserver && isUpdateAvatarDialogOpen && (
        <UpdateAvatarDialog
          isOpen={isUpdateAvatarDialogOpen}
          onOpenChange={setIsUpdateAvatarDialogOpen}
          observer={selectedObserver}
          onConfirm={handleConfirmAvatarUpdate}
          isLoading={isUpdatingAvatar}
        />
      )}
    </>
  );
}
