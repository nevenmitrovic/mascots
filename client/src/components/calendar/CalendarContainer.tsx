import { Box, Dialog } from "@mui/material";
import { useContext, useState } from "react";

import Calendar from "../../components/calendar/Calendar";
import FormComponent from "../../components/form/FormComponent";
import { CalendarDialogContext } from "../../contexts/CalendarDialogContext";

import { useToast } from "../../contexts/ToastContext";
import { IEvent, eventFormInputs } from "../../types/eventTypes";
import { eventSchema, EventSchemaType } from "../../validations/eventSchema";

const CalendarContainer = () => {
  const { eventFormData, setEventFormData } = useState<null | EventSchemaType>(
    null
  );

  const { open, toggleDialog } = useContext(CalendarDialogContext);
  const { showToast } = useToast();

  const handleEventSubmit = (data: any) => {
    console.log(data);
    toggleDialog();
    showToast("Lokacija je uspesno sacuvana", "success");
  };

  return (
    <>
      <Box sx={{ padding: "0.5rem" }}>
        <Calendar />
      </Box>
      <Dialog open={open} onClose={toggleDialog}>
        <FormComponent<EventSchemaType>
          formInputs={eventFormInputs}
          handleFormSubmitt={handleEventSubmit}
          schema={eventSchema}
          header="Dodaj dogadjaj"
        />
      </Dialog>
    </>
  );
};

export default CalendarContainer;
