import { QueryClient, QueryFilters } from "@tanstack/query-core";

declare function useIsFetching(
  filters?: QueryFilters,
  queryClient?: QueryClient
): number;

export { useIsFetching };
