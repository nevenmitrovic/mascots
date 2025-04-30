import * as yup from "yup";

export const locationSchema = yup.object({
  name: yup.string().required("Lokacija mora da sadrzi ime."),
  phone: yup
    .string()
    .matches(
      /^(?:\+381|00381|0)(1[1-9]|2[0-4]|3[4]|5[0-9]|8[0-9]|6[0-9]|7[0-9])\d{6,7}$/,
      "Lokacija mora da ima broj registrovan u Srbiji"
    )
    .required("Lokacija mora da ima broj."),
  address: yup
    .string()
    .matches(
      /^\d{0,4}?\s?[A-ZČĆŽŠĐa-zčćžšđ\s\-\.]+(\s\d+[A-Za-z]?((\/|,| - )?\d*[A-Za-z]?)?)?$/,
      "Lokacija mora da ima adresu."
    )
    .required("Lokacija mora da ima adresu."),
  location: yup
    .string()
    .matches(
      /^https:\/\/maps\.app\.goo\.gl\/.+/,
      "Lokacija mora biti validan Google Maps link (https://maps.app.goo.gl/...)"
    )
    .required("Lokacija mora da ima link"),
});

export type LocationSchemaType = yup.InferType<typeof locationSchema>;
