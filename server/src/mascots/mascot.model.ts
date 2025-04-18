import { model, Schema } from "mongoose";

export interface Mascot {
  name: string;
  quantity: number;
}

export interface MascotDocument extends Mascot {
  _id: string;
  createdAt?: Date;
}

export interface MascotMessageResponse {
  message: string;
  data: MascotDocument;
}

const mascotSchema = new Schema<Mascot>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const MascotModel = model("Mascot", mascotSchema);
