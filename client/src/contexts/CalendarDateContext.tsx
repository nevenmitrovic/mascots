import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";
import { getMonthYearDetails, getNewMonthAndYear } from "utils/helperFunctions";

type MonthAndYear = {
  monthAndYear: { month: string; year: string };
  updateMonthAndYear: (para: 1 | -1) => void;
};

const { month, year } = getMonthYearDetails(dayjs());

const CalendarDateContext = createContext<MonthAndYear>({
  monthAndYear: { month, year },
  updateMonthAndYear: () => {},
});

export const CalendarDateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [monthAndYear, setMonthAndYear] = useState({ month, year });
  const updateMonthAndYear = (increment: 1 | -1) => {
    setMonthAndYear((prevData) => getNewMonthAndYear(prevData, increment));
    console.log(monthAndYear);
  };

  return (
    <CalendarDateContext.Provider value={{ monthAndYear, updateMonthAndYear }}>
      {children}
    </CalendarDateContext.Provider>
  );
};

export const useCalendarDate = () => useContext(CalendarDateContext);
