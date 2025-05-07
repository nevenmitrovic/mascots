import { Container, useMediaQuery } from "@mui/material";
import FormComponent from "components/form/FormComponent";

import signInSchema from "validations/signInSchema";

const SignIn = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: isMobile ? 2 : 3,
      }}
    >
      <FormComponent
        formInputs={[
          {
            name: "email",
            label: "Email",
            type: "email",
            sx: { mb: "1rem" },
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            sx: { mb: "1rem" },
          },
        ]}
        handleFormSubmitt={handleSubmit}
        schema={signInSchema}
        header="Prijavi se"
      />
    </Container>
  );
};

export default SignIn;
