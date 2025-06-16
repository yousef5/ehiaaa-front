import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// =======================================================================================
// 🔔 NOTIFICATION STORE - Zustand Global State
// =======================================================================================
//
// Manages notifications and alerts for the blood donation app:
// 🩸 Blood shortage alerts
// 📅 Donation reminders and appointments
// 🏥 Emergency blood requests
// 👤 Personal notifications and achievements
// ⚙️ Notification preferences and settings
//
// =======================================================================================

export interface Notification {
  id: string;
  type:
    | "blood_shortage"
    | "donation_reminder"
    | "emergency_request"
    | "achievement"
    | "appointment"
    | "system";
  title: string;
  message: string;
  priority: "low" | "medium" | "high" | "urgent";
  isRead: boolean;
  actionRequired: boolean;
  actionUrl?: string;
  actionText?: string;
  createdAt: string;
  expiresAt?: string;
  metadata?: {
    bloodType?: string;
    location?: string;
    donationId?: string;
    campaignId?: string;
    userId?: string;
    achievement?: {
      type: string;
      level: number;
      badge: string;
    };
  };
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  bloodShortageAlerts: boolean;
  donationReminders: boolean;
  emergencyRequests: boolean;
  achievementNotifications: boolean;
  appointmentReminders: boolean;
  systemUpdates: boolean;
  quietHours: {
    enabled: boolean;
    start: string; // HH:mm format
    end: string; // HH:mm format
  };
  location: {
    enabled: boolean;
    radius: number; // km
    city?: string;
  };
  bloodTypes: string[]; // Blood types to receive alerts for
}

interface NotificationState {
  // State
  notifications: Notification[];
  preferences: NotificationPreferences;
  unreadCount: number;
  lastChecked: string | null;

  // Actions
  addNotification: (
    notification: Omit<Notification, "id" | "createdAt" | "isRead">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearExpiredNotifications: () => void;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;

  // Computed
  getUnreadNotifications: () => Notification[];
  getNotificationsByType: (type: Notification["type"]) => Notification[];
  getUrgentNotifications: () => Notification[];
  shouldShowNotification: (notification: Notification) => boolean;
}

const defaultPreferences: NotificationPreferences = {
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  bloodShortageAlerts: true,
  donationReminders: true,
  emergencyRequests: true,
  achievementNotifications: true,
  appointmentReminders: true,
  systemUpdates: true,
  quietHours: {
    enabled: false,
    start: "22:00",
    end: "08:00",
  },
  location: {
    enabled: true,
    radius: 20,
  },
  bloodTypes: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
};

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      // Initial State
      notifications: [],
      preferences: defaultPreferences,
      unreadCount: 0,
      lastChecked: null,

      // Actions
      addNotification: (notificationData) => {
        const notification: Notification = {
          ...notificationData,
          id: `notification-${Date.now()}-${Math.random()}`,
          createdAt: new Date().toISOString(),
          isRead: false,
        };

        // Check if notification should be shown based on preferences
        if (!get().shouldShowNotification(notification)) {
          return;
        }

        set((state) => {
          const newNotifications = [notification, ...state.notifications];
          return {
            notifications: newNotifications,
            unreadCount: state.unreadCount + 1,
          };
        });

        // Trigger browser notification if permissions are granted
        if (
          typeof window !== "undefined" &&
          "Notification" in window &&
          Notification.permission === "granted"
        ) {
          new Notification(notification.title, {
            body: notification.message,
            icon: "/logo.png",
            tag: notification.id,
          });
        }
      },

