import { Controller, type FieldValues } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { type FormInputProps } from "types/formTypes";

import dayjs from "dayjs";

const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  sx,
  type,
}: FormInputProps<T>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const dateFormat = (date: dayjs.Dayjs | null) => {
            if (date) {
              field.onChange(date.format("YYYY-MM-DD"));
            } else {
              field.onChange(null);
            }
          };
          return (
            <DatePicker
              format="YYYY-MM-DD"
              label={label}
              value={field.value ? dayjs(field.value) : null}
              inputRef={field.ref}
              disablePast
              onChange={(date) => {
                dateFormat(date);
              }}
              sx={{
                width: "48%",
                ...sx,
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default FormDatePicker;
