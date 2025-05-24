import { Schema, model } from "mongoose";

export interface IReport {
  animatorId: string;
  payPeriod: string;
  paid: boolean;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
}

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

export const ReportModel = model<IReport>("Report", ReportSchema);
