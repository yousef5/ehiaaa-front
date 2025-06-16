import { observerApi } from "@/lib/api";
import { axiosInstance } from "@/lib/axios";
import {
  CreateObserverRequest,
  CreateObserverResponse,
} from "@/types/observer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type ObserverStatus = "active" | "inactive" | "all";

interface UseObserversOptions {
  status: ObserverStatus;
  page: number;
  limit: number;
}

export function useObservers({ status, page, limit }: UseObserversOptions) {
  const queryClient = useQueryClient();

  // Query for fetching observers
  const { data, isLoading, error } = useQuery({
    queryKey: ["observers", { status, page, limit }],
    queryFn: async () => {
      const response = await observerApi.getAllObservers(status, page, limit);
      return {
        observers: response.observers || [],
        total: response.pagination?.totalItems || 0,
        totalPages: response.pagination?.totalPages || 1,
      };
    },
  });

  // Mutation for creating an observer
  const createObserverMutation = useMutation({
    mutationFn: async (
      data: CreateObserverRequest
    ): Promise<CreateObserverResponse> => {
      const response = await axiosInstance.post("/observers", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["observers"] });
    },
  });

  // Mutation for updating an observer
  const updateObserverMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      observerApi.updateObserver(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["observers"] });
    },
  });

  // Mutation for deleting an observer
  const deleteObserverMutation = useMutation({
    mutationFn: (id: string) => observerApi.deleteObserver(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["observers"] });
    },
  });

  // Mutation for activating an observer
  const activateObserverMutation = useMutation({
    mutationFn: (id: string) => observerApi.activateObserver(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["observers"] });
    },
  });

  // Mutation for deactivating an observer
  const deactivateObserverMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      observerApi.deactivateObserver(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["observers"] });
    },
  });

  // Mutation for updating observer avatar
  const updateAvatarMutation = useMutation({
    mutationFn: ({ id, avatarFile }: { id: string; avatarFile: File }) =>
      observerApi.updateObserverAvatar(id, avatarFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["observers"] });
    },
  });

  return {
    observers: data?.observers || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 1,
    isLoading,
    error,
    createObserverMutation,
    updateObserverMutation,
    deleteObserverMutation,
    activateObserverMutation,
    deactivateObserverMutation,
    updateAvatarMutation,
  };
}
