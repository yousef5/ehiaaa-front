// Main export file - ObserverDialogWrapper.tsx
"use client";

import { Suspense } from "react";
import CreateObserverDialog from "./CreateObserverDialog";
import { ObserverDialogErrorBoundary } from "./components/ErrorBoundary";
import { FormLoadingOverlay } from "./components/LoadingStates";
import { DialogFocusProvider } from "./components/DialogFocusProvider";

interface ObserverDialogWrapperProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function ObserverDialogWrapper(
  props: ObserverDialogWrapperProps
) {
  return (
    <ObserverDialogErrorBoundary>
      <DialogFocusProvider>
        <Suspense fallback={<FormLoadingOverlay />}>
          <CreateObserverDialog {...props} />
        </Suspense>
      </DialogFocusProvider>
    </ObserverDialogErrorBoundary>
  );
}

// Export all components for individual use if needed
export { default as CreateObserverDialog } from "./CreateObserverDialog";
export { PersonalInfoSection } from "./sections/PersonalInfoSection";
export { AuthSection } from "./sections/AuthSection";
export { LocationSection } from "./sections/LocationSection";
export { AdditionalInfoSection } from "./sections/AdditionalInfoSection";
export { useObserverDialog } from "./hooks/useObserverDialog";
export { createObserverSchema, BLOOD_TYPES } from "./schema";
export type { CreateObserverFormData, BloodType } from "./schema";
export * from "./utils/helpers";
export * from "./components/LoadingStates";
