import CalendarContainer from "components/calendar/CalendarContainer";

import { CalendarFormDialogProvider } from "contexts/CalendarFormDialogContext";
import { FormDataProvider } from "contexts/FormDataContext";
import { EventCardDialogProvider } from "contexts/EventCardDialogContext";
import { CalendarDateProvider } from "contexts/CalendarDateContext";

const Calendar = () => {
  return (
    <CalendarDateProvider>
      <EventCardDialogProvider>
        <FormDataProvider>
          <CalendarFormDialogProvider>
            <CalendarContainer />
          </CalendarFormDialogProvider>
        </FormDataProvider>
      </EventCardDialogProvider>
    </CalendarDateProvider>
  );
};

export default Calendar;
