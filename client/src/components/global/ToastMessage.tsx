import { Snackbar } from "@mui/material";
import { useState } from "react";
const ToastMessage = ({ message }: { message: string }) => {
  const [open, setOpen] = useState(false);

  const handleClose = (
    e?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={(e) => handleClose(e)}
        message={message}
      />
    </>
  );
};
export default ToastMessage;
