import { Box, Dialog, Divider, Typography } from "@mui/material";
import useToastMessage from "../hooks/useToastMessage";
import FormComponent from "../components/form/FormComponent";
import { FormInputConfig } from "../utils/types/formTypes";
import {
  animatorSchema,
} from "../utils/validations/yupSchemas";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useToggle } from "../hooks/useToggle";
import TComponent from "../components/table/TComponent";

const animatorInputs: FormInputConfig<Animator>[] = [
  { name: "name", label: "Name", type: "text", sx: { mb: "2rem" } },
  { name: "phone", label: "Phone", type: "text", sx: { mb: "2rem" } },
  { name: "email", label: "Email", type: "text", sx: { mb: "2rem" } },
];

type Animator = {
  name: string;
  phone: string;
  email: string;
  id?: string;
};

const testAnimator = {
  name: "Neven",
  phone: "Neki tamo broj",
  email: "neven.mitrovic4@gmail.com",
  id: '1'
};

const Animators = () => {
  const { showToast, ToastComponent } = useToastMessage();
  const [dialog, toggleDialog] = useToggle(false);

  const handleLocationSubmit = (data: Animator) => {
    console.log(data);
    toggleDialog();
    showToast("Animator je uspesno sacuvan");
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
            Dodaj animatora
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
        <FormComponent<Animator>
          formInputs={animatorInputs}
          handleFormSubmitt={handleLocationSubmit}
          schema={animatorSchema}
          item={testAnimator}
        />
      </Dialog>
    </Box>
  );
};

export default Animators;
