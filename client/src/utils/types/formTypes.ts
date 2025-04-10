import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import { Control, FieldValues, Path, SubmitHandler } from "react-hook-form";

export type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type: "text";
  setValue?: unknown;
  sx?: SxProps<Theme>;
};

export type FormInputConfig<T extends FieldValues> = Omit<
  FormInputProps<T>,
  "control"
>;

export type FormProps<T extends FieldValues> = {
  formInputs: FormInputConfig<T>[];
  handleFormSubmitt: SubmitHandler<T>;
  initialValues?: Partial<T>;
  //   validationSchema: yup.Schema<T>;
};
