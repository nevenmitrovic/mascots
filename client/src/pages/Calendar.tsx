import CalendarContainer from "../components/calendar/CalendarContainer";

import { CalendarFormDialogProvider } from "../contexts/CalendarFormDialogContext";
import { FormDataProvider } from "../contexts/FormDataContext";
import { EventCardDialogProvider } from "../contexts/EventCardDialogContext";

const Calendar = () => {
  return (
    <EventCardDialogProvider>
      <FormDataProvider>
        <CalendarFormDialogProvider>
          <CalendarContainer />
        </CalendarFormDialogProvider>
      </FormDataProvider>
    </EventCardDialogProvider>
  );
};

export default Calendar;
