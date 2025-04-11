import * as yup from "yup";

export type LocationObject = yup.InferType<typeof locationSchema>;

export const locationSchema = yup.object({
  id: yup.string(),
  name: yup.string().required("Lokacija mora da sadrzi ime."),
  phone: yup
    .string()
    .matches(
      /^(?:\+381|00381|0)(1[1-9]|2[0-4]|3[4]|5[0-9]|8[0-9]|6[0-9]|7[0-9])\d{6,7}$/,
      "Lokacija mora da ima broj registrovan u Srbiji"
    )
    .required("Lokacija mora da ima broj."),
  adress: yup
    .string()
    .matches(
      /^\d{0,4}?\s?[A-ZČĆŽŠĐa-zčćžšđ\s\-\.]+(\s\d+[A-Za-z]?((\/|,| - )?\d*[A-Za-z]?)?)?$/,
      "Lokacija mora da ima adresu."
    )
    .required("Lokacija mora da ima adresu."),
  location: yup
    .string()
    .matches(
      /^(https?:\/\/)?(www\.)?google\.com\/maps\/(place\/[^\/]+\/)?(@[\-0-9\.]+,[\-0-9\.]+,[0-9]+z\/)?(search\/[^\/]+\/)?([^\/]+\/)?(dir\/[^\/]+\/[^\/]+\/)?.*?$/,
      "Link mora vodi na google maps"
    )
    .required("Lokacija mora da ima link"),
});

export const animatorSchema = yup.object({
  name: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required(),
  id: yup.string()
});
