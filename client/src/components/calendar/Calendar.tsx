import { EventDropArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useState, useRef } from "react";
import dayjs from "dayjs";

import { useContext } from "react";

import { FormDataContext } from "../../contexts/FormDataContext";
import { CalendarFormDialogContext } from "../../contexts/CalendarFormDialogContext";
import { EventCardDialogContext } from "../../contexts/EventCardDialogContext";

import { mapEventsToCalendar } from "../../utils/helperFunctions";

import { IEvent } from "../../types/eventTypes";

export const Calendar = () => {
  const { toggleDialog } = useContext(CalendarFormDialogContext);
  const { setFormData } = useContext(FormDataContext);
  const { toggleEventCardTuple } = useContext(EventCardDialogContext);

  const [date, setDate] = useState<{ year: string; month: string } | null>(
    null
  );

  const calendarRef = useRef<FullCalendar | null>(null);

  const next = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.next();
      setDate({
        year: dayjs(calendarApi.getDate()).format("YYYY"),
        month: dayjs(calendarApi.getDate()).format("MM"),
      });
    }
  };
  const prev = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.prev();
      setDate({
        year: dayjs(calendarApi.getDate()).format("YYYY"),
        month: dayjs(calendarApi.getDate()).format("MM"),
      });
    }
  };

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

  const handleEventClick = (info: EventClickArg) => {
    toggleEventCardTuple(info.event.id);
  };

  const handleEventDrop = (eventDropInfo: EventDropArg) => {
    const event = eventDropInfo.event;
    const newDate = event.startStr;

    console.log(`Event "${event.title}" was moved to ${newDate}`);

    // Logic to update the event with edit item form
    // toggleDialog();
  };

  // Mock data for events from API
  const mockEventsData: IEvent[] = [
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
      mascots: ["Mickey Mouse", "SpongeBob"],
      animators: ["Ana", "Milan"],
      price: "150",
      confirmed: "confirmed",
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
      mascots: ["Minion", "Elsa"],
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
      mascots: ["Batman", "Spider-Man", "Wonder Woman"],
      animators: ["Jovana", "Petar", "Milica"],
      price: "350",
      confirmed: "rejected",
      collector: "Dragan",
    },
  ];

  const events = mapEventsToCalendar(mockEventsData);

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        customButtons={{
          addEvent: {
            text: "+ dodaj",
            click: addNewEvent,
          },
          nextButton: {
            text: ">>",
            click: next,
          },
          prevButton: {
            text: "<<",
            click: prev,
          },
        }}
        headerToolbar={{
          right: "prevButton,nextButton",
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
        eventClick={handleEventClick}
      />
    </>
  );
};
export default Calendar;
