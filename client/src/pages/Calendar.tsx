import CalendarContainer from "../components/calendar/CalendarContainer";

import { DialogProvider } from "../contexts/CalendarDialogContext";
import { FormDataProvider } from "../contexts/FormDataContext";

const Calendar = () => {
  return (
    <FormDataProvider>
      <DialogProvider>
        <CalendarContainer />
      </DialogProvider>
    </FormDataProvider>
  );
};

export default Calendar;
