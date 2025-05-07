import * as yup from "yup";

export const eventSchema = yup.object({
  date: yup
    .string()
    .required("date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "date format YYYY-MM-DD (2025-04-14)"),

  time: yup
    .string()
    .required("time is required")
    .matches(/^\d{2}:\d{2}$/, "time format HH:MM (19:00)"),

  location: yup
    .object({
      location: yup
        .string()
        .optional()
        .matches(
          /^https:\/\/maps\.app\.goo\.gl\/.+/,
          "location must be a valid Google Maps link (https://maps.app.goo.gl/...)"
        ),
      address: yup
        .string()
        .required("address is required")
        .min(3, "address must be at least 3 characters"),
    })
    .required("location is required"),

  mascots: yup
    .array()
    .of(yup.string().required("mascot is required"))
    .min(1, "mascot is required")
    .required("mascot is required"),

  animators: yup
    .array()
    .of(yup.string().required("animator is required"))
    .min(1, "animator is required")
    .required("animator is required"),

  price: yup.number().required("price is required"),

  title: yup
    .string()
    .required("title is required")
    .min(3, "title must be at least 3 characters"),

  organizer: yup
    .object({
      name: yup
        .string()
        .required("organizer's name is required")
        .min(3, "name must be at least 3 characters"),
      phone: yup
        .string()
        .required("organizer's phone is required")
        .matches(/^\d+$/, "phone must be a number"),
      social: yup
        .string()
        .required("organizer's social is required")
        .oneOf(
          ["facebook", "instagram", "viber", "whatsapp"],
          "social must be 'facebook', 'instagram', 'viber', or 'whatsapp'"
        ),
    })
    .required("orginazer is required"),

  collector: yup.array().of(yup.string()),

  confirmed: yup
    .string()
    .oneOf(
      ["pending", "confirmed", "rejected"],
      "status must be 'pending', 'confirmed', or 'rejected'"
    )
    .optional(),
});
