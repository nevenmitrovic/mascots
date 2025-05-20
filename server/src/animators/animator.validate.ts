import * as yup from "yup";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX =
  /^(?:\+381|00381|0)(1[1-9]|2[0-4]|3[4]|5[0-9]|8[0-9]|6[0-9]|7[0-9])\d{6,7}$/;
const ROLE_REGEX = /^(user|admin)$/;

export const animatorSchema = yup.object({
  fullName: yup.string().required("fullName is required"),
  username: yup
    .string()
    .min(3, "username must contain at least 3 characters")
    .required("username is required"),
  password: yup
    .string()
    .min(6, "password must contain at least 6 characters")
    .required("password is required"),
  email: yup
    .string()
    .email("email must be a valid email")
    .matches(EMAIL_REGEX, "email must be a valid email")
    .required("email is required"),
  phone: yup
    .string()
    .matches(PHONE_REGEX, "phone is not valid")
    .required("phone is required"),
  paycheck: yup.number().required("paycheck is required"),
  role: yup.string().matches(ROLE_REGEX).required("role is required"),
});

export const animatorUpdateSchema = yup.object({
  fullName: yup.string().required("fullName is required"),
  username: yup
    .string()
    .min(3, "username must contain at least 3 characters")
    .required("username is required"),
  email: yup
    .string()
    .email("email must be a valid email")
    .matches(EMAIL_REGEX, "email must be a valid email")
    .required("email is required"),
  phone: yup
    .string()
    .matches(PHONE_REGEX, "phone is not valid")
    .required("phone is required"),
  paycheck: yup.number().required("paycheck is required"),
  role: yup.string().matches(ROLE_REGEX).required("role is required"),
});
