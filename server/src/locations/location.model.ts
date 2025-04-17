import { model, Schema } from "mongoose";

export interface ILocation {
  location: string; // link from google maps
  name: string;
  phone: string;
  address: string;
}

export interface ILocationDocument extends ILocation {
  _id: string;
  createdAt?: Date;
}

export interface ILocationMessageResponse {
  message: string;
  data: ILocationDocument;
}

const locationSchema = new Schema<ILocation>(
  {
    location: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
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

export const LocationModel = model("Location", locationSchema);
