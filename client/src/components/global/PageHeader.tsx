import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Typography } from "@mui/material";

const PageHeader = ({
  onAdd,
  headline,
}: {
  onAdd?: () => void;
  headline: string;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "1rem",
    }}
  >
    <Box>
      <Typography variant="h3">{headline}</Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        cursor: "pointer",
      }}
      onClick={onAdd}
    >
      {onAdd && (
        <Typography
          component="p"
          sx={{ display: "flex", alignItems: "flex-end" }}
        >
          Dodaj
          <AddCircleIcon sx={{ ml: "0.5rem", color: "var(--color-primary)" }} />
        </Typography>
      )}
    </Box>
  </Box>
);

export default PageHeader;
