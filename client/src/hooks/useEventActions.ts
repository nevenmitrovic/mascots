import dayjs from "dayjs";

import { useGetItems } from "./global/genericCRUDHooks";

import { getMonthYearDetails, getNewMonthAndYear } from "utils/helperFunctions";

import { queryKeys } from "reactQuery/constants";

import { IEvent } from "types/eventTypes";
import { useState } from "react";

const useEventActions = () => {
  const { month, year } = getMonthYearDetails(dayjs());

  const [monthAndYear, setMonthAndYear] = useState({ month, year });

  const updateMonthAndYear = (increment: 1 | -1) => {
    setMonthAndYear((prevData) => getNewMonthAndYear(prevData, increment));
  };

  const data = useGetItems<IEvent>([queryKeys.events, monthAndYear.year, monthAndYear.month]);

  return {
    data,
    updateMonthAndYear,
  };
};

export default useEventActions;
