import { Snackbar, AlertColor, Alert } from "@mui/material";
import { useState, useCallback } from "react";

interface UseToastMessage {
  showToast: (message: string) => void;
  ToastComponent: React.FC;
}

const useToastMessage = (): UseToastMessage => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = useCallback((message: string) => {
    setMessage(message);
    setOpen(true);
  }, []);

  const handleClose = useCallback(
    (e?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") return;
      setOpen(false);
    },
    []
  );

  const ToastComponent: React.FC = () => (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={handleClose} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );

  return { showToast, ToastComponent };
};

export default useToastMessage;
