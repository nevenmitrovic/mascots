import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  createItem,
  deleteItem,
  editItem,
  fetchAll,
} from "../api/crudActions";
import { useToast } from "../contexts/ToastContext";
import { queryClient } from "../reactQuery/queryClient";

export const useGetItems = <T extends { name: string; _id: string }>(
  queryKey: string[]
) => {
  const fallback: T[] = [];

  const { data: fullData = fallback } = useQuery<T[]>({
    queryKey,
    queryFn: () => fetchAll(queryKey[0]),
  });

  const selectedData = useMemo(() => {
    return fullData?.map((item: T) => ({
      title: item.name,
      value: item._id,
    }));
  }, [fullData]);

  return { fullData, selectedData };
};

export const useCreateItem = <T>(queryKey: string[]) => {
  const URLextension = queryKey[0];

  const { mutate } = useMutation({
    mutationFn: (data: Partial<T>) => createItem<T>(URLextension, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
  return mutate;
};

export const useEditItem = <T extends { _id: string }>(queryKey: string[]) => {
  const { showToast } = useToast();

  const URLextension = queryKey[0];

  const { mutate } = useMutation({
    mutationFn: (data: T) => {
      const { _id, ...restOfData } = data;
      return editItem(URLextension, _id, restOfData as Partial<T>);
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

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteItem(URLextension, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return mutate;
};
