import { useState } from "react";

import { useToggle } from "./useToggle";

export type ItemToEdit<T> = {
  id: string;
  item: Omit<T, "_id">;
};

const useItemToEdit = <T extends { _id: string }>() => {
  const [itemToEdit, setItemToEdit] = useState<ItemToEdit<T> | null>(null);
  const [editDialog, toggleEditDialog] = useToggle(false);

  const setItemEdit = (data: T | null) => {
    if (data) {
      const { _id, ...rest } = data;
      setItemToEdit({ id: _id, item: rest });
      toggleEditDialog();
    } else {
      setItemToEdit(null);
    }
  };

  const handleEditDialogClose = () => {
    toggleEditDialog();
    setItemEdit(null);
  };

  return {
    itemToEdit,
    setItemEdit,
    editDialog,
    toggleEditDialog,
    handleEditDialogClose,
  };
};

export default useItemToEdit;
