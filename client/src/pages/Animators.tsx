import { Box, Dialog, Divider } from "@mui/material";
import { useState } from "react";
import FormComponent from "../components/form/FormComponent";
import PageHeader from "../components/global/PageHeader";
import {
  useCreateItem,
  useDeleteItem,
  useEditItem,
  useGetItems,
} from "../hooks/genericHooks";
import TContainer from "../components/table/TContainer";
import { useToggle } from "../hooks/useToggle";
import { queryKeys } from "../reactQuery/constants";
import { Animator, animatorInputs } from "../types/animatorsTypes";

const Animators = () => {
  //form data for edit or creating new location
  const [editItem, setEditItem] = useState<Animator | undefined>(undefined);

  //toggle dialog to open or close form dialog
  const [dialog, toggleDialog] = useToggle(false);

  //fetching locations data
  const { fullData, selectedData } = useGetItems<Animator>([queryKeys.Animators]);
  console.log(selectedData);

  //useQuery for CRUD
  const createAnimator = useCreateItem<Animator>([queryKeys.Animators]);
  const editAnimator = useEditItem<Animator>([queryKeys.Animators]);
  const deleteAnimator = useDeleteItem([queryKeys.Animators]);

  const handleAnimatorSubmit = (data: Partial<Animator> | Animator) => {
    editItem === undefined ? createAnimator(data) : editAnimator(data as Animator);
    toggleDialog();
  };
  Location;

  const handleDelete = (id: string) => {
    deleteAnimator(id);
  };

  const handleEditDialog = (item: Animator) => {
    setEditItem(item);
    toggleDialog();
  };
  const handleDialogClose = () => {
    toggleDialog();
    setEditItem(undefined);
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <PageHeader onAdd={toggleDialog} headline="Animatori" />
      <Divider />
      {fullData && (
        <TContainer<Animator>
          data={fullData}
          headers={animatorInputs}
          onEdit={handleEditDialog}
          onDelete={handleDelete}
        />
      )}

      <Dialog open={dialog} onClose={handleDialogClose}>
        <FormComponent<Partial<Animator>>
          header="Unesite podatke o animatoru"
          formInputs={animatorInputs}
          handleFormSubmitt={handleAnimatorSubmit}
          schema={AnimatorSchema}
          item={editItem}
        />
      </Dialog>
    </Box>
  );
};

export default Animators;
