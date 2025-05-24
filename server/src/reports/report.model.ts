import { Schema, model } from "mongoose";

const ReportSchema = new Schema(
  {
    payPeriod: {
      type: String, // Format: 'YYYY-MM'
      index: true,
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
      default: false,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);

ReportSchema.index({ payPeriod: 1 }, { unique: true });

export const Paycheck = model("Report", ReportSchema);
