import * as yup from "yup";

export const selectValidation = yup.object({
  multiSelect: yup
    .array()
    .of(yup.string())
    .min(1, "You must select at least one option")
    .required("This field is required"),
});
