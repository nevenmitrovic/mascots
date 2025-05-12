import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup
    .string()
    .min(3, "username must contain at least 3 characters")
    .required("username is required"),
  password: yup
    .string()
    .min(6, "password must contain at least 6 characters")
    .required("password is required"),
});
