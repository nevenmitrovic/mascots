import { Schema, model } from "mongoose";

const ReportSchema = new Schema(
  {
    animatorId: {
      type: Schema.Types.ObjectId,
      ref: "Animator",
      required: true,
    },
    payPeriod: {
      type: String, // YYYY-MM
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
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

ReportSchema.index({ animatorId: 1, payPeriod: 1 }, { unique: true });

export const ReportModel = model("Report", ReportSchema);
