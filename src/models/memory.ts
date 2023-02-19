import mongoose, { Model, Schema, HydratedDocument, model } from "mongoose";


interface IMemory {
  user_name: string;
  photo: any;
  title: string;
  description: string;
  location: string;
  user_id: any;
  likes: number;
  comments: any;
  _id: any
}

const memorySchema = new Schema<IMemory>(
  {
    user_name: {
      type: String,
      required: true,
    },
    photo: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true
      }
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
    },
    likes: { type: Number },
    comments: [{ user: { type: String } }],
  },
  { timestamps: true }
);

const Memory = model<IMemory>("Memory", memorySchema);

export default Memory;
