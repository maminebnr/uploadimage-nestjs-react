import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    photo: { type: String },
  },
  { timestamps: true },
);

export interface User extends mongoose.Document {
  _id: string;
  lastName: string;
  email: string;
  password: string;
  photo: string;
}
