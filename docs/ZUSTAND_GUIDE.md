# 🏪 Zustand State Management Guide

## 🌟 Overview

**Zustand** is now the primary global state management solution for your blood donation app. It's lightweight, performant, and works perfectly with React Query for a complete data management solution.

## 🎯 Why Zustand?

- **🪶 Lightweight**: Only 2.5kb gzipped
- **⚡ Fast**: No providers, no HOCs, minimal boilerplate
- **🔄 React Query Integration**: Perfect complement for server state
- **📱 TypeScript**: Excellent TypeScript support
- **💾 Persistence**: Built-in localStorage persistence
- **🧪 DevTools**: Great debugging experience

## 🏗️ Architecture

```
src/
├── stores/
│   ├── authStore.ts          # 🔐 Authentication state
│   ├── uiStore.ts           # 🎨 UI state & preferences
│   └── notificationStore.ts # 🔔 Notifications system
├── components/
│   └── examples/
│       ├── ZustandExample.tsx    # 🏪 Complete demo
│       └── DonationsExample.tsx  # 🩸 React Query demo
└── hooks/
    └── useDonations.ts      # 🔄 React Query hooks
```

## 📚 Stores Overview

### 🔐 Authentication Store (`authStore.ts`)

Manages user authentication, profile data, and permissions.

```typescript
import {
  useUser,
  useIsAuthenticated,
  useAuthActions,
} from "@/stores/authStore";

function MyComponent() {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const { login, logout, updateUser } = useAuthActions();

  // Your component logic
}
```

**Key Features:**

- User profile with blood type, medical info, stats
- JWT token management with refresh
- Role-based permissions (donor, admin, medical_staff)
- Donation eligibility calculation
- Persistent storage

**Available Hooks:**

- `useUser()` - Current user data
- `useIsAuthenticated()` - Authentication status
- `useIsAdmin()` - Admin role check
- `useCanDonate()` - Donation eligibility
- `useUserInitials()` - User initials for avatars
- `useAuthActions()` - Authentication actions

### 🎨 UI Store (`uiStore.ts`)

Manages application UI state, preferences, and user experience.

```typescript
import {
  useSidebarState,
  useQuickToast,
  useAppSettings,
} from "@/stores/uiStore";

function MyComponent() {
  const sidebar = useSidebarState();
  const toast = useQuickToast();
  const settings = useAppSettings();

  // Show success message
  toast.success("Operation completed", "Your data has been saved");

  // Toggle sidebar
  const { toggle } = useSidebarActions();
  toggle();
}
```

**Key Features:**

- Sidebar and navigation state
- Modal management system
- Toast notifications with auto-dismiss
- App settings (language, font size, theme)
- Accessibility preferences
- Search state management

**Available Hooks:**

- `useSidebarState()` & `useSidebarActions()` - Sidebar control
- `useModals()` & `useModalActions()` - Modal management
- `useToasts()` & `useToastActions()` - Toast notifications
- `useQuickToast()` - Quick toast functions
- `useAppSettings()` - Application preferences
- `usePageState()` - Page title and breadcrumbs
- `useSearchState()` - Search functionality

### 🔔 Notification Store (`notificationStore.ts`)

Specialized store for blood donation notifications and alerts.

```typescript
import {
  useNotifications,
  useUnreadCount,
  useQuickNotifications,
} from "@/stores/notificationStore";

function NotificationComponent() {
  const notifications = useNotifications();
  const unreadCount = useUnreadCount();
  const { bloodShortage, emergencyRequest } = useQuickNotifications();

  // Trigger blood shortage alert
  bloodShortage("O+", "King Faisal Hospital");

  // Emergency request
  emergencyRequest("AB-", "Emergency Department");
}
```

**Key Features:**

- Blood shortage alerts with urgency levels
- Donation reminders and eligibility notifications
- Emergency blood requests with expiration
- Achievement and milestone notifications
- Smart filtering based on user preferences
- Browser notification integration
- Quiet hours and location-based filtering

