import { Box, SxProps, Typography } from "@mui/material";

const EventContentField = ({
  label,
  value,
  sx,
}: {
  label: string;
  value: string | React.ReactNode;
  sx?: SxProps;
}) => {
  return (
    <Box sx={{ margin: "0.5rem 0", ...sx }}>
      <Typography
        gutterBottom
        sx={{
          color: "text.secondary",
          textTransform: "capitalize",
          fontSize: 14,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="h5"
        component="div"
        sx={{ fontSize: 20, textTransform: "capitalize", fontWeight: "500" }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default EventContentField;
