import { Box, Dialog } from "@mui/material";
import { useContext } from "react";

import Calendar from "components/calendar/Calendar";
import FormComponent from "components/form/FormComponent";
import EventCard from "components/calendar/EventCard";

import { FormDataContext } from "contexts/FormDataContext";
import { CalendarFormDialogContext } from "contexts/CalendarFormDialogContext";
import { useToast } from "contexts/ToastContext";
import { EventCardDialogContext } from "contexts/EventCardDialogContext";

import useEventActions from "hooks/useEventActions";
import useEventFormInputs from "hooks/useEventFormInputs";

import { eventSchema } from "validations/eventSchema";

import { formatEventData } from "utils/helperFunctions";
import { IEventFormType } from "types/eventTypes";

const CalendarContainer = () => {
  const { open, handleDialogClose } = useContext(CalendarFormDialogContext);
  const { isEditing, setIsEditing, itemToEdit } = useContext(FormDataContext);
  const { eventCardTuple, toggleEventCardTuple } = useContext(
    EventCardDialogContext
  );
  const eventFormInputs = useEventFormInputs();
  const { showToast } = useToast();
  const { createEvent, editEvent } = useEventActions();

  const handleEventSubmit = (data: IEventFormType) => {
    const formatData = formatEventData(data);
    setIsEditing();
    if (isEditing && itemToEdit) {
      editEvent({ data: formatData, id: itemToEdit.id });
    } else {
      createEvent(formatData);
    }
    handleDialogClose();
    showToast("Lokacija je uspesno sacuvana", "success");
  };

  return (
    <>
      <Box sx={{ padding: "0.5rem" }}>
        <Calendar />
      </Box>
      <Dialog open={open} onClose={handleDialogClose}>
        <FormComponent<IEventFormType>
          formInputs={eventFormInputs}
          handleFormSubmitt={handleEventSubmit}
          schema={eventSchema}
          header="Dodaj dogadjaj"
          item={itemToEdit?.item}
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