**Available Hooks:**

- `useNotifications()` - All notifications
- `useUnreadCount()` - Unread notification count
- `useUnreadNotifications()` - Unread notifications only
- `useUrgentNotifications()` - Urgent notifications
- `useNotificationActions()` - Notification management
- `useQuickNotifications()` - Quick notification creators
- `useNotificationPermission()` - Browser permission management

## 🚀 Quick Start Guide

### 1. Basic Usage

```typescript
"use client";

import { useUser, useAuthActions } from "@/stores/authStore";
import { useQuickToast } from "@/stores/uiStore";

export function LoginButton() {
  const user = useUser();
  const { login, logout } = useAuthActions();
  const toast = useQuickToast();

  const handleLogin = async () => {
    try {
      await login({ email: "user@example.com", password: "password" });
      toast.success("Welcome back!", `Hello ${user?.name}`);
    } catch (error) {
      toast.error("Login failed", "Please check your credentials");
    }
  };

  return (
    <button onClick={handleLogin}>
      {user ? `Hello ${user.name}` : "Login"}
    </button>
  );
}
```

### 2. Advanced Usage with Multiple Stores

```typescript
import { useUser, useCanDonate } from "@/stores/authStore";
import { useQuickNotifications } from "@/stores/notificationStore";
import { useQuickToast } from "@/stores/uiStore";

export function DonationStatus() {
  const user = useUser();
  const canDonate = useCanDonate();
  const notifications = useQuickNotifications();
  const toast = useQuickToast();

  const checkEligibility = () => {
    if (!user) {
      toast.warning("Please login first");
      return;
    }

    if (canDonate) {
      notifications.donationReminder("You can donate now!");
      toast.success("You are eligible to donate!");
    } else {
      toast.info("Please wait before your next donation");
    }
  };

  return (
    <div>
      <h3>Donation Status for {user?.name}</h3>
      <p>Blood Type: {user?.bloodType}</p>
      <p>Status: {canDonate ? "✅ Eligible" : "⏳ Not yet eligible"}</p>
      <button onClick={checkEligibility}>Check Eligibility</button>
    </div>
  );
}
```

### 3. Form State Management

```typescript
import { useState } from "react";
import { useAuthActions } from "@/stores/authStore";
import { useQuickToast } from "@/stores/uiStore";

export function ProfileForm() {
  const { updateUser } = useAuthActions();
  const toast = useQuickToast();

  const [formData, setFormData] = useState({
    name: "",
    bloodType: "O+",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(formData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

## 🔧 Best Practices

### 1. **Selector Optimization**

Use specific selectors to prevent unnecessary re-renders:

```typescript
// ❌ This will re-render on any auth state change
const authState = useAuthStore();

// ✅ This only re-renders when user changes
const user = useUser();
const isAuthenticated = useIsAuthenticated();
```

### 2. **Action Grouping**

Group related actions together:

```typescript
// ✅ Good - grouped actions
const { login, logout, updateUser } = useAuthActions();

// ❌ Avoid - importing individual actions
const login = useAuthStore((state) => state.login);
const logout = useAuthStore((state) => state.logout);
```

### 3. **Type Safety**

Always use TypeScript interfaces:

```typescript
interface User {
  id: string;
  name: string;
  bloodType: BloodType;
  // ... other properties
}

// Store is fully typed
const user: User | null = useUser();
```

### 4. **Error Handling**

Always handle async operations:

```typescript
const { login } = useAuthActions();
const toast = useQuickToast();

const handleLogin = async () => {
  try {
    await login(credentials);
    toast.success("Login successful");
  } catch (error) {
    toast.error("Login failed", error.message);
  }
};
```

### 5. **Persistence Strategy**

Be selective about what you persist:

```typescript
// Only persist essential data
partialize: (state) => ({
  user: state.user,
  preferences: state.preferences,
  // Don't persist temporary UI state
});
```

## 🎨 UI Patterns

### Modal Management

```typescript
import { useModalActions } from "@/stores/uiStore";

