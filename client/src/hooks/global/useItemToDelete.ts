import { useState } from "react";

import { useToggle } from "./useToggle";

const useItemToDelete = () => {
  const [deleteDialog, toggleDeleteDialog] = useToggle(false);
  const [deleteId, setDeleteId] = useState<string>("");

  const setDelete = (id = "") => {
    setDeleteId(id);
    toggleDeleteDialog();
  };

  const handleDeleteDialogClose = () => {
    toggleDeleteDialog();
    setDeleteId("");
  };

  return {
    deleteId,
    setDelete,
    deleteDialog,
    handleDeleteDialogClose,
  };
};

export default useItemToDelete;
