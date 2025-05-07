import * as yup from "yup";

export const mascotSchema = yup.object({
  _id: yup.string().optional(),
  name: yup
    .string()
    .required("Maskota mora da ima naziv.")
    .min(3, "Maskota mora biti 3 ili vise slova."),
  quantity: yup.number().required("Maskota mora da ima količinu."),
});
