import { model, Schema } from "mongoose";

export interface IAnimator {
  fullName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  paycheck: number;
  moneyCollected: number[];
}

export interface IAnimatorDocument extends IAnimator {
  _id: string;
  createdAt?: Date;
}

export interface IAnimatorMessageResponse {
  message: string;
  data: IAnimatorDocument;
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
    moneyCollected: {
      type: [Number],
      required: true,
      default: [0],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    versionKey: false,
  }
);

export const AnimatorModel = model("Animator", animatorSchema);
