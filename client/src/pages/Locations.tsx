import { Box, Dialog, Divider } from "@mui/material";
import FormComponent from "../components/form/FormComponent";
import PageHeader from "../components/global/PageHeader";
import TContainer from "../components/table/TContainer";
import { useToggle } from "../hooks/useToggle";
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
  const { itemToEdit, setItem } = useItemToEdit<LocationDocument>();

  //toggle dialog to open or close form dialog
  const [dialog, toggleDialog] = useToggle(false);

  //fetching locations data
  const { data, createLocation, editLocation, deleteLocation } =
    useLocationActions();

  const handleLocationSubmit = (data: Location) => {
    if (itemToEdit) {
      editLocation({ data, id: itemToEdit.id });
    } else {
      createLocation(data);
    }
    toggleDialog();
  };

  const handleDelete = (id: string) => {
    deleteLocation(id);
  };

  const handleEditDialog = (item: LocationDocument) => {
    setItem(item);
    toggleDialog();
  };
  const handleDialogClose = () => {
    toggleDialog();
    setItem(null);
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <PageHeader onAdd={toggleDialog} headline="Lokacije" />
      <Divider />
      {data && (
        <TContainer<LocationDocument>
          data={data}
          headers={locationInputs}
          onEdit={handleEditDialog}
          onDelete={handleDelete}
        />
      )}

      <Dialog open={dialog} onClose={handleDialogClose}>
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
