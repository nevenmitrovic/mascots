import { useMutation, useQuery } from "@tanstack/react-query";
import { createItem, deleteItem, editItem, fetchAll } from "../api/apiService";
import { useToast } from "../contexts/ToastContext";
import { queryClient } from "../reactQuery/queryClient";

export const useGetItems = <T extends { name: string; _id: string }>(
  queryKey: string[]
) => {
  const fallback: T[] = [];

  const { data = fallback } = useQuery<T[]>({
    queryKey,
    queryFn: () => fetchAll(queryKey[0]),
  });

  return data;
};

export const useCreateItem = <T>(queryKey: string[]) => {
  const { showToast } = useToast();

  const URLextension = queryKey[0];

  const { mutate } = useMutation({
    mutationFn: (data: T) => createItem<T>(URLextension, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      showToast(`Item je uspešno kreiran!`, "success");
    },
    onError: (error: any) => {
      showToast(`Item nije kreiran: ${error.message}`, "error");
    },
  });
  return mutate;
};

export const useEditItem = <T>(queryKey: string[]) => {
  const { showToast } = useToast();

  const URLextension = queryKey[0];

  const { mutate } = useMutation({
    mutationFn: ({ data, id }: { data: T; id: string }) => {
      return editItem<T>(URLextension, id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      showToast("Item je uspešno ažuriran!", "success");
    },
    onError: (error: any) => {
      showToast(`Item nije ažurirana: ${error.message}`, "error");
    },
  });
  return mutate;
};

export const useDeleteItem = (queryKey: string[]) => {
  const URLextension = queryKey[0];
  const { showToast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteItem(URLextension, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      showToast(`Item je uspešno obrisan!`, "success");
    },
    onError: (error: any) => {
      showToast(`Item nije obrisan: ${error.message}`, "error");
    },
  });

  return mutate;
};
