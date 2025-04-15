import CalendarContainer from "../components/calendar/CalendarContainer";
import { DialogProvider } from "../contexts/CalendarDialogContext";

const Calendar = () => {
  return (
    <DialogProvider>
      <CalendarContainer />
    </DialogProvider>
  );
};

export default Calendar;
