import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, Typography } from "@mui/material";
import {
  DefaultValues,
  FieldValues,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FormProps } from "../../types/formTypes";
import { defaultValues } from "../../utils/helperFunctions";
import FormInputText from "./FormInputText";

const FormComponent = <T extends FieldValues>({
  formInputs,
  handleFormSubmitt,
  schema,
  item,
}: FormProps<T>) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<T>({
    resolver: yupResolver(schema) as Resolver<T>,
    defaultValues: (item || defaultValues(formInputs)) as DefaultValues<T>,
  });

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
      <Typography variant="h4">Dodaj lokaciju</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formInputs.map((input) => (
          <FormInputText<T>
            key={String(input.name)}
            {...input}
            control={control}
          />
        ))}
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
