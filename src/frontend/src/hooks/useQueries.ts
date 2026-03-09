import { useQuery } from "@tanstack/react-query";
import type { Tool } from "../backend.d.ts";
import { useActor } from "./useActor";

export function useAllTools() {
  const { actor, isFetching } = useActor();
  return useQuery<Tool[]>({
    queryKey: ["tools", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTools();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10 * 60 * 1000,
  });
}

export function useToolsByCategory(category: string, enabled = true) {
  const { actor, isFetching } = useActor();
  return useQuery<Tool[]>({
    queryKey: ["tools", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getToolsByCategory(category);
    },
    enabled: !!actor && !isFetching && enabled && !!category,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchTools(searchTerm: string, enabled = true) {
  const { actor, isFetching } = useActor();
  return useQuery<Tool[]>({
    queryKey: ["tools", "search", searchTerm],
    queryFn: async () => {
      if (!actor || !searchTerm.trim()) return [];
      return actor.searchTools(searchTerm);
    },
    enabled: !!actor && !isFetching && enabled && !!searchTerm.trim(),
    staleTime: 30 * 1000,
  });
}

export function useLatestTools(limit: number) {
  const { actor, isFetching } = useActor();
  return useQuery<Tool[]>({
    queryKey: ["tools", "latest", limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLatestTools(BigInt(limit));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });
}
