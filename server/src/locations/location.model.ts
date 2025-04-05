import { model, Schema } from "mongoose";

export interface ILocation {
  location: string; // link from google maps
  name: string;
  phone: string;
  address: string;
}

const locationSchema = new Schema<ILocation>({
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
});

export const LocationModel = model("Location", locationSchema);
