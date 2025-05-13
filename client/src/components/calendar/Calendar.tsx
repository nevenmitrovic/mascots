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

  const { data, updateMonthAndYear } = useEventActions();
  const calendarRef = useRef<FullCalendar | null>(null);

  const next = () => {
    updateMonthAndYear(+1);
  };
  const prev = () => {
    updateMonthAndYear(-1);
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
        eventClick={handleEventClick}
      />
    </>
  );
};
export default Calendar;
