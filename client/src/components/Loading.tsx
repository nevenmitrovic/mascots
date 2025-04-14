import { Box, CircularProgress } from "@mui/material";
import { useIsFetching } from "@tanstack/react-query";

const Loading = () => {
  const isFetching = useIsFetching();
  const display = isFetching ? "flex" : "none";

  return (
    <Box
      sx={{
        display: { display },
        alignItems: "center",
        justifyContent: "center",
        height: "50%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
