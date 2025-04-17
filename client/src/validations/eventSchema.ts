import * as yup from "yup";

export const eventSchema = yup.object().shape({
  date: yup
    .string()
    .required("Datium događaja je obavezan")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Datum mora biti u formatu YYYY-MM-DD (2025-04-14)"
    ),

  time: yup
    .string()
    .required("Vreme događaja je obavezno")
    .matches(/^\d{2}:\d{2}$/, "Vreme mora biti u formatu HH:MM (19:00)"),

  location: yup
    .array()
    .of(yup.string().required("Lokacija je obavezna"))
    .min(1, "Lokacija je obavezna")
    .required("Lokacija je obavezna"),

  maskotas: yup
    .array()
    .of(yup.string().required("Minimum jedna maskota je obavezna"))
    .min(1, "Minimum jedna maskota je obavezna")
    .required("Minimum jedna maskota je obavezna"),

  animators: yup
    .array()
    .of(yup.string().required("Minimum jedan animator je obavezan"))
    .min(1, "Minimum jedan animator je obavezan")
    .required("Minimum jedan animator je obavezan"),

  price: yup
    .string()
    .required("Cena je obavezna")
    .matches(/^\d+$/, "Cena mora biti broj"),

  title: yup
    .string()
    .required("Naslov je obavezan")
    .min(3, "Naslov mora imati najmanje 3 karaktera"),

  collector: yup.string().optional(),

  confirmed: yup.string().optional(),

  customLocationAddress: yup.string().when("location", {
    is: (val: string[]) => Array.isArray(val) && val.includes("none"),
    then: (schema) => schema.required("Adresa lokacije je obavezna"),
    otherwise: (schema) => schema.optional(),
  }),

  customLocationLink: yup
    .string()
    .matches(
      /^https:\/\/maps\.app\.goo\.gl\/.+/,
      "location must be a valid Google Maps link (https://maps.app.goo.gl/...)"
    )
    .when("location", {
      is: (val: string[]) => Array.isArray(val) && val.includes("none"),
      then: (schema) => schema.required("Link lokacije je obavezan"),
      otherwise: (schema) => schema.optional(),
    }),
});

export type EventSchemaType = yup.InferType<typeof eventSchema>;
