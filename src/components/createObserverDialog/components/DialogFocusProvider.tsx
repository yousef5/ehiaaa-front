import React, { createContext, useContext, useRef, useEffect } from "react";

interface DialogFocusContextType {
  registerFocusable: (id: string, element: HTMLElement) => void;
  unregisterFocusable: (id: string) => void;
  trapFocus: (id: string) => void;
  releaseFocus: () => void;
}

const DialogFocusContext = createContext<DialogFocusContextType | null>(null);

export function useDialogFocus() {
  const context = useContext(DialogFocusContext);
  if (!context) {
    throw new Error("useDialogFocus must be used within a DialogFocusProvider");
  }
  return context;
}

export function DialogFocusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const focusableElements = useRef<Map<string, HTMLElement>>(new Map());
  const currentTrappedId = useRef<string | null>(null);

  const registerFocusable = (id: string, element: HTMLElement) => {
    focusableElements.current.set(id, element);
  };

  const unregisterFocusable = (id: string) => {
    focusableElements.current.delete(id);
    if (currentTrappedId.current === id) {
      currentTrappedId.current = null;
    }
  };

  const trapFocus = (id: string) => {
    currentTrappedId.current = id;
    // Remove aria-hidden from all ancestors
    const element = focusableElements.current.get(id);
    if (element) {
      let parent = element.parentElement;
      while (parent) {
        if (parent.hasAttribute("aria-hidden")) {
          parent.setAttribute(
            "data-original-aria-hidden",
            parent.getAttribute("aria-hidden") || "true"
          );
          parent.removeAttribute("aria-hidden");
        }
        parent = parent.parentElement;
      }
    }
  };

  const releaseFocus = () => {
    // Restore aria-hidden attributes
    if (currentTrappedId.current) {
      const element = focusableElements.current.get(currentTrappedId.current);
      if (element) {
        let parent = element.parentElement;
        while (parent) {
          if (parent.hasAttribute("data-original-aria-hidden")) {
            parent.setAttribute(
              "aria-hidden",
              parent.getAttribute("data-original-aria-hidden") || "true"
            );
            parent.removeAttribute("data-original-aria-hidden");
          }
          parent = parent.parentElement;
        }
      }
    }
    currentTrappedId.current = null;
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      focusableElements.current.clear();
      currentTrappedId.current = null;
    };
  }, []);

  return (
    <DialogFocusContext.Provider
      value={{
        registerFocusable,
        unregisterFocusable,
        trapFocus,
        releaseFocus,
      }}
    >
      {children}
    </DialogFocusContext.Provider>
  );
}
