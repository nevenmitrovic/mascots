import {
  useCreateItem,
  useDeleteItem,
  useEditItem,
  useGetItems,
  usePartialEditItem,
} from "./global/genericCRUDHooks";
import { queryKeys } from "reactQuery/constants";

import { EditEvent, ICreateEvent, IEvent } from "types/eventTypes";
import { useCalendarDate } from "contexts/CalendarDateContext";

const useEventActions = () => {
  const { monthAndYear, updateMonthAndYear } = useCalendarDate();
  console.log(1);
  const data = useGetItems<IEvent>([
    queryKeys.events,
    monthAndYear.year,
    monthAndYear.month,
  ]);
  const createEvent = useCreateItem<ICreateEvent>([queryKeys.events]);
  const editEvent = useEditItem<ICreateEvent>([queryKeys.events]);
  const partialEditEvent = usePartialEditItem<EditEvent>([queryKeys.events])
  const deleteEvent = useDeleteItem([queryKeys.events]);

  return {
    data,
    createEvent,
    partialEditEvent,
    updateMonthAndYear,
    editEvent,
    deleteEvent,
  };
};

export default useEventActions;
