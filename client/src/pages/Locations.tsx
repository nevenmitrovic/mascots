import { Box, Dialog, Divider, Typography } from "@mui/material";
import FormComponent from "../components/form/FormComponent";
import PageHeader from "../components/global/PageHeader";
import TContainer from "../components/table/TContainer";
import {
  Location,
  LocationDocument,
  locationInputs,
} from "../types/locationTypes";
import { locationSchema } from "../validations/locationSchema";
import useItemToEdit from "../hooks/useItemToEdit";
import useLocationActions from "../hooks/useLocationActions";

const Locations = () => {
  //form data for edit or creating new location
  const {
    itemToEdit,
    setItemEdit,
    editDialog,
    toggleEditDialog,
    handleEditDialogClose,
  } = useItemToEdit<LocationDocument>();

  //fetching locations data
  const { data, createLocation, editLocation, deleteLocation } =
    useLocationActions();

  const handleLocationSubmit = (data: Location) => {
    if (itemToEdit) {
      editLocation({ data, id: itemToEdit.id });
    } else {
      createLocation(data);
    }
    handleEditDialogClose();
  };

  const handleDelete = (id: string) => {
    deleteLocation(id);
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <PageHeader onAdd={toggleEditDialog} headline="Lokacije" />
      <Divider />
      {!data ||
        (data.length == 0 && (
          <Typography component="h2" sx={{ padding: "1rem" }}>
            No data to display
          </Typography>
        ))}
      {data.length > 0 && (
        <TContainer<LocationDocument>
          data={data}
          headers={locationInputs}
          onEdit={(item) => setItemEdit(item)}
          onDelete={handleDelete}
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
    </Box>
  );
};

export default Locations;
