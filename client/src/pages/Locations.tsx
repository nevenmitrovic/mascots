import { Box, Dialog, Divider } from "@mui/material";
import { useState } from "react";
import FormComponent from "../components/form/FormComponent";
import PageHeader from "../components/global/PageHeader";
import TContainer from "../components/table/TContainer";
import { useToast } from "../contexts/ToastContext";
import { useLocations } from "../hooks/useLocations";
import { useToggle } from "../hooks/useToggle";
import { Location, locationInputs } from "../types/locationTypes";
import { locationSchema } from "../validations/locationSchema";

const Locations = () => {
  //showing toast message
  const { showToast } = useToast();

  //form data for edit or creating new location
  const [editItem, setEditItem] = useState<Location | undefined>(undefined);

  //toggle dialog to open or close form dialog
  const [dialog, toggleDialog] = useToggle(false);

  //fetching locations data
  const locations = useLocations();

  const handleLocationSubmit = (data: Partial<Location>) => {
    toggleDialog();
    showToast("Lokacija je uspesno sacuvana", "success");
  };

  const handleEdit = (item: Location) => {
    setEditItem(item);
    toggleDialog();
  };

  const handleDelete = (id: string) => {
    console.log(`Delete item with id: ${id}`);
    showToast("Lokacija je obrisana", "success");
  };

  const handleDialogClose = () => {
    toggleDialog();
    setEditItem(undefined);
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <PageHeader onAdd={toggleDialog} headline="Lokacije" />
      <Divider />
      {locations.length > 0 && (
        <TContainer<Location>
          data={locations}
          headers={locationInputs}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Dialog open={dialog} onClose={handleDialogClose}>
        <FormComponent<Partial<Location>>
          header="Unesite podatke o lokaciji"
          formInputs={locationInputs}
          handleFormSubmitt={handleLocationSubmit}
          schema={locationSchema}
          item={editItem}
        />
      </Dialog>
    </Box>
  );
};

export default Locations;
