import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "reactQuery/queryClient";

import { createItem, deleteItem, editItem, fetchAll, partialEditItem } from "api/apiService";

import { useToast } from "contexts/ToastContext";

import { createPath } from "utils/helperFunctions";

export const useGetItems = <T>(queryKey: string[]) => {
  const fallback: T[] = [];

  const URLpath = createPath(queryKey)
  
  const { data = fallback } = useQuery<T[]>({
    queryKey,
    queryFn: () => fetchAll(URLpath),
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
      showToast(`Item nije ažuriran: ${error.message}`, "error");
    },
  });
  return mutate;
};

export const usePartialEditItem = <T>(queryKey: string[]) => {
  const { showToast } = useToast();

  const URLextension = queryKey[0];

  const { mutate } = useMutation({
    mutationFn: ({ data, id }: { data: T; id: string }) => {
      return partialEditItem<T>(URLextension, id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      showToast("Item je uspešno ažuriran!", "success");
    },
    onError: (error: any) => {
      showToast(`Item nije ažuriran: ${error.message}`, "error");
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
