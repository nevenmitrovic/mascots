import { useState } from "react";

type ItemToEdit<T> = {
  id: string;
  item: Omit<T, "_id">;
};

const useItemToEdit = <T extends { _id: string }>() => {
  const [itemToEdit, setItemToEdit] = useState<ItemToEdit<T> | null>();

  const setItem = (data: T | null) => {
    if (data) {
      const { _id, ...rest } = data;
      setItemToEdit({ id: _id, item: rest });
    } else {
      setItemToEdit(null);
    }
  };

  console.log(itemToEdit);
  return { itemToEdit, setItem };
};

export default useItemToEdit;
