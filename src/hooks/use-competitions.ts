import { useQuery } from "@tanstack/react-query";
import { fetchSchools, fetchSports } from "@/lib/services/competitions";

export function useSchools() {
  return useQuery({
    queryKey: ["competitions", "schools"],
    queryFn: fetchSchools,
  });
}

export function useSports() {
  return useQuery({
    queryKey: ["competitions", "sports"],
    queryFn: fetchSports,
  });
}
