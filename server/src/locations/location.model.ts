import { model, Schema, Document, Types } from "mongoose";

export interface ILocation {
  location: string; // link from google maps
  name: string;
  phone: string;
  address: string;
}

export interface ILocationDocument extends ILocation, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const locationSchema = new Schema<ILocation>(
  {
    location: {
      type: String,
      required: true,
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
  { timestamps: true }
);

export const LocationModel = model("Location", locationSchema);
