import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

import { Controller, FieldValues } from "react-hook-form";

import {type  FormInputProps } from "types/formTypes";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type SelectOptionProps = { value: string; label: string };
type FormInputAutocompleteProps<T extends FieldValues> = FormInputProps<T> & {
  options: SelectOptionProps[];
};

const FormInputAutocomplete = <T extends FieldValues>({
  name,
  sx,
  control,
  label,
  options,
}: FormInputAutocompleteProps<T>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const { onChange, value } = field;
          const selectedValues: string[] = Array.isArray(value) ? value : [];

          return (
            <Autocomplete
              value={options.filter((option) =>
                selectedValues.includes(option.value)
              )}
              multiple
              onChange={(_event, newValue) => {
                onChange(newValue.map((option) => option.value));
              }}
              id={name}
              limitTags={2}
              options={options}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              sx={{
                width: "100%",
                ...sx,
              }}
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.label}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...params}
                  label={label}
                />
              )}
            />
          );
        }}
      />
    </>
  );
};

export default FormInputAutocomplete;
