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
import { Location, locationInputs } from "../types/locationTypes";
import { locationSchema } from "../validations/locationSchema";

const Locations = () => {
  //form data for edit or creating new location
  const [editItem, setEditItem] = useState<Location | undefined>(undefined);

  //toggle dialog to open or close form dialog
  const [dialog, toggleDialog] = useToggle(false);

  //fetching locations data
  const { fullData, selectedData } = useGetItems<Location>([
    queryKeys.locations,
  ]);
  console.log(selectedData);

  //useQuery for CRUD
  const createLocation = useCreateItem([queryKeys.locations]);
  const editLocation = useEditItem([queryKeys.locations]);
  const deleteLocation = useDeleteItem([queryKeys.locations]);

  const handleLocationSubmit = (data: Partial<Location> | Location) => {
    editItem === undefined
      ? createLocation(data)
      : editLocation(data as Location);
    toggleDialog();
  };

  const handleDelete = (id: string) => {
    deleteLocation(id);
  };

  const handleEditDialog = (item: Location) => {
    setEditItem(item);
    toggleDialog();
  };
  const handleDialogClose = () => {
    toggleDialog();
    setEditItem(undefined);
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <PageHeader onAdd={toggleDialog} headline="Lokacije" />
      <Divider />
      {fullData && (
        <TContainer<Location>
          data={fullData}
          headers={locationInputs}
          onEdit={handleEditDialog}
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
