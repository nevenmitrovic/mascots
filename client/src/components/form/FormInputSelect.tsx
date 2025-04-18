import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { FormInputProps } from "../../types/formTypes";

type FormInputSelectProps<T extends FieldValues> = FormInputProps<T> & {
  options: { value: string; label: string }[];
};

const FormInputSelect = <T extends FieldValues>({
  name,
  control,
  label,
  sx,
  options,
}: FormInputSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth sx={sx} error={!!fieldState.error}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>

          <Select
            {...field}
            multiple
            value={Array.isArray(field.value) ? field.value : []}
            label={label}
            labelId={`${name}-label`}
            renderValue={(selected) =>
              Array.isArray(selected) ? selected.join(", ") : ""
            }
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox
                  checked={field.value?.includes(option.value) || false}
                />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
          {fieldState.error && (
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              {fieldState.error.message}
            </span>
          )}
        </FormControl>
      )}
    />
  );
};

export default FormInputSelect;