      markAsRead: (id) => {
        set((state) => {
          const notifications = state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          );
          const unreadCount = notifications.filter((n) => !n.isRead).length;

          return {
            notifications,
            unreadCount,
            lastChecked: new Date().toISOString(),
          };
        });
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            isRead: true,
          })),
          unreadCount: 0,
          lastChecked: new Date().toISOString(),
        }));
      },

      removeNotification: (id) => {
        set((state) => {
          const notifications = state.notifications.filter((n) => n.id !== id);
          const unreadCount = notifications.filter((n) => !n.isRead).length;

          return {
            notifications,
            unreadCount,
          };
        });
      },

      clearExpiredNotifications: () => {
        const now = new Date().toISOString();
        set((state) => {
          const notifications = state.notifications.filter(
            (n) => !n.expiresAt || n.expiresAt > now
          );
          const unreadCount = notifications.filter((n) => !n.isRead).length;

          return {
            notifications,
            unreadCount,
          };
        });
      },

      updatePreferences: (newPreferences) => {
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        }));
      },

      // Computed functions
      getUnreadNotifications: () => {
        return get().notifications.filter((n) => !n.isRead);
      },

      getNotificationsByType: (type) => {
        return get().notifications.filter((n) => n.type === type);
      },

      getUrgentNotifications: () => {
        return get().notifications.filter(
          (n) => n.priority === "urgent" && !n.isRead
        );
      },

      shouldShowNotification: (notification) => {
        const { preferences } = get();

        // Check if notification type is enabled
        switch (notification.type) {
          case "blood_shortage":
            if (!preferences.bloodShortageAlerts) return false;
            break;
          case "donation_reminder":
            if (!preferences.donationReminders) return false;
            break;
          case "emergency_request":
            if (!preferences.emergencyRequests) return false;
            break;
          case "achievement":
            if (!preferences.achievementNotifications) return false;
            break;
          case "appointment":
            if (!preferences.appointmentReminders) return false;
            break;
          case "system":
            if (!preferences.systemUpdates) return false;
            break;
        }

        // Check quiet hours
        if (preferences.quietHours.enabled) {
          const now = new Date();
          const currentTime = `${now
            .getHours()
            .toString()
            .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
          const start = preferences.quietHours.start;
          const end = preferences.quietHours.end;

          if (start < end) {
            // Same day quiet hours
            if (currentTime >= start && currentTime <= end) {
              return notification.priority === "urgent";
            }
          } else {
            // Overnight quiet hours
            if (currentTime >= start || currentTime <= end) {
              return notification.priority === "urgent";
            }
          }
        }

        // Check blood type relevance
        if (
          notification.metadata?.bloodType &&
          preferences.bloodTypes.length > 0
        ) {
          if (
            !preferences.bloodTypes.includes(notification.metadata.bloodType)
          ) {
            return false;
          }
        }

        return true;
      },
    }),
    {
      name: "ehiaaa-notifications-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        notifications: state.notifications.filter(
          (n) =>
            // Only persist notifications from the last 30 days
            new Date(n.createdAt).getTime() >
            Date.now() - 30 * 24 * 60 * 60 * 1000
        ),
        preferences: state.preferences,
        lastChecked: state.lastChecked,
      }),
    }
  )
);

// =======================================================================================
// 🔧 UTILITY HOOKS & SELECTORS
// =======================================================================================

// Notification selectors
export const useNotifications = () =>
  useNotificationStore((state) => state.notifications);
export const useUnreadCount = () =>
  useNotificationStore((state) => state.unreadCount);
export const useUnreadNotifications = () =>
  useNotificationStore((state) => state.getUnreadNotifications());
export const useUrgentNotifications = () =>
  useNotificationStore((state) => state.getUrgentNotifications());

// Preference selectors
export const useNotificationPreferences = () =>
  useNotificationStore((state) => state.preferences);

// Action selectors
export const useNotificationActions = () => ({
  add: useNotificationStore.getState().addNotification,
  markAsRead: useNotificationStore.getState().markAsRead,
  markAllAsRead: useNotificationStore.getState().markAllAsRead,
  remove: useNotificationStore.getState().removeNotification,
  clearExpired: useNotificationStore.getState().clearExpiredNotifications,
  updatePreferences: useNotificationStore.getState().updatePreferences,
});

// =======================================================================================
// 🎯 CONVENIENCE HOOKS
// =======================================================================================

// Quick notification creators
export const useQuickNotifications = () => {
  const { add } = useNotificationActions();

  return {
    bloodShortage: (bloodType: string, location?: string) =>
      add({
        type: "blood_shortage",
        title: `نقص حاد في فصيلة الدم ${bloodType}`,
        message: location
          ? `هناك نقص حاد في فصيلة الدم ${bloodType} في ${location}. تبرعك يمكن أن ينقذ حياة!`
          : `هناك نقص حاد في فصيلة الدم ${bloodType}. تبرعك يمكن أن ينقذ حياة!`,
        priority: "high",
        actionRequired: true,
        actionText: "تبرع الآن",
        actionUrl: "/donate",
        metadata: { bloodType, location },
      }),

    emergencyRequest: (bloodType: string, hospital: string) =>
      add({
        type: "emergency_request",
        title: "طلب طارئ للتبرع بالدم",
        message: `${hospital} يحتاج بشكل عاجل لفصيلة الدم ${bloodType}. كل دقيقة مهمة!`,
        priority: "urgent",
        actionRequired: true,
        actionText: "استجب للطلب",
        actionUrl: "/emergency-donate",
        metadata: { bloodType, location: hospital },
        expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours
      }),

    donationReminder: (nextEligibleDate: string) =>
      add({
        type: "donation_reminder",
        title: "حان وقت التبرع!",
        message: `يمكنك التبرع بالدم مرة أخرى اعتباراً من ${nextEligibleDate}. انقذ حياة اليوم!`,
        priority: "medium",
        actionRequired: false,
        actionText: "احجز موعد",
        actionUrl: "/book-appointment",
      }),

    achievement: (achievementType: string, level: number, badge: string) =>
      add({
        type: "achievement",
        title: "إنجاز جديد! 🏆",
        message: `تهانينا! لقد حصلت على وسام "${badge}" لإنجازك المتميز في التبرع بالدم.`,
        priority: "low",
        actionRequired: false,
        actionText: "عرض الإنجازات",
        actionUrl: "/profile/achievements",
        metadata: {
          achievement: { type: achievementType, level, badge },
        },
      }),
  };
};

// Notification permission manager
export const useNotificationPermission = () => {
  const requestPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return "not-supported";
    }

    const permission = await Notification.requestPermission();
    return permission;
  };

  const getPermissionStatus = () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return "not-supported";
    }

    return Notification.permission;
  };

  return {
    requestPermission,
    getPermissionStatus,
    isSupported: typeof window !== "undefined" && "Notification" in window,
  };
};
