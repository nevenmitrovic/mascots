import { model, Schema } from "mongoose";

export interface IAnimator {
  fullName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  paycheck: number;
  role: "user" | "admin";
}

export interface IAnimatorDocument extends IAnimator {
  _id: string;
}

export interface IAnimatorMessageResponse {
  message: string;
  data: Partial<IAnimatorDocument>;
}

const animatorSchema = new Schema<IAnimator>(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    paycheck: {
      type: Number,
      required: true,
      default: 0,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  {
    versionKey: false,
  }
);

export const AnimatorModel = model("Animator", animatorSchema);
