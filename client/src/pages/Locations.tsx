import { Box, Dialog, Divider, Typography } from "@mui/material";
import useToastMessage from "../hooks/useToastMessage";
import FormComponent from "../components/form/FormComponent";
import { FormInputConfig } from "../utils/types/formTypes";
import { locationSchema } from "../utils/validations/yupSchemas";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useToggle } from "../hooks/useToggle";
import TComponent from "../components/table/TComponent";
import { Location } from "../store/LocationContext";

const locationInputs: FormInputConfig<Location>[] = [
  { name: "name", label: "Name", type: "text", sx: { mb: "2rem" } },
  { name: "adress", label: "Address", type: "text", sx: { mb: "2rem" } },
  { name: "phone", label: "Phone", type: "text", sx: { mb: "2rem" } },
  { name: "location", label: "Location URL", type: "text", sx: { mb: "2rem" } },
];

const Locations = () => {
  const { showToast, ToastComponent } = useToastMessage();
  
  const [dialog, toggleDialog] = useToggle(false);

  const handleLocationSubmit = (data: Location) => {
    console.log(data);
    toggleDialog();
    showToast("Lokacija je uspesno sacuvana");
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "1rem",
          height: "100%",
        }}
      >
        <Box>
          <Typography variant="h3">Lokacije</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            height: "100%",
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
      <TComponent />
      <ToastComponent />
      <Dialog open={dialog} onClose={() => toggleDialog()}>
        <FormComponent<Location>
          formInputs={locationInputs}
          handleFormSubmitt={handleLocationSubmit}
          schema={locationSchema}
        />
      </Dialog>
    </Box>
  );
};

export default Locations;
