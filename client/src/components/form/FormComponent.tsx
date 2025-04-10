import { Paper, Typography } from "@mui/material";
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import FormInputText from "./FormInputText";
import { FormProps } from "../../utils/types/formTypes";

const FormComponent = <T extends FieldValues>({
  formInputs,
  handleFormSubmitt,
  initialValues,
}: FormProps<T>) => {
  const { handleSubmit, control } = useForm<T>({
    defaultValues: initialValues as DefaultValues<T>,
  });

  const onSubmit: SubmitHandler<T> = (data) => {
    handleFormSubmitt(data);
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
      <Typography variant="h4">Location form</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formInputs.map((input) => (
          <FormInputText<T>
            key={String(input.name)}
            {...input}
            control={control}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </Paper>
  );
};

export default FormComponent;
