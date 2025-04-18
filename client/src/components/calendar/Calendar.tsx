import { EventDropArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

import { useContext } from "react";

import { FormDataContext } from "../../contexts/FormDataContext";
import { CalendarDialogContext } from "../../contexts/CalendarDialogContext";

import { mapEventsToCalendar } from "../../utils/helperFunctions";

export const Calendar = () => {
  const { toggleDialog } = useContext(CalendarDialogContext);
  const { formData, setFormData } = useContext(FormDataContext);

  const addNewEvent = () => {
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

  // Mock data for events from API
  const mockEventsData = [
    {
      _id: "652f3c8e9f1b2a001c8e4d1a",
      title: "Birthday Party - Marko",
      date: "2025-04-10",
      time: "17:30",
      location: [
        {
          address: "Hotel Slavija",
          location: "https://goo.gl/maps/exampleLink2",
        },
      ],
      maskotas: ["Mickey Mouse", "SpongeBob"],
      animators: ["Ana", "Milan"],
      price: "150",
      confirmed: "y",
      collector: "Milan",
    },
    {
      _id: "652f3c8e9f1b2a001c8e4d1b",
      title: "School Event - Graduation",
      date: "2025-04-15",
      time: "14:00",
      location: [
        {
          address: "OŠ Vuk Karadžić",
          location: "https://goo.gl/maps/exampleLink3",
        },
      ],
      maskotas: ["Minion", "Elsa"],
      animators: ["Nikola", "Tamara"],
      price: "200",
      confirmed: "pending",
      collector: "Stefan",
    },
    {
      _id: "652f3c8e9f1b2a001c8e4d1c",
      title: "Corporate Family Day - IT Company",
      date: "2025-04-22",
      time: "14:00",
      location: [
        {
          address: "Bulevar Mihajla Pupina 115, Novi Beograd",
          location: "https://goo.gl/maps/exampleLink4",
        },
      ],
      maskotas: ["Batman", "Spider-Man", "Wonder Woman"],
      animators: ["Jovana", "Petar", "Milica"],
      price: "350",
      confirmed: "y",
      collector: "Dragan",
    },
  ];

  // MOCK DATA
  const events = mapEventsToCalendar(mockEventsData);

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
