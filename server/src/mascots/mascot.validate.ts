import * as yup from "yup";

export const mascotSchema = yup.object({
  name: yup.string().required("Name is required"),
  quantity: yup.number().required("Quantity is required"),
});
