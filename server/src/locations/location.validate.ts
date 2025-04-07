import * as yup from "yup";

export const locationSchema = yup.object({
  location: yup.string().required("location is required"),
  name: yup.string().required("name is required"),
  phone: yup.string().required("phone is required"),
  address: yup.string().required("address is required"),
});
