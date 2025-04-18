import { EventDropArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

import { useContext } from "react";

import { FormDataContext } from "../../contexts/FormDataContext";
import { CalendarDialogContext } from "../../contexts/CalendarDialogContext";

export const Calendar = () => {
  const { toggleDialog } = useContext(CalendarDialogContext);
  const { formData, setFormData } = useContext(FormDataContext);

  const addNewEvent = (event: any) => {
    toggleDialog();
  };

  const handleDateClick = (info: DateClickArg) => {
    const data = {
      title: "",
      date: info.dateStr,

      time: "",
      location: [],
      maskotas: [],
      animators: [],
      price: "",
      confirmed: "",
      collector: "",
      customLocationAddress: "",
      customLocationLink: "",
    };
    setFormData(data);
    toggleDialog();
  };

  const handleEventDrop = (eventDropInfo: EventDropArg) => {
    const event = eventDropInfo.event;
    const newDate = event.startStr;

    console.log(`Event "${event.title}" was moved to ${newDate}`);

    // Logic to update the event with edit item form
    // toggleDialog();
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
        eventResizableFromStart={false}
        eventDurationEditable={false}
        selectMirror={true}
        selectMinDistance={5}
        height={"90vh"}
        dayMaxEvents={true}
        moreLinkClick={"popover"}
        dateClick={handleDateClick}
        events={events}
        eventDrop={handleEventDrop}
        // eventClick={(info) => {
        //   toggleDialog();
        //   console.log(info.event.title);
        // }}
      />
    </>
  );
};
export default Calendar;
