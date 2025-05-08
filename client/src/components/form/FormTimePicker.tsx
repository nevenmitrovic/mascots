import { Controller, type FieldValues } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TimePicker,
  LocalizationProvider,
  renderTimeViewClock,
} from "@mui/x-date-pickers";

import { type FormInputProps } from "types/formTypes";
import dayjs from "dayjs";

const FormTimePicker = <T extends FieldValues>({
  name,
  control,
  label,
  sx,
}: FormInputProps<T>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, ref, ...restFields } }) => {
          const handleTimeFormat = (time: dayjs.Dayjs | null) => {
            onChange(time?.format("HH:mm"));
          };
          return (
            <TimePicker
              format="HH:mm"
              label={label}
              selectedSections={"all"}
              value={value ? dayjs(value, "HH:mm") : null}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              inputRef={ref}
              onChange={onChange}
              onAccept={handleTimeFormat}
              {...restFields}
              sx={{
                width: "48%",
                marginLeft: "4%",
                ...sx,
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default FormTimePicker;
