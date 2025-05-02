import { Box, Dialog, Divider } from "@mui/material";

import FormComponent from "components/form/FormComponent";
import PageHeader from "components/global/PageHeader";
import TContainer from "components/table/TContainer";
import DeleteConfirmationDialog from "components/global/DeleteConfirmationDialog";

import {
  type Animator,
  type AnimatorDocument,
  type AnimatorTable,
  animatorInputs,
  animatorTable,
} from "types/animatorsTypes";

import {
  type UpdatedAnimator,
  type NewAnimator,
  newAnimatorSchema,
  updatedAnimatorSchema,
} from "validations/animatorSchema";

import useAnimatorActions from "hooks/useAnimatorActions";
import useItemToEdit from "hooks/global/useItemToEdit";
import useItemToDelete from "hooks/global/useItemToDelete";

const Animators = () => {
  //actions related to Animator
  const { data, createAnimator, editAnimator, deleteAnimator } =
    useAnimatorActions();

  //form data for edit or creating new animator
  const {
    itemToEdit,
    setItemEdit,
    editDialog,
    toggleEditDialog,
    handleEditDialogClose,
  } = useItemToEdit<AnimatorDocument>();

  //submit control when create/edit new animator
  const handleAnimatorSubmit = (data: Animator) => {
    if (itemToEdit) {
      editAnimator({ data, id: itemToEdit.id });
    } else {
      createAnimator(data);
    }
    handleEditDialogClose();
  };

  //delete dialog hook
  const { deleteId, setDelete, deleteDialog, handleDeleteDialogClose } =
    useItemToDelete();

  //handle confirmed delete
  const handleConfirmDelete = () => {
    deleteAnimator(deleteId);
    handleDeleteDialogClose();
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <PageHeader onAdd={toggleEditDialog} headline="Animatori" />
      <Divider />
      {data && (
        <TContainer<AnimatorTable>
          data={data}
          headers={animatorTable}
          onEdit={(item) => setItemEdit(item)}
          onDelete={(id) => setDelete(id)}
        />
      )}

      <Dialog open={editDialog} onClose={handleEditDialogClose}>
        <FormComponent<NewAnimator | UpdatedAnimator>
          header="Unesite podatke o animatoru"
          formInputs={animatorInputs}
          handleFormSubmitt={handleAnimatorSubmit}
          schema={itemToEdit?.item ? updatedAnimatorSchema : newAnimatorSchema}
          item={itemToEdit?.item}
        />
      </Dialog>
      <DeleteConfirmationDialog
        message="Da li ste sigurni da želite da obrišete animatora?"
        open={deleteDialog}
        onClose={handleDeleteDialogClose}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default Animators;
