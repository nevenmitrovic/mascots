import dayjs from "dayjs";

import { useGetItems } from "./global/genericCRUDHooks";

import { getMonthYearDetails } from "utils/helperFunctions";

import { queryKeys } from "reactQuery/constants";

import { IEvent } from "types/eventTypes";

const useEventActions = () => {
  const { month, year } = getMonthYearDetails(dayjs());

  const data = useGetItems<IEvent>([queryKeys.events, year, month]);
};

export default useEventActions;
