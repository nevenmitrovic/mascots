import { useQuery } from "@tanstack/react-query";
import { fetchAllLocations } from "../api/locationActions";
import { queryKeys } from "../reactQuery/constants";
import { Location } from "../types/locationTypes";

export const useLocations = (): Location[] => {
  const fallback: Location[] = [];

  const { data = fallback } = useQuery({
    queryKey: [queryKeys.locations],
    queryFn: fetchAllLocations,
  });
  return data;
};
