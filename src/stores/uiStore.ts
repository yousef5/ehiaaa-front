import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// =======================================================================================
// 🎨 UI STATE STORE - Zustand Global State
// =======================================================================================
//
// Manages UI state across the entire app:
// 🎭 Modal states and content
// 📱 Sidebar and navigation state
// 🎯 Loading indicators and overlays
// 📢 Toast notifications and alerts
// ⚙️ App preferences and settings
//
// =======================================================================================

interface Modal {
  id: string;
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closable?: boolean;
  onClose?: () => void;
}

interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface UIState {
  // Sidebar & Navigation
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;

  // Modals
  modals: Modal[];

  // Loading States
  globalLoading: boolean;
  loadingText: string;

  // Toasts & Notifications
  toasts: Toast[];

  // App Settings
  language: "ar" | "en";
  direction: "rtl" | "ltr";
  fontSize: "sm" | "md" | "lg";
  reducedMotion: boolean;
  highContrast: boolean;

  // Page State
  pageTitle: string;
  breadcrumbs: Array<{ label: string; href?: string }>;

  // Search
  searchOpen: boolean;
  searchQuery: string;

  // Actions - Sidebar
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;

  // Actions - Modals
  openModal: (modal: Omit<Modal, "isOpen">) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;

  // Actions - Loading
  setGlobalLoading: (loading: boolean, text?: string) => void;

  // Actions - Toasts
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;

  // Actions - Settings
  setLanguage: (language: "ar" | "en") => void;
  setFontSize: (size: "sm" | "md" | "lg") => void;
  setReducedMotion: (reduced: boolean) => void;
  setHighContrast: (contrast: boolean) => void;

  // Actions - Page
  setPageTitle: (title: string) => void;
  setBreadcrumbs: (
    breadcrumbs: Array<{ label: string; href?: string }>
  ) => void;

  // Actions - Search
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Initial State
      sidebarOpen: true,
      sidebarCollapsed: false,
      mobileMenuOpen: false,
      modals: [],
      globalLoading: false,
      loadingText: "",
      toasts: [],
      language: "ar",
      direction: "rtl",
      fontSize: "md",
      reducedMotion: false,
      highContrast: false,
      pageTitle: "",
      breadcrumbs: [],
      searchOpen: false,
      searchQuery: "",

      // Sidebar Actions
      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setSidebarOpen: (open) => {
        set({ sidebarOpen: open });
      },

      toggleSidebarCollapsed: () => {
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
      },

      setSidebarCollapsed: (collapsed) => {
        set({ sidebarCollapsed: collapsed });
      },

      toggleMobileMenu: () => {
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }));
      },

      setMobileMenuOpen: (open) => {
        set({ mobileMenuOpen: open });
      },

      // Modal Actions
      openModal: (modal) => {
        const id = modal.id || `modal-${Date.now()}`;
        set((state) => ({
          modals: [
            ...state.modals,
            {
              ...modal,
              id,
              isOpen: true,
              closable: modal.closable !== false,
            },
          ],
        }));
      },

      closeModal: (id) => {
        set((state) => ({
          modals: state.modals.filter((modal) => modal.id !== id),
        }));
      },

      closeAllModals: () => {
        set({ modals: [] });
      },

      // Loading Actions
      setGlobalLoading: (loading, text = "") => {
        set({ globalLoading: loading, loadingText: text });
      },

      // Toast Actions
      addToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        const newToast: Toast = {
          ...toast,
          id,
          duration: toast.duration || 5000,
        };

        set((state) => ({
          toasts: [...state.toasts, newToast],
        }));

        // Auto remove toast
        if (newToast.duration && newToast.duration > 0) {
          setTimeout(() => {
            get().removeToast(id);
          }, newToast.duration);
        }
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      },

      clearAllToasts: () => {
        set({ toasts: [] });
      },

      // Settings Actions
      setLanguage: (language) => {
        set({
          language,
          direction: language === "ar" ? "rtl" : "ltr",
        });

        // Update document direction
        if (typeof document !== "undefined") {
          document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
          document.documentElement.lang = language;
        }
      },

      setFontSize: (fontSize) => {
        set({ fontSize });

        // Apply font size to document
        if (typeof document !== "undefined") {
          document.documentElement.classList.remove(
            "text-sm",
            "text-md",
            "text-lg"
          );
          document.documentElement.classList.add(`text-${fontSize}`);
        }
      },

      setReducedMotion: (reducedMotion) => {
        set({ reducedMotion });

        // Apply reduced motion preference
        if (typeof document !== "undefined") {
          if (reducedMotion) {
            document.documentElement.classList.add("reduce-motion");
          } else {
            document.documentElement.classList.remove("reduce-motion");
          }
        }
      },

      setHighContrast: (highContrast) => {
        set({ highContrast });

        // Apply high contrast mode
        if (typeof document !== "undefined") {
          if (highContrast) {
            document.documentElement.classList.add("high-contrast");
          } else {
            document.documentElement.classList.remove("high-contrast");
          }
        }
      },

      // Page Actions
      setPageTitle: (pageTitle) => {
        set({ pageTitle });

        // Update document title
        if (typeof document !== "undefined") {
          document.title = pageTitle ? `${pageTitle} - إحياء` : "إحياء";
        }
      },

      setBreadcrumbs: (breadcrumbs) => {
        set({ breadcrumbs });
      },

      // Search Actions
      setSearchOpen: (searchOpen) => {
        set({ searchOpen });
      },

      setSearchQuery: (searchQuery) => {
        set({ searchQuery });
      },
    }),
    {
      name: "ehiaaa-ui-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        language: state.language,
        direction: state.direction,
        fontSize: state.fontSize,
        reducedMotion: state.reducedMotion,
        highContrast: state.highContrast,
      }),
    }
  )
);

