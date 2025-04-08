import { Box, Divider, Typography } from "@mui/material";
import GridComponent from "../components/dataGrid/GridComponent";
import { Location, locationColumns } from "../components/dataGrid/tableData";
import { LocationContext } from "../store/LocationContext";
import { useContextHook } from "../hooks/useContext";
import TComponent from "../components/table/TComponent";

const Locations = () => {
  const { locations, updateLocation } = useContextHook(LocationContext);

  const handleLocationUpdate = (updatedLocation: Location) => {
    console.log(1, 'calling update from page')
    updateLocation(updatedLocation);
  };

  return (
    <Box sx={{ padding: "1rem", margin: "1rem" }}>
      <Typography variant="h3" sx={{ marginBottom: "1rem" }}>
        Lokacije proslava
      </Typography>
      <Divider />
      {/* <GridComponent
        columns={locationColumns}
        rows={locations}
        onRowUpdate={handleLocationUpdate}
      /> */}
      <TComponent/>
    </Box>
  );
};

export default Locations;
