import dayjs from "dayjs";

import {
  useCreateItem,
  useDeleteItem,
  useEditItem,
  useGetItems,
} from "./global/genericCRUDHooks";

import { getMonthYearDetails, getNewMonthAndYear } from "utils/helperFunctions";

import { queryKeys } from "reactQuery/constants";

import { ICreateEvent, IEvent } from "types/eventTypes";
import { useState } from "react";

const useEventActions = () => {
  const { month, year } = getMonthYearDetails(dayjs());

  const [monthAndYear, setMonthAndYear] = useState({ month, year });

  const updateMonthAndYear = (increment: 1 | -1) => {
    setMonthAndYear((prevData) => getNewMonthAndYear(prevData, increment));
  };

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
    deleteEvent
  };
};

export default useEventActions;
