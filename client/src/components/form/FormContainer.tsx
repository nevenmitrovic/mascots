import { Box } from "@mui/material";
import { useActionState, useEffect } from "react";
import useToastMessage from "../../hooks/useToastMessage";

type actionFunction = (
  prevState: unknown,
  formData: FormData
) => Promise<{ message: string }>;

const initialState = { message: "" };

const FormContainer = ({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) => {
  const [state, formAction] = useActionState(action, initialState);
  const { showToast, ToastComponent } = useToastMessage();

  useEffect(() => {
    if (state.message) {
      console.log(state);
      showToast(state.message);
    }
  }, [state]);

  return (
    <>
      <Box
        action={formAction}
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
      >
        {children}
      </Box>
      <ToastComponent />
    </>
  );
};

export default FormContainer;
