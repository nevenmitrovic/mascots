import Paper from "@mui/material/Paper";
import TableContainerComponent from "./TContainer";
import { locations } from "./tableData";

export default function TComponent() {
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "var(--background-color)",
      }}
    >
      <TableContainerComponent data={locations} />
    </Paper>
  );
}
