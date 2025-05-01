import { Box, Dialog, Divider, Typography } from "@mui/material";

import FormComponent from "components/form/FormComponent";
import PageHeader from "components/global/PageHeader";
import TContainer from "components/table/TContainer";
import DeleteConfirmationDialog from "components/global/DeleteConfirmationDialog";

import {
  type Location,
  type LocationDocument,
  locationInputs,
} from "types/locationTypes";

import { locationSchema } from "validations/locationSchema";

import useItemToEdit from "hooks/global/useItemToEdit";
import useLocationActions from "hooks/useLocationActions";
import useItemToDelete from "hooks/global/useItemToDelete";

const Locations = () => {
  //actions related to location
  const { data, createLocation, editLocation, deleteLocation } =
    useLocationActions();

  //form data for edit or creating new location
  const {
    itemToEdit,
    setItemEdit,
    editDialog,
    toggleEditDialog,
    handleEditDialogClose,
  } = useItemToEdit<LocationDocument>();

  //submit control when create/edit new locations
  const handleLocationSubmit = (data: Location) => {
    if (itemToEdit) {
      editLocation({ data, id: itemToEdit.id });
    } else {
      createLocation(data);
    }
    handleEditDialogClose();
  };

  //delete dialog hook
  const { deleteId, setDelete, deleteDialog, handleDeleteDialogClose } =
    useItemToDelete();

  //handle confirmed delete
  const handleConfirmDelete = () => {
    deleteLocation(deleteId);
    handleDeleteDialogClose();
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <PageHeader onAdd={toggleEditDialog} headline="Lokacije" />
      <Divider />
      {!data ||
        (data.length == 0 && (
          <Typography component="h2" sx={{ padding: "1rem" }}>
            Nema lokacija u bazi
          </Typography>
        ))}
      {data.length > 0 && (
        <TContainer<LocationDocument>
          data={data}
          headers={locationInputs}
          onEdit={(item) => setItemEdit(item)}
          onDelete={(id) => setDelete(id)}
        />
      )}

      <Dialog open={editDialog} onClose={handleEditDialogClose}>
        <FormComponent<Location>
          header="Unesite podatke o lokaciji"
          formInputs={locationInputs}
          handleFormSubmitt={handleLocationSubmit}
          schema={locationSchema}
          item={itemToEdit?.item}
        />
      </Dialog>
      <DeleteConfirmationDialog
        message="Da li ste sigurni da želite da obrišete ovu lokaciju?"
        open={deleteDialog}
        onClose={handleDeleteDialogClose}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default Locations;
