import { Box, Dialog, Divider, Typography } from "@mui/material";

import FormComponent from "components/form/FormComponent";
import PageHeader from "components/global/PageHeader";
import TContainer from "components/table/TContainer";

import {
  type Mascot,
  type MascotDocument,
  mascotInputs,
} from "types/mascotTypes";

import { mascotSchema } from "validations/mascotSchema";
import useMascotActions from "hooks/useMascotActions";
import useItemToEdit from "hooks/global/useItemToEdit";
import useItemToDelete from "hooks/global/useItemToDelete";
import DeleteConfirmationDialog from "components/global/DeleteConfirmationDialog";

const Mascots = () => {
  //actions related to mascots
  const { data, createMascot, editMascot, deleteMascot } = useMascotActions();

  //form data for edit or creating new mascots
  const {
    itemToEdit,
    setItemEdit,
    editDialog,
    toggleEditDialog,
    handleEditDialogClose,
  } = useItemToEdit<MascotDocument>();

  //submit control when create/edit new mascots
  const handleMascotSubmit = (data: Mascot) => {
    if (itemToEdit) {
      editMascot({ data, id: itemToEdit.id });
    } else {
      createMascot(data);
    }
    handleEditDialogClose();
  };

  //delete dialog hook
  const { deleteId, setDelete, deleteDialog, handleDeleteDialogClose } =
    useItemToDelete();

  //handle confirmed delete
  const handleConfirmDelete = () => {
    deleteMascot(deleteId);
    handleDeleteDialogClose();
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <PageHeader onAdd={toggleEditDialog} headline="Maskote" />
      <Divider />
      {!data ||
        (data.length == 0 && (
          <Typography component="h2" sx={{ padding: "1rem" }}>
            Nema lokacija u bazi
          </Typography>
        ))}
      {data.length > 0 && (
        <TContainer<MascotDocument>
          data={data}
          headers={mascotInputs}
          onEdit={(item) => setItemEdit(item)}
          onDelete={(id) => setDelete(id)}
        />
      )}

      <Dialog open={editDialog} onClose={handleEditDialogClose}>
        <FormComponent<Mascot>
          header="Unesite podatke o maskoti"
          formInputs={mascotInputs}
          handleFormSubmitt={handleMascotSubmit}
          schema={mascotSchema}
          item={itemToEdit?.item}
        />
      </Dialog>
      <DeleteConfirmationDialog
        message="Da li ste sigurni da želite da obrišete ovu maskotu?"
        open={deleteDialog}
        onClose={handleDeleteDialogClose}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default Mascots;
