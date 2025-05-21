import nodemailer from "nodemailer";

import { env } from "config/env";

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.BREVO_USERNAME,
    pass: env.SMTP_KEY,
  },
});

transporter.verify((err: Error | null, success: boolean) => {
  if (err) console.log("Connection error with brevo", err);
  if (success) console.log("Connection with Brevo successfully");
});
