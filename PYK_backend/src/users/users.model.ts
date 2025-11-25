import { Schema, model, Document, Types } from "mongoose";

interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
