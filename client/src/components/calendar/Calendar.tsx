import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useContext, useState } from "react";
import { CalendarDialogContext } from "../../contexts/CalendarDialogContext";

export const Calendar = () => {
  const [date, setDate] = useState<string | null>(null);
  const { toggleDialog } = useContext(CalendarDialogContext);

  const addNewEvent = (event: any) => {
    toggleDialog();
  };

  // MOCK DATA
  const events = [
    {
      id: "1",
      title: "Rodjendan 1",
      date: "2025-04-14",
      backgroundColor: "red",
      borderColor: "red",
    },
    {
      id: "2",
      title: "Rodjendan 2",
      date: "2025-04-14",
      backgroundColor: "red",
      borderColor: "red",
    },
    {
      id: "3",
      title: "Rodjendan 3",
      date: "2025-04-14",
      backgroundColor: "red",
      borderColor: "red",
    },
    {
      id: "4",
      title: "Rodjendan 4",
      date: "2025-04-14",
      backgroundColor: "red",
      borderColor: "red",
    },
    {
      id: "5",
      title: "Rodjendan 5",
      date: "2025-04-14",
      backgroundColor: "red",
      borderColor: "red",
    },
    {
      id: "6",
      title: "Rodjendan 6",
      date: "2025-04-15",
      backgroundColor: "red",
      borderColor: "red",
    },
  ];
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        customButtons={{
          addEvent: {
            text: "Dodaj dogadjaj",
            click: addNewEvent,
          },
        }}
        headerToolbar={{
          right: "prev,next",
          left: "title",
          center: "addEvent",
        }}
        editable={true}
        selectable={true}
        unselectAuto={true}
        height={"90vh"}
        dayMaxEvents={true}
        moreLinkClick={"popover"}
        dateClick={(info) => setDate(info.dateStr)}
        events={events}
        eventClick={(info) => {
          toggleDialog();
          console.log(info.event.title);
        }}
      />
    </>
  );
};
export default Calendar;
