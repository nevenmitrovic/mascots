import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

import { Controller, FieldValues } from "react-hook-form";

import { type LocationSelect } from "types/eventTypes";
import { type FormInputProps } from "types/formTypes";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
type SelectOptionProps = { value: string | LocationSelect; label: string };
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
  //checking if its a location select input
  //if true dont allow multiple select and close on select
  //if false opposite
  const isLocation = name === "location" ? true : false;
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const { onChange, value } = field;

          const selectedValues = isLocation
            ? //we still want to keep location as string array
              //if its location we display only index 0 item from array or null
              //if not map through options and display chosen ones
              options.find(
                (option) =>
                  JSON.stringify(value[0]) === JSON.stringify(option.value)
              ) || null
            : options.filter((option) =>
                (value as string[]).includes(option.value as string)
              );

          return (
            <Autocomplete
              value={selectedValues}
              multiple={!isLocation}
              onChange={(_event, newValue) => {
                //in case that is location Autocomplete returns object, but not array with an object
                //ensures that the value is always an array no matter the usage
                //clean the array of undefiend and null properties in case user cancel the choosen option
                //map thru and change the state
                const newValues = (
                  Array.isArray(newValue) ? newValue : [newValue]
                )
                  .filter(Boolean)
                  .map((option) => option?.value);
                onChange(newValues);
              }}
              id={name}
              limitTags={2}
              options={options}
              disableCloseOnSelect={!isLocation}
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
