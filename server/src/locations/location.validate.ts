import * as yup from "yup";

const locationSchema = yup.object({
  location: yup.string().required("Location is required"),
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
});
