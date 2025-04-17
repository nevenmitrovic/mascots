import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, Typography } from "@mui/material";
import {
  DefaultValues,
  FieldValues,
  Resolver,
  SubmitHandler,
  Path,
  useForm,
} from "react-hook-form";
import { ObjectSchema } from "yup";
import { FormProps } from "../../types/formTypes";
import { defaultValues } from "../../utils/helperFunctions";
import FormInputAutocomplete from "./FormInputAutocomplete";
import FormInputText from "./FormInputText";

const FormComponent = <T extends FieldValues>({
  formInputs,
  handleFormSubmitt,
  schema,
  item,
  header,
}: FormProps<T>) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
    watch, // watching the form value or values
  } = useForm<T>({
    resolver: yupResolver(schema as ObjectSchema<T>) as Resolver<T>,
    defaultValues: (item || defaultValues(formInputs)) as DefaultValues<T>,
  });

  const locationValue = watch("location" as Path<T>);

  const onSubmit: SubmitHandler<T> = async (data) => {
    await new Promise((res) =>
      setTimeout(() => {
        handleFormSubmitt(data);
        reset();
      }, 2000)
    );
  };

  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "1rem",
        margin: "1rem 2rem",
      }}
    >
      <Typography variant="h4">{header}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formInputs.map((input) => {
          let fieldStyle = { ...input.sx };

          // dynamically set visibility based on the location input value
          if (
            input.name === "customLocationAddress" ||
            input.name === "customLocationLink"
          ) {
            fieldStyle = {
              ...fieldStyle,
              display: locationValue.includes("none") ? "block" : "none",
            };
          }

          return input.type === "text" ||
            input.type === "password" ||
            input.type === "email" ? (
            <FormInputText<T>
              key={String(input.name)}
              {...input}
              control={control}
              sx={fieldStyle}
            />
          ) : (
            <FormInputAutocomplete<T>
              key={input.name}
              name={input.name}
              control={control}
              label={input.label}
              options={input.options || []}
              type={input.type}
              sx={fieldStyle}
            />
          );
        })}

        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          sx={{ w: "100" }}
          loading={isSubmitting}
        >
          Sacuvaj
        </Button>
      </form>
      <DevTool control={control} />
    </Paper>
  );
};

export default FormComponent;
