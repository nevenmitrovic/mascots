import { TextField } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { FormInputProps } from "../../utils/types/formTypes";

const FormInputText = <T extends FieldValues>({
  name,
  control,
  label,
  sx,
  type,
}: FormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          type={type}
          size="small"
          {...field}
          fullWidth
          label={label}
          variant="outlined"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          sx={sx}
        />
      )}
    />
  );
};

export default FormInputText;
