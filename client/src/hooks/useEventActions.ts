import {
  useCreateItem,
  useDeleteItem,
  useEditItem,
  useGetItems,
} from "./global/genericCRUDHooks";
import { queryKeys } from "reactQuery/constants";

import { ICreateEvent, IEvent } from "types/eventTypes";
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
  const deleteEvent = useDeleteItem([queryKeys.events]);

  return {
    data,
    createEvent,
    updateMonthAndYear,
    editEvent,
    deleteEvent,
  };
};

export default useEventActions;
