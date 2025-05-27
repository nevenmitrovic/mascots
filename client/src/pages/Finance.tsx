import { useState } from "react";

import { Box, Divider } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PageHeader from "components/global/PageHeader";
import AnimatorsFinanceList from "components/list/AnimatorsFinanceList";
import dayjs from "dayjs";
import { PickerValue } from "@mui/x-date-pickers/internals";
import useAnimatorActions from "hooks/useAnimatorActions";

const dummyEmployees = [
  {
    _id: "1",
    fullName: "Jovan Jovanović",
    username: "Jovan Test",
  },
  {
    _id: "2",
    fullName: "Jovan Jovanović 2",
    username: "Jovan Test 2",
  },
];

const MONTHS = [
  "Januar",
  "Februar",
  "Mart",
  "April",
  "Maj",
  "Jun",
  "Jul",
  "Avgust",
  "Septembar",
  "Oktobar",
  "Novembar",
  "Decembar",
];

const Finance = () => {
  const [year, setYear] = useState<number>(dayjs().get("year"));
  const { data } = useAnimatorActions();

  const handleShowClick = (id: string) => {
    alert(`${id}`);
  };
  const handleDatePick = (value: PickerValue) =>
    value ? setYear(value.year()) : dayjs().year();

  return (
    <Box sx={{ padding: "1rem" }}>
      <PageHeader headline="Finansijski izveštaj" />
      <Divider sx={{ marginBottom: "1rem" }} />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={"Godina"}
          openTo="year"
          view="year"
          format="YYYY"
          onAccept={handleDatePick}
          sx={{ paddingBottom: "1rem" }}
        />
      </LocalizationProvider>

      {MONTHS.map((month) => (
        <AnimatorsFinanceList
          key={month}
          animators={data}
          title={month}
          onShowClick={handleShowClick}
        />
      ))}
    </Box>
  );
};

export default Finance;
