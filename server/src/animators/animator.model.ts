import { model, Schema } from "mongoose";

interface IMoneyCollected {
  payed: boolean;
  collected: number;
}

export enum Months {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11,
}

export interface IAnimator {
  fullName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  paycheck: number;
  moneyCollected?: [
    IMoneyCollected,
    IMoneyCollected,
    IMoneyCollected,
    IMoneyCollected,
    IMoneyCollected,
    IMoneyCollected,
    IMoneyCollected,
    IMoneyCollected,
    IMoneyCollected,
    IMoneyCollected,
    IMoneyCollected,
    IMoneyCollected
  ];
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
      type: [{ _id: false, payed: Boolean, collected: Number }],
      default: [
        { payed: false, collected: 0 },
        { payed: false, collected: 0 },
        { payed: false, collected: 0 },
        { payed: false, collected: 0 },
        { payed: false, collected: 0 },
        { payed: false, collected: 0 },
        { payed: false, collected: 0 },
        { payed: false, collected: 0 },
        { payed: false, collected: 0 },
        { payed: false, collected: 0 },
        { payed: false, collected: 0 },
        { payed: false, collected: 0 },
      ],
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
