import { Check, Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab } from "@mui/material";
import { GridCellParams } from "@mui/x-data-grid";
import { useState } from "react";

type EditActionProps = {
  params: GridCellParams;
  rowId: string;
  setRowId: (rowId: string) => void;
};

const EditAction = ({ params, rowId, setRowId }: EditActionProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setRowId("");
    }, 2000);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 36,
            height: 36,
            top: 6,
            bgcolor: "green",
            position: "absolute",
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{ width: 36, height: 36, position: "absolute", top: 6 }}
          disabled={params.id !== rowId || loading}
          onClick={handleUpdate}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          sx={{ color: "green", position: "absolute", top: 7, zIndex: 1 }}
        />
      )}
    </Box>
  );
};

export default EditAction;
