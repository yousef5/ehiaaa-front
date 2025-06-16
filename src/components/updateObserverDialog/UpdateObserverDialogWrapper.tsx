"use client";

import { Suspense } from "react";
import UpdateObserverDialog from "./UpdateObserverDialog";
import { ObserverDialogErrorBoundary } from "../createObserverDialog/components/ErrorBoundary";
import { FormLoadingOverlay } from "../createObserverDialog/components/LoadingStates";
import { DialogFocusProvider } from "../createObserverDialog/components/DialogFocusProvider";
import type { Observer } from "@/types/observer";

interface UpdateObserverDialogWrapperProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  observerId: string;
  onSuccess?: (data: {
    message: string;
    observer: Observer;
    updatedBy: string;
    updatedAt: string;
  }) => void;
}

export default function UpdateObserverDialogWrapper(
  props: UpdateObserverDialogWrapperProps
) {
  return (
    <ObserverDialogErrorBoundary>
      <DialogFocusProvider>
        <Suspense fallback={<FormLoadingOverlay />}>
          <UpdateObserverDialog {...props} />
        </Suspense>
      </DialogFocusProvider>
    </ObserverDialogErrorBoundary>
  );
}

// Export components for individual use if needed
export { default as UpdateObserverDialog } from "./UpdateObserverDialog";
export { updateObserverSchema } from "./schema";
export type { UpdateObserverFormData } from "./schema";
