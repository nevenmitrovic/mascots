import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Dialog, Divider, Typography } from "@mui/material";
import { useState } from "react";
import FormComponent from "../components/form/FormComponent";
import TContainer from "../components/table2/TContainer";
import { useLocations } from "../hooks/useLocations";
import useToastMessage from "../hooks/useToastMessage";
import { useToggle } from "../hooks/useToggle";
import { Location } from "../utils/types/dataTypes";
import { FormInputConfig } from "../utils/types/formTypes";
import { locationSchema } from "../utils/validations/yupSchemas";

const locationInputs: FormInputConfig<Partial<Location>>[] = [
  { name: "name", label: "Ime", type: "text", sx: { mb: "2rem" } },
  { name: "address", label: "Adresa", type: "text", sx: { mb: "2rem" } },
  { name: "phone", label: "Telefon", type: "text", sx: { mb: "2rem" } },
  { name: "location", label: "Link", type: "text", sx: { mb: "2rem" } },
];

const Locations = () => {
  const { showToast, ToastComponent } = useToastMessage();

  const [editItem, setEditItem] = useState<Location | undefined>(undefined);

  const [dialog, toggleDialog] = useToggle(false);

  const locations = useLocations();

  const handleLocationSubmit = (data: Partial<Location>) => {
    toggleDialog();
    showToast("Lokacija je uspesno sacuvana");
  };

  const handleEdit = (item: Location) => {
    setEditItem(item);

    toggleDialog();
  };

  const handleDelete = (id: string) => {
    console.log(`Delete item with id: ${id}`);
    showToast("Lokacija je obrisana");
  };

  const handleDialogClose = () => {
    toggleDialog();
    setEditItem(undefined);
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "1rem",
        }}
      >
        <Box>
          <Typography variant="h3">Lokacije</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            cursor: "pointer",
          }}
          onClick={() => toggleDialog()}
        >
          <Typography
            component="p"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            Dodaj lokaciju
            <AddCircleIcon
              sx={{ ml: "0.5rem", color: "var(--color-primary)" }}
            />
          </Typography>
        </Box>
      </Box>
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
          formInputs={locationInputs}
          handleFormSubmitt={handleLocationSubmit}
          schema={locationSchema}
          item={editItem}
        />
      </Dialog>
      <ToastComponent />
    </Box>
  );
};

export default Locations;
