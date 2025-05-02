import { Dialog, Box, Typography, Button } from "@mui/material";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const DeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  message,
}: DeleteConfirmationDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ padding: "1rem", textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          {message}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Button variant="contained" color="error" onClick={() => onConfirm()}>
            Obriši
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Otkaži
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
