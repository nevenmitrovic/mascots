import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Divider, Typography } from "@mui/material";
import { useToggle } from "../hooks/useToggle";
import { FormInputConfig } from "../types/formTypes";

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
  id: "1",
};

const Animators = () => {
  const [dialog, toggleDialog] = useToggle(false);

  const handleLocationSubmit = (data: Animator) => {
    console.log(data);
    toggleDialog();
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
      {/* <TContainer /> */}
      {/* <Dialog open={dialog} onClose={() => toggleDialog()}>
        <FormComponent<Animator>
          formInputs={animatorInputs}
          handleFormSubmitt={handleLocationSubmit}
          // schema={animatorSchema}
          item={testAnimator}
        />
      </Dialog> */}
    </Box>
  );
};

export default Animators;
