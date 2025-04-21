import { Box, Dialog } from "@mui/material";
import { useContext } from "react";

import Calendar from "../../components/calendar/Calendar";
import FormComponent from "../../components/form/FormComponent";
import EventCard from "../../components/calendar/EventCard";

import { FormDataContext } from "../../contexts/FormDataContext";
import { CalendarFormDialogContext } from "../../contexts/CalendarFormDialogContext";
import { useToast } from "../../contexts/ToastContext";
import { EventCardDialogContext } from "../../contexts/EventCardDialogContext";

import { eventFormInputs } from "../../types/eventTypes";
import { eventSchema, EventSchemaType } from "../../validations/eventSchema";

const CalendarContainer = () => {
  const { open, toggleDialog } = useContext(CalendarFormDialogContext);
  const { formData } = useContext(FormDataContext);
  const { eventCardTuple, toggleEventCardTuple } = useContext(
    EventCardDialogContext
  );
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
          item={formData}
        />
      </Dialog>
      <Dialog
        open={eventCardTuple[0]}
        onClose={() => toggleEventCardTuple(null)}
      >
        <Box sx={{ minWidth: 275 }}>
          <EventCard id={eventCardTuple[1]} />
        </Box>
      </Dialog>
    </>
  );
};

export default CalendarContainer;