// =======================================================================================
// 🔧 UTILITY HOOKS & SELECTORS
// =======================================================================================

// Sidebar selectors
export const useSidebarOpen = () => useUIStore((state) => state.sidebarOpen);
export const useSidebarCollapsed = () =>
  useUIStore((state) => state.sidebarCollapsed);
export const useMobileMenuOpen = () =>
  useUIStore((state) => state.mobileMenuOpen);

export const useSidebarActions = () => ({
  toggle: useUIStore.getState().toggleSidebar,
  setOpen: useUIStore.getState().setSidebarOpen,
  toggleCollapsed: useUIStore.getState().toggleSidebarCollapsed,
  setCollapsed: useUIStore.getState().setSidebarCollapsed,
  toggleMobileMenu: useUIStore.getState().toggleMobileMenu,
  setMobileMenuOpen: useUIStore.getState().setMobileMenuOpen,
});

// Modal selectors
export const useModals = () => useUIStore((state) => state.modals);
export const useModalActions = () => ({
  open: useUIStore.getState().openModal,
  close: useUIStore.getState().closeModal,
  closeAll: useUIStore.getState().closeAllModals,
});

// Toast selectors
export const useToasts = () => useUIStore((state) => state.toasts);
export const useToastActions = () => ({
  add: useUIStore.getState().addToast,
  remove: useUIStore.getState().removeToast,
  clear: useUIStore.getState().clearAllToasts,
});

// Loading selectors
export const useGlobalLoading = () =>
  useUIStore((state) => state.globalLoading);
export const useLoadingText = () => useUIStore((state) => state.loadingText);

// Settings selectors
export const useLanguage = () => useUIStore((state) => state.language);
export const useDirection = () => useUIStore((state) => state.direction);
export const useFontSize = () => useUIStore((state) => state.fontSize);
export const useReducedMotion = () =>
  useUIStore((state) => state.reducedMotion);
export const useHighContrast = () => useUIStore((state) => state.highContrast);

// Page selectors
export const usePageTitle = () => useUIStore((state) => state.pageTitle);
export const useBreadcrumbs = () => useUIStore((state) => state.breadcrumbs);

// Search selectors
export const useSearchOpen = () => useUIStore((state) => state.searchOpen);
export const useSearchQuery = () => useUIStore((state) => state.searchQuery);

// =======================================================================================
// 🎯 CONVENIENCE HOOKS
// =======================================================================================

// Quick toast functions
export const useQuickToast = () => {
  const { add } = useToastActions();

  return {
    success: (title: string, message?: string) =>
      add({ type: "success", title, message }),
    error: (title: string, message?: string) =>
      add({ type: "error", title, message }),
    warning: (title: string, message?: string) =>
      add({ type: "warning", title, message }),
    info: (title: string, message?: string) =>
      add({ type: "info", title, message }),
  };
};