const { open, close } = useModalActions();

// Open modal
open({
  id: "donation-form",
  title: "Register Donation",
  content: <DonationForm />,
  size: "lg",
});

// Close modal
close("donation-form");
```

### Toast Notifications

```typescript
import { useQuickToast } from "@/stores/uiStore";

const toast = useQuickToast();

// Different toast types
toast.success("Success message");
toast.error("Error message");
toast.warning("Warning message");
toast.info("Info message");
```

### Sidebar Control

```typescript
import { useSidebarActions } from "@/stores/uiStore";

const { toggle, setOpen, toggleCollapsed } = useSidebarActions();

// Toggle sidebar
toggle();

// Set specific state
setOpen(true);

// Toggle collapsed state
toggleCollapsed();
```

## 🔄 Integration with React Query

Zustand handles **client state**, React Query handles **server state**:

```typescript
// ✅ Perfect combination
function DonationDashboard() {
  // Client state (Zustand)
  const user = useUser();
  const toast = useQuickToast();

  // Server state (React Query)
  const { data: donations, isLoading } = useDonations();
  const createMutation = useCreateDonation();

  const handleDonate = async () => {
    try {
      await createMutation.mutateAsync({
        donorId: user.id,
        bloodType: user.bloodType,
        // ... other data
      });
      toast.success("Donation registered successfully");
    } catch (error) {
      toast.error("Failed to register donation");
    }
  };
}
```

## 🛠️ Development Tools

### DevTools

Access Zustand DevTools in development:

```typescript
// Automatic DevTools integration
// Open browser DevTools > Redux tab to inspect Zustand stores
```

### Debugging

```typescript
// Add logging to actions
const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // ... your store
      }),
      { name: "auth-storage" }
    ),
    { name: "auth-store" } // DevTools name
  )
);
```

## 📱 Testing

### Testing Stores

```typescript
import { renderHook, act } from "@testing-library/react";
import { useAuthStore } from "@/stores/authStore";

test("should login user", async () => {
  const { result } = renderHook(() => useAuthStore());

  await act(async () => {
    await result.current.login({
      email: "test@example.com",
      password: "password",
    });
  });

  expect(result.current.isAuthenticated).toBe(true);
});
```

### Mocking in Tests

```typescript
// Mock store for testing
jest.mock("@/stores/authStore", () => ({
  useUser: () => mockUser,
  useIsAuthenticated: () => true,
  useAuthActions: () => mockActions,
}));
```

## 🚀 Performance Tips

1. **Use specific selectors** instead of entire store
2. **Memoize complex computations** in selectors
3. **Batch updates** when possible
4. **Use shallow comparison** for object selectors
5. **Avoid creating objects in selectors**

```typescript
// ✅ Good - specific selector
const userName = useAuthStore((state) => state.user?.name);

// ✅ Good - memoized selector
const userStats = useAuthStore(
  (state) => state.user?.stats,
  shallow // Import from 'zustand/shallow'
);

// ❌ Avoid - creating objects in selector
const userInfo = useAuthStore((state) => ({
  name: state.user?.name,
  email: state.user?.email,
}));
```

## 📖 Migration Guide

### From Redux

```typescript
// Redux
const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
});

// Zustand
const user = useUser();
const isLoading = useAuthStore((state) => state.isLoading);
```

### From Context API

```typescript
// Context API
const { user, login, logout } = useContext(AuthContext);

// Zustand
const user = useUser();
const { login, logout } = useAuthActions();
```

## 🔗 Related Documentation

- [React Query Guide](./REACT_QUERY_GUIDE.md)
- [API Integration](./API_INTEGRATION.md)
- [Component Patterns](./COMPONENT_PATTERNS.md)

---

**Happy coding with Zustand! 🎉**
