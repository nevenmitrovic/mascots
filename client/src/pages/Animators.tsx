import { Box, Dialog, Divider } from "@mui/material";

import { useState } from "react";

import FormComponent from "components/form/FormComponent";
import PageHeader from "components/global/PageHeader";
import TContainer from "components/table/TContainer";

import {
  useCreateItem,
  useDeleteItem,
  useEditItem,
  useGetItems,
} from "hooks/global/genericHooks";
import { useToggle } from "hooks/global/useToggle";

import { queryKeys } from "reactQuery/constants";

import { type Animator, AnimatorDocument, animatorInputs, AnimatorTable } from "types/animatorsTypes";
import useAnimatorActions from "hooks/useAnimatorActions";

const Animators = () => {

  //actions related to Animator
  const { data, createAnimator, editAnimator, deleteAnimator } =
    useAnimatorActions();

  //form data for edit or creating new location
  const [editItem, setEditItem] = useState<Animator | undefined>(undefined);

  //toggle dialog to open or close form dialog
  const [dialog, toggleDialog] = useToggle(false);

  const handleAnimatorSubmit = (data: Animator) => {
    editItem === undefined
      ? createAnimator(data)
      : editAnimator(data);
    toggleDialog();
  };
  Location;

  const handleDelete = (id: string) => {
    deleteAnimator(id);
  };

  const handleEditDialog = (item: AnimatorTable) => {
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
      {data && (
        <TContainer<AnimatorTable>
          data={data}
          headers={animatorInputs}
          onEdit={handleEditDialog}
          onDelete={handleDelete}
        />
      )}

      {/* <Dialog open={dialog} onClose={handleDialogClose}>
        <FormComponent<Animator>
          header="Unesite podatke o animatoru"
          formInputs={animatorInputs}
          handleFormSubmitt={handleAnimatorSubmit}
          schema={AnimatorSchema}
          item={editItem}
        />
      </Dialog> */}
    </Box>
  );
};

export default Animators;
