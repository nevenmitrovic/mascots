import * as yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const updatedAnimatorSchema = yup.object().shape({
  fullName: yup.string().required("Animator mora da sadrži ime.").min(3, "Ime mora da sadrži najmanje 3 karaktera."),
  username: yup.string().required("Animator mora da ima username.").min(3, "Username mora da sadrži najmanje 3 karaktera."),
  email: yup
    .string()
    .matches(emailRegex, "Animator mora da ima postojeci email")
    .required("Animator mora da ima email"),
  phone: yup
    .string()
    .matches(
      /^(?:\+381|00381|0)(1[1-9]|2[0-4]|3[4]|5[0-9]|8[0-9]|6[0-9]|7[0-9])\d{6,7}$/,
      "Animator mora da ima broj registrovan u Srbiji"
    )
    .required("Animator mora da ima broj."),
  paycheck: yup.number().required("Animator mora da ima dnevnicu."),
});

export const newAnimatorSchema = updatedAnimatorSchema.shape({
  password: yup
    .string()
    .required("Animator mora da ima šifru.")
    .min(8, "Šifra mora da sadrži najmanje 8 karaktera."),
});

export type NewAnimator = yup.InferType<typeof newAnimatorSchema>;
export type UpdatedAnimator = yup.InferType<typeof updatedAnimatorSchema>;
