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
import { Mascot, mascotInputs } from "../types/mascotTypes";
import { mascotSchema } from "../validations/mascotSchema";

const Mascots = () => {
  //form data for edit or creating new location
  const [editItem, setEditItem] = useState<Mascot | undefined>(undefined);

  //toggle dialog to open or close form dialog
  const [dialog, toggleDialog] = useToggle(false);

  //fetching locations data
  const { fullData, selectedData } = useGetItems<Mascot>([queryKeys.mascots]);
  console.log(selectedData);

  //useQuery for CRUD
  const createMascot = useCreateItem<Mascot>([queryKeys.mascots]);
  const editMascot = useEditItem<Mascot>([queryKeys.mascots]);
  const deleteMascot = useDeleteItem([queryKeys.mascots]);

  const handleMascotSubmit = (data: Partial<Mascot> | Mascot) => {
    editItem === undefined ? createMascot(data) : editMascot(data as Mascot);
    toggleDialog();
  };
  Location;

  const handleDelete = (id: string) => {
    deleteMascot(id);
  };

  const handleEditDialog = (item: Mascot) => {
    setEditItem(item);
    toggleDialog();
  };
  const handleDialogClose = () => {
    toggleDialog();
    setEditItem(undefined);
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <PageHeader onAdd={toggleDialog} headline="Maskote" />
      <Divider />
      {fullData && (
        <TContainer<Mascot>
          data={fullData}
          headers={mascotInputs}
          onEdit={handleEditDialog}
          onDelete={handleDelete}
        />
      )}

      <Dialog open={dialog} onClose={handleDialogClose}>
        <FormComponent<Partial<Mascot>>
          header="Unesite podatke o maskoti"
          formInputs={mascotInputs}
          handleFormSubmitt={handleMascotSubmit}
          schema={mascotSchema}
          item={editItem}
        />
      </Dialog>
    </Box>
  );
};

export default Mascots;
