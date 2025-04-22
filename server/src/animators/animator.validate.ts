import * as yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const animatorSchema = yup.object({
  fullName: yup.string().required("fullName is required"),
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
  email: yup
    .string()
    .email("email must be a valid email")
    .matches(emailRegex, "email must be a valid email")
    .required("email is required"),
  phone: yup.string().required("phone is required"),
  paycheck: yup.number().required("paycheck is required"),
  moneyCollected: yup
    .array()
    .of(
      yup.object({
        payed: yup.boolean().required("payed is required"),
        collected: yup.number().required("collected is required"),
      })
    )
    .min(12, "moneyCollected must have 12 elements")
    .max(12, "moneyCollected must have 12 elements"),
});
