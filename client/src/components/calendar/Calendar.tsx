import { EventDropArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useState, useRef } from "react";
import dayjs from "dayjs";

import { useContext } from "react";

import { FormDataContext } from "contexts/FormDataContext";
import { CalendarFormDialogContext } from "contexts/CalendarFormDialogContext";
import { EventCardDialogContext } from "contexts/EventCardDialogContext";

import { mapEventsToCalendar } from "utils/helperFunctions";

import { type IEvent } from "types/eventTypes";
import useEventActions from "hooks/useEventActions";

export const Calendar = () => {
  const { toggleDialog } = useContext(CalendarFormDialogContext);
  const { setFormData } = useContext(FormDataContext);
  const { toggleEventCardTuple } = useContext(EventCardDialogContext);

  const [date, setDate] = useState<{ year: string; month: string } | null>(
    null
  );
  const { data, updateMonthAndYear } = useEventActions();
  const calendarRef = useRef<FullCalendar | null>(null);

  const next = () => {
    updateMonthAndYear(+1);
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
    updateMonthAndYear(-1);

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
      mascots: [],
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

    // console.log(`Event "${event.title}" was moved to ${newDate}`);

    // Logic to update the event with edit item form
    // toggleDialog();
  };
  const events = mapEventsToCalendar(data);

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
