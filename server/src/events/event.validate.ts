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
    .array()
    .of(yup.string().required("location is required"))
    .min(1, "location is required")
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

  price: yup
    .string()
    .required("price is required")
    .matches(/^\d+$/, "price must be a number"),

  title: yup
    .string()
    .required("title is required")
    .min(3, "title must be at least 3 characters"),

  orginazer: yup
    .object({
      name: yup
        .string()
        .required("name is required")
        .min(3, "name must be at least 3 characters"),
      phone: yup
        .string()
        .required("phone is required")
        .matches(/^\d+$/, "phone must be a number"),
      social: yup
        .string()
        .required("social is required")
        .oneOf(
          ["facebook", "instagram", "viber", "whatsapp"],
          "social must be 'facebook', 'instagram', 'viber', or 'whatsapp'"
        ),
    })
    .required("orginazer is required"),

  collector: yup.string().optional(),

  confirmed: yup
    .string()
    .oneOf(
      ["pending", "confirmed", "rejected"],
      "status must be 'pending', 'confirmed', or 'rejected'"
    )
    .optional(),
});
