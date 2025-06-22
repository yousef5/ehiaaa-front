# Observer Users - React Query Refetch System

This document explains how the React Query refetch system works for Observer Users management.

## Overview

The Observer Users system now includes automatic query invalidation and refetching when:

- User avatars are updated or removed
- User status is activated or deactivated
- Any user data is modified

## Key Components

### 1. Custom Hook: `useObserverUsers`

Located in `/src/hooks/useObserverUsers.ts`

This hook provides:

- **Query data**: users, pagination, loading states
- **Refetch functions**: `refetchObserverUsers`, `invalidateObserverUsersQueries`
- **Mutations**: for avatar operations and user status changes

### 2. Custom Hook: `useObserverUser`

For managing individual user details with automatic query invalidation.

### 3. Context Provider: `ObserverUsersProvider`

Located in `/src/app/observer/users/page.tsx`

Provides refetch capabilities throughout the component tree.

## Usage Examples

### Automatic Refetch After Avatar Update

```typescript
// In ObserverAvatarUpload component
const handleUploadOrUpdate = async () => {
  try {
    await usersApi.updateUserAvatar(userId, selectedFile);

    // Automatic query invalidation happens here
    queryClient.invalidateQueries({ queryKey: ["observer-users"] });
    queryClient.invalidateQueries({
      queryKey: ["observer-user-detail", userId],
    });

    toast.success("تم تحديث الصورة الشخصية بنجاح");
  } catch (error) {
    // Error handling
  }
};
```

### Automatic Refetch After Status Change

```typescript
// In ObserverUserDetail component
const handleStatusDialogConfirm = async (action, reason) => {
  try {
    if (action === "activate") {
      await usersApi.activateUser(userId, reason);
    } else {
      await usersApi.deactivateUser(userId, reason);
    }

    // Automatic query invalidation
    queryClient.invalidateQueries({ queryKey: ["observer-users"] });
    queryClient.invalidateQueries({
      queryKey: ["observer-user-detail", userId],
    });

    refetch(); // Local refetch
  } catch (error) {
    // Error handling
  }
};
```

### Manual Refetch

```typescript
// In ObserverUsersList component
const { refetchObserverUsers } = useContext(ObserverUsersContext);

// Manual refetch when needed
const handleManualRefresh = () => {
  refetchObserverUsers();
};
```

## Query Keys Used

- `["observer-users", filters]` - Main users list with filters
- `["observer-user-detail", userId]` - Individual user details

## Benefits

1. **Automatic Updates**: Lists update automatically when individual users are modified
2. **Consistent Data**: All components show the same, up-to-date information
3. **Optimistic UI**: User sees immediate feedback while background sync happens
4. **Error Handling**: Comprehensive error handling with user-friendly messages
5. **Performance**: Smart caching with 5-minute stale time

## Files Modified

- `/src/components/observer/users/ObserverUsersList.tsx` - Added query client and refetch function
- `/src/components/observer/users/ObserverAvatarUpload.tsx` - Added query invalidation after avatar operations
- `/src/components/observer/users/ObserverUserDetail.tsx` - Added query invalidation after status changes
- `/src/hooks/useObserverUsers.ts` - New custom hook with mutations and query management
- `/src/app/observer/users/page.tsx` - Added context provider for refetch capabilities

## Best Practices

1. **Always invalidate related queries** when data changes
2. **Use consistent query keys** across all components
3. **Handle errors gracefully** with user-friendly messages
4. **Provide loading states** during operations
5. **Use toast notifications** to inform users of successful operations
