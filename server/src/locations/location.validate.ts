import * as yup from "yup";

export const locationSchema = yup.object({
  location: yup
    .string()
    .required("location is required")
    .matches(
      /^https:\/\/maps\.app\.goo\.gl\/.+/,
      "location must be a valid Google Maps link (https://maps.app.goo.gl/...)"
    ),
  name: yup.string().required("name is required"),
  phone: yup.string().required("phone is required"),
  address: yup.string().required("address is required"),
});

export const locationUpdateSchema = yup.object({
  location: yup
    .string()
    .optional()
    .matches(
      /^https:\/\/maps\.app\.goo\.gl\/.+/,
      "location must be a valid Google Maps link (https://maps.app.goo.gl/...)"
    ),
  name: yup.string().optional(),
  phone: yup.string().optional(),
  address: yup.string().optional(),
});
