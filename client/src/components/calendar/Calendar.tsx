import { EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useRef } from "react";

import { useContext } from "react";

import { CalendarFormDialogContext } from "contexts/CalendarFormDialogContext";
import { EventCardDialogContext } from "contexts/EventCardDialogContext";

import { mapEventsToCalendar } from "utils/helperFunctions";

import useEventActions from "hooks/useEventActions";
import { useCalendarDate } from "contexts/CalendarDateContext";

export const Calendar = () => {
  const { toggleDialog } = useContext(CalendarFormDialogContext);
  const { toggleEventCardTuple } = useContext(EventCardDialogContext);

  const { data } = useEventActions();
  const { updateMonthAndYear } = useCalendarDate();
  const calendarRef = useRef<FullCalendar | null>(null);

  const next = () => {
    calendarRef.current?.getApi().next();
    updateMonthAndYear(+1);
  };
  const prev = () => {
    calendarRef.current?.getApi().prev();
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
