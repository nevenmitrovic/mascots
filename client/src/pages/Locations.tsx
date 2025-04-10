import { Box, Divider, Typography } from "@mui/material";
import TComponent from "../components/table/TComponent";
import useToastMessage from "../hooks/useToastMessage";
import { useEffect } from "react";
import { fetchAllLocations } from "../api/locationActions";
import FormComponent from "../components/form/FormComponent";
import { FormInputConfig } from "../utils/types/formTypes";
import { Location } from "../store/LocationContext";

const defaultLocation: Location = {
  id: "",
  name: "",
  location: "",
  phone: "",
  adress: "",
};

const locationInputs: FormInputConfig<Location>[] = [
  { name: "name", label: "Name", type: "text", sx: { mb: "2" } },
  { name: "adress", label: "Address", type: "text", sx: { mb: "2" } },
  { name: "phone", label: "Phone", type: "text", sx: { mb: "2" } },
  { name: "location", label: "Location URL", type: "text", sx: { mb: "2" } },
];

const Locations = () => {
  const { showToast, ToastComponent } = useToastMessage();

  const handleLocationSubmit = (data: Location) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllLocations();
      if (!data) {
        showToast("Data not recieved. Please try again later!");
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ padding: "1rem", margin: "1rem" }}>
      <Typography variant="h3" sx={{ marginBottom: "1rem" }}>
        Lokacije proslava
      </Typography>
      <Divider />
      {/* <TComponent /> */}
      <ToastComponent severity="error" />
      <FormComponent<Location>
        formInputs={locationInputs}
        initialValues={defaultLocation}
        handleFormSubmitt={handleLocationSubmit}
      />
    </Box>
  );
};

export default Locations;
