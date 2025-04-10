import Paper from "@mui/material/Paper";
import TContainer from "./TContainer";
import { useContextHook } from "../../hooks/useContext";
import { LocationContext } from "../../store/LocationContext";

export default function TComponent() {
  const data = useContextHook(LocationContext);

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
