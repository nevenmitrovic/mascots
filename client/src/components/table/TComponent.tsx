import Paper from "@mui/material/Paper";
import TContainer from "./TContainer";

export default function TComponent<T>(data: T[]) {
  
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "var(--background-color)",
      }}
    >
      <TContainer data={data} />
    </Paper>
  );
}
